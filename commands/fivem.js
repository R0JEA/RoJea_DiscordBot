exports.runCmd = async (msg, args) => {
  const { goodEmbed } = require('../utils/embed.js');
  const { canUseCommand, isHigherAdmin } = require('../utils/permissions.js');
  const config = require('../config/config.json');
  if ((msg.channel.id !== config.channels.cmds) || (!canUseCommand(msg.member))) {
    msg.delete()
      .then()
      .catch(console.error);
    return;
  }
  if (config.fivemCommandsSpecial.includes(args[0])) { // owner cmds
    if (msg.member.id !== config.people.rojea) return; // not rojea
    const cmd = args.join(" ");
    ExecuteCommand(cmd); // FiveM command execution
    goodEmbed(Discord, msg, 'Command successfuly executed', `Command \`\`/${cmd}\`\` was executed.`)
    msg.delete()
      .then()
      .catch(console.error);
    return;
  } else if (config.highadminComs.includes(args[0])) { // highadmin cmds
    if (!isHigherAdmin(msg.member)) return; // not rojea && not higher admin
    const cmd = args.join(" ");
    ExecuteCommand(cmd); // FiveM command execution
    goodEmbed(Discord, msg, 'Command successfuly executed', `Command \`\`/${cmd}\`\` was executed.`)
    msg.delete()
      .then()
      .catch(console.error);
    return;
  } else { // admin cmds
    if (!config.fivemCommands.includes(args[0])) return; // only whitelisted cmds are allowed
    const cmd = args.join(" ");
    ExecuteCommand(cmd); // FiveM command execution
    goodEmbed(Discord, msg, 'Command successfuly executed', `Command \`\`/${cmd}\`\` was executed.`)
    msg.delete()
      .then()
      .catch(console.error);
    return;
  }
};
