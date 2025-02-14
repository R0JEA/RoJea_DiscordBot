exports.runCmd = async (msg, args) => {
  const { goodEmbed, badEmbed } = require('../utils/embed.js');
  const { canUseCommand } = require('../utils/permissions.js');
  const config = require('../config/config.json');
  if (canUseCommand(msg.member)) {
    //if ((args[0]) && (args[0].includes(":"))) {
    const serverIp = args[0]
    let server = require('../config/server.json');
    server.fivem.fullip = serverIp
    fs.writeFile(`./${config.crimerp.directory}/config/server.json`, JSON.stringify(server, null, 2), (err) => {
      if (err) {
        console.error;
      } else {
        goodEmbed(Discord, msg, 'Action successful', `Server IP was changed to \`\`${serverIp}\`\`.`);
        msg.delete()
          .then()
          .catch(console.error);
        return;
      }
    });
  } else {
    badEmbed(Discord, msg, 'Failed action', `<@${msg.author.id}>, cannot use this command!`);
    msg.delete()
      .then()
      .catch(console.error);
    return;
  }
};