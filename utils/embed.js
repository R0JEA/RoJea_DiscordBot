module.exports = {
  sendEmbed: (Discord, description, color, title, url, fields, thumbnail, image, footer, author, timestamp) => {
    const embedMsg = new Discord.MessageEmbed();

    if (description) {
      embedMsg.setDescription(description);
    }
    if (color) {
      embedMsg.setColor(color);
    }
    if (title) {
      embedMsg.setTitle(title);
    }
    if (url) {
      embedMsg.setURL(url);
    }
    if (fields) {
      embedMsg.fields = fields;
    }
    if (thumbnail) {
      embedMsg.setThumbnail(thumbnail);
    }
    if (image) {
      embedMsg.setImage(image);
    }
    if (footer) {
      embedMsg.footer = footer;
    }
    if (author) {
      embedMsg.author = author;
    }
    if (timestamp) {
      embedMsg.setTimestamp();
    }

    return embedMsg;
  },
  goodEmbed: (Discord, msg, title, desc) => {
    const embedMessage = new Discord.MessageEmbed();
    const config = require('../config/config.json');
    embedMessage.setColor(3075613);
    embedMessage.setTitle(title);
    embedMessage.setDescription(desc);
    embedMessage.setFooter(`Executed: ${msg.author.tag}`, msg.author.avatarURL('png'));
    embedMessage.setThumbnail(config.crimerp.iconhd);
    embedMessage.setTimestamp(new Date);
    msg.channel.send(embedMessage)
      .then()
      .catch(console.error);
    return;
  },
  badEmbed: (Discord, msg, title, desc) => {
    const embedMessage = new Discord.MessageEmbed();
    const config = require('../config/config.json');
    embedMessage.setColor(15411218);
    embedMessage.setTitle(title);
    embedMessage.setDescription(desc);
    embedMessage.setFooter(`Tried executing: ${msg.author.tag}`, msg.author.avatarURL('png'));
    embedMessage.setThumbnail(config.crimerp.iconhd);
    embedMessage.setTimestamp(new Date);
    msg.channel.send(embedMessage)
      .then()
      .catch(console.error);
    return;
  },
  informalEmbed: (Discord, msg, title, desc) => {
    const embedMessage = new Discord.MessageEmbed();
    const config = require('../config/config.json');
    embedMessage.setColor(16249381);
    embedMessage.setTitle(title);
    embedMessage.setDescription(desc);
    embedMessage.setFooter(`Tried executing: ${msg.author.tag}`, msg.author.avatarURL('png'));
    embedMessage.setThumbnail(config.crimerp.iconhd);
    embedMessage.setTimestamp(new Date);
    msg.channel.send(embedMessage)
      .then()
      .catch(console.error);
    return;
  },
  customColorEmbed: (Discord, msg, color, desc, title) => {
    const embedMessage = new Discord.MessageEmbed();
    embedMessage.setColor(color);
    embedMessage.setDescription(desc);
    if (title) {
      embedMessage.setTitle(title);
    }
    msg.channel.send(embedMessage)
      .then()
      .catch(console.error);
    return;
  }
};
