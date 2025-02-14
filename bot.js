// Load libraries
global.Discord = require('discord.js');
global.client = new Discord.Client();

// Global variables
global.dailyMaxGlobal = 0;
global.weeklyMaxGlobal = 0;
global.monthlyMaxGlobal = 0;
global.alltimeMaxGlobal = 0;

global.fs = require('fs');
// Modules
const config = require('./config/config.json');
// Functions
const { updateServerPlayerCount } = require('./utils/status.js');
const { checkNewNewspaper } = require('./modules/newspaper.js');

// Variables
const prefix = config.main.prefix;
let newspaperLink;

client.on('ready', () => {
  console.log(`[^4${client.user.username}^0]: ^2Online.^0`);

  // Temporary status
  client.user.setActivity('MYSERVER', { type: "WATCHING" })
    .then()
    .catch(console.error);

  // Update status, make CB to DB
  emit('RoJea_cmds:statistics:retrieveRecords', (allTime) => {
    // all -> weekly -> daily -> monthly
    let alltimeMax = allTime[0];
    let dailyMax = allTime[2];
    let weeklyMax = allTime[1];
    let monthlyMax = allTime[3];

    dailyMaxGlobal = dailyMax;
    weeklyMaxGlobal = weeklyMax;
    monthlyMaxGlobal = monthlyMax;
    alltimeMaxGlobal = alltimeMax;


    updateServerPlayerCount(config.activity.refreshTime, alltimeMax, weeklyMax, dailyMax, monthlyMax);

  });

  // Fetch newspaper
  emit('RoJea_DiscordBot:fetchNewspaperLink', (link) => {
    if (link) {
      newspaperLink = link;
      // console.log(newspaperLink);
    }
  });
});

on('esx:playerLoaded', (player, _) => {
  if (newspaperLink) {
    emitNet('RoJea_DiscordBot:newImg', player, newspaperLink);
  }
});

// FiveM Event Handlers
on('RoJea_DiscordBot:newIpRequest', (ip, name, steam, discord) => {
  const notifChannel = client.channels.get('channel-id-here');
  if (discord) {
    notifChannel.send(`NEW IP Confirmation request: \`${ip}\` (**${name}, ${steam},** <@${discord}>)`);
  } else {
    notifChannel.send(`NEW IP Confirmation request: \`${ip}\` (**${name}, ${steam}**)`);
  }
});

client.on('guildDelete', (guild) => {
  console.log(`[^4${client.user.username}^0]: ^1Offline.^0`);
});

client.on('message', (msg) => {
  if (!msg) return;
  if (msg.author && msg.author.bot) return;

  // Check news module
  let newLink = checkNewNewspaper(msg);
  if (newLink) {
    newspaperLink = newLink;
    emit('RoJea_DiscordBot:updateNewspaperLink', newspaperLink);
    emitNet('RoJea_DiscordBot:newImg', -1, newspaperLink);
  }

  if (msg.content.indexOf(prefix) !== 0) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`);
    commandFile.runCmd(msg, args);
  } catch (err) {
    // Command does not exist
  }
});

client.login(config.main.token);
