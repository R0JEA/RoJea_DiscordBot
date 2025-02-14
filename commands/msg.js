exports.runCmd = async (msg, args) => {
  const { badEmbed, informalEmbed } = require('../utils/embed.js');
  const { canUseCommand } = require('../utils/permissions.js');
  const config = require('../config/config.json');
  if (canUseCommand(msg.member)) {
    if (!args[0]) {
      informalEmbed(Discord, msg, 'Command Help', `<@${msg.author.id}>,\nusage example - \`!msg My MSG here!\``);
      msg.delete()
        .then()
        .catch(console.error);
      return;
    }
    const text = args.join(" ")
    msg.channel.send(text)
      .then()
      .catch(console.error);
    msg.delete()
      .then()
      .catch(console.error);
    return;
  } else {
    badEmbed(Discord, msg, 'Failed Action', `<@${msg.author.id}>, cannot use this command!`);
    msg.delete()
      .then()
      .catch(console.error);
    return;
  }
};
