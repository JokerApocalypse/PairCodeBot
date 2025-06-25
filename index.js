const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const path = require('path')

// Ajout de cfonts et readline pour le CLI interactif
const cfonts = require('cfonts')
const readline = require('readline')
const chalk = require('chalk')

// Fonction question en promise pour readline
function question(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise(resolve => rl.question(query, ans => {
    rl.close()
    resolve(ans)
  }))
}

async function startSock() {
  // Affichage CLI coloré au démarrage si pas encore appairé
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys')

  if (!state.creds.registered) {
    // Couleurs et affichage cfonts
    const listcolor = ['red', 'blue', 'magenta']
    const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)]

    cfonts.say(`Xenon\nXMD\n`, {
      font: 'block',
      align: 'center',
      gradient: [randomcolor, randomcolor]
    })
    cfonts.say(`By Dr Xenon\nYOUTUBE : Dr.xenon2\nTelegram : DrXenon1\nInstagram : Dr.xenon2`, {
      font: 'console',
      align: 'center',
      gradient: [randomcolor, randomcolor]
    })

    // Demande du numéro au format CLI avec couleur
    const phoneNumber = await question(chalk.keyword(randomcolor)(`<!> TYPE YOUR WHATSAPP NUMBER STARTING WITH COUNTRY CODE (Don't start with 0)  ❌\n<✓> EXAMPLE : 225xxx\n <+> Number : `))

    // Création du socket pour générer le PairCode
    const { version } = await fetchLatestBaileysVersion()
    const sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false
    })

    // Génération du pair code
    const code = await sock.requestPairingCode(phoneNumber.trim())
    console.log(chalk.keyword(randomcolor)(`[ # ] Enter that code into WhatsApp: ${code}`))

    // Écoute mise à jour connexion
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut
        if (shouldReconnect) startSock()
        else console.log('🔴 Déconnecté définitivement.')
      }
      if (connection === 'open') {
        console.log('✅ Session connectée !')
        await saveCreds()

        const credsPath = path.join(__dirname, 'auth_info_baileys', 'creds.json')
        const credsRaw = JSON.stringify(state.creds, null, 2)
        fs.writeFileSync(credsPath, credsRaw)

        const number = sock.user.id.split(':')[0] + '@s.whatsapp.net'
        await sock.sendMessage(number, {
          document: fs.readFileSync(credsPath),
          fileName: 'creds.json',
          mimetype: 'application/json',
          caption: '📁 Voici votre fichier de session (creds.json). Gardez-le précieusement.'
        })
        await sock.sendMessage(number, { text: '👋 Bienvenue ! Ta connexion est maintenant active. Tu peux utiliser ta session en toute sécurité.' })

        console.log('📨 creds.json et message de bienvenue envoyés dans les DM de l\'utilisateur.')
      }
    })

    sock.ev.on('creds.update', saveCreds)
  } else {
    // Si déjà appairé, on démarre normalement sans interaction CLI
    const { version } = await fetchLatestBaileysVersion()
    const sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false
    })

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut
        if (shouldReconnect) startSock()
        else console.log('🔴 Déconnecté définitivement.')
      }
      if (connection === 'open') {
        console.log('✅ Session connectée !')
        await saveCreds()
      }
    })

    sock.ev.on('creds.update', saveCreds)
  }
}

startSock()
