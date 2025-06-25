# Xenon XMD - Bot WhatsApp Multi-Device

<p align="center">
  <img src="https://i.imgur.com/BdRa36C.jpeg" alt="XENON XMD" width="300" />
</p>

---

Xenon XMD est un bot WhatsApp multi-device développé par **Dr Xenon**, basé sur [Baileys](https://github.com/WhiskeySockets/Baileys) et [Node.js](https://nodejs.org).  
Automatise la gestion des commandes, la modération, la sécurité, et bien plus.  

---

## Fonctionnalités principales

- Gestion simple et efficace des commandes via `switch-case`  
- Système de pairing sécurisé entre utilisateurs  
- Commandes clés : `.connect`, `.disconnect`, `.listconnect`, `.encrypt`, `.decrypt`, `.clearchat`, `.readviewonce`  
- Support multi-device pour un usage stable et évolutif  
- Reload automatique du code (hot reload)  
- Personnalisable selon tes besoins  

---

## Connect With Me

<p align="center">

[![WhatsApp](https://img.shields.io/badge/Contact%20Deepak-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/2250500107362)  
[![WhatsApp GC](https://img.shields.io/badge/Join%20Official%20GC-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://www.whatsapp.com/channel/0029VadaaRZK5cDOTh6sMD41)  
[![YouTube](https://img.shields.io/badge/Subscribe%20XENON-ff0000?style=for-the-badge&logo=youtube&logoColor=ff000000)](https://youtube.com/@X-TECH-CORP)  

</p>

---

## Installation & Setup

### Prérequis

- [Node.js](https://nodejs.org/en/) (LTS recommandé)  
- [Git](https://git-scm.com/downloads)  
- [FFmpeg](https://github.com/BtbN/FFmpeg-Builds/releases)  
- [Libwebp](https://developers.google.com/speed/webp/download)  
- Un éditeur de texte (VSCode recommandé)

---
### Commandes principales

.connect	Connecte un numéro via pairing	.connect 22501XXXXXX

.disconnect	Supprime un pairing	.disconnect 22501XXXXXX

.listconnect	Liste les pairings actifs	.listconnect

.encrypt	Crypte un message	.encrypt message secret

.decrypt	Décrypte un message	.decrypt texte_crypte

.clearchat	Supprime le chat actuel	.clearchat

.readviewonce	Lit un message « view once »	.readviewonce <message>


### Prérequis

Déploiement Heroku (One-Click)
Utilise ce bouton pour déployer facilement le bot :

Buildpacks recommandés :

[Buildpacks1](https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest) 

[Buildpacks2](https://github.com/DuckyTeam/heroku-buildpack-imagemagick) 


### Donate Me 
GooglePay QR code disponible ici
(Supporte GooglePay, Paytm, PhonePe, FamPay)
---

<h2 align="center">To Restart the Bot for Termux/Ubuntu</h2>

```
proot-distro login ubuntu
cd XENON-XMD
rm -rf session
node index --pairing-code
```

- Star ⭐ le repo si tu aimes ce bot.

[![JOIN WHATSAPP CHANNEL](https://raw.githubusercontent.com/Neeraj-x0/Neeraj-x0/main/photos/suddidina-join-whatsapp.png)](https://www.whatsapp.com/channel/0029VadaaRZK5cDOTh6sMD41)

--------

# `Thanks To❤️`

- [`DR-XENON`](https://github.com/X-TECH-CORP)

  # Setup For Deployment 👇

  - FORK LE REPO [Ici](https://github.com/JokerApocalypse/XENON-XMD/fork)

## Setup TERMUX / UBUNTU
Suivre ces étapes après fork du repo et ajout des variables d’environnement dans config.env ou config.js

```bash

apt update && apt -y upgrade
apt install proot-distro
proot-distro install ubuntu
proot-distro login ubuntu
apt-get update && apt-get -y full-upgrade
apt install -y sudo git ffmpeg curl imagemagick webp
sudo apt -y remove nodejs
curl -fsSl https://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt -y install nodejs
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt -y update && sudo apt -y install yarn
sudo yarn global add pm2
https://github.com/clhuang/heroku-buildpack-webp-binaries.git
