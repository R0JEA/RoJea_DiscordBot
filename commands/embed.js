exports.runCmd = async (msg, args) => {
  const { sendEmbed, badEmbed, informalEmbed } = require('../utils/embed.js');
  const { canUseCommand } = require('../utils/permissions.js');
  const config = require('../config/config.json');
  if (canUseCommand(msg.member)) {
    if (!args[0]) {
      informalEmbed(Discord, msg, 'Command Help', `<@${msg.author.id}>,\ncommand usage example - \`!embed true "title": "My title", "desc": "My desc", "color": 15933107, "img": "https://google.com"\``);
      msg.delete()
        .then()
        .catch(console.error);
      return;
    }
    let attachment = null;
    let logo = args.shift();
    if (logo === 'true') {
      logo = config.crimerp["iconhd"];
    } else {
      logo = null;
    }

    const messageArgs = JSON.parse(`{${args.join(" ")}}`);

    if (msg.attachments.first()) {
      attachment = msg.attachments.first().url;
    } else if (messageArgs.img) {
      attachment = messageArgs.img;
    }

    const newEmbed = sendEmbed(
      Discord,
      messageArgs.desc || "",
      messageArgs.color || 830195,
      messageArgs.title || "Update",
      null,
      null,
      logo,
      attachment,
      {
        text: msg.author.tag || "RoJea",
        icon_url: msg.author.avatarURL('png') || "avatar-url-here"
      },
      null,
      new Date
    );

    msg.channel.send(newEmbed)
      .then()
      .catch(console.error);
    msg.delete()
      .then()
      .catch(console.error);
    return;
  } else {
    badEmbed(Discord, msg, 'Action failed', `<@${msg.author.id}>, cannot use this command!`);
    msg.delete()
      .then()
      .catch(console.error);
    return;
  }
};
