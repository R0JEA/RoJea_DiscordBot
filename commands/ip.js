exports.runCmd = async (msg, args) => {
  const config = require('../config/config.json');
  const server = require('../config/server.json');
  const { sendEmbed } = require('../utils/embed.js');
  const { canUseCommand } = require('../utils/permissions.js');
  if ((msg.channel.id === config.channels["off-topic"]) || (canUseCommand(msg.member))) {
    const newEmbed = sendEmbed(
      Discord,
      `<:palm_tree:> [Click here](http://google.com), to connect directly <:heart:>\n:arrow_right: __Server's IP:__ \`\`{}\`\` :arrow_left:`,
      Math.floor(Math.random() * 16777214) + 1,
      "Connect to server",
      null,
      [
        {
          name: "Join via \"Servers\" field - ",
          value: 'Entering "ServerName" :palm_tree:'
        },

        {
          name: "Or with IP - ",
          value: `Press F8 and enter \`\`connect my-server-ip\`\`, then press *ENTER* :comet:`
        }
      ],
      config.crimerp["iconhd"]
    );
    msg.channel.send(`<@${msg.author.id}>,`, newEmbed)
      .then()
      .catch(console.error);
    return;
  } else {
    msg.author.send(`You can only use command \`\`!ip\`\` in <#${config.channels["off-topic"]}> channel!`)
      .then()
      .catch(console.error);
    msg.delete();
    return;
  }
};
