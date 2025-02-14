let banList = {}

exports.runCmd = async (msg, args) => {
  const config = require('../config/config.json');
  const { canUseCommand } = require('../utils/permissions.js');
  const { badEmbed, informalEmbed, customColorEmbed } = require('../utils/embed.js');

  if (msg.member.hasPermission('ADMINISTRATOR')) {
    let targetUser, reason;
    if (Number(args[0])) {
      targetUser = msg.guild.members.get(args[0]);
    } else if (msg.mentions.members.first()) {
      targetUser = msg.mentions.members.first();
    }
    if (targetUser.displayName) {
      if (args[1]) {
        args.shift();
        reason = args.join(" ");
      }
      let tag = targetUser.user.tag;
      targetUser.ban({ reason: reason });
      if (reason) {
        customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was banned** | ${reason}`);
      } else {
        customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was banned**`);
      }
      msg.delete()
        .then()
        .catch(console.error);
      return;
    } else {
      informalEmbed(Discord, msg, 'Command Help', 'You did not mark any person. *Use @ or just type Discord ID*');
      msg.delete()
        .then()
        .catch(console.error);
      return;
    }
  } else if (canUseCommand(msg.member)) {
    let targetUser, reason;
    if (Number(args[0])) {
      targetUser = msg.guild.members.get(args[0]);
    } else if (msg.mentions.members.first()) {
      targetUser = msg.mentions.members.first();
    }
    if (targetUser.displayName) {
      if (canUseCommand(targetUser)) {
        badEmbed(Discord, msg, 'Failed Action', 'This person cannot be banned!');
        msg.delete()
          .then()
          .catch(console.error);
        return;
      }
      if (args[1]) {
        args.shift();
        reason = args.join(" ");
      }
      if (banList[msg.author.id]) {
        if (banList[msg.author.id].length < config.actions.ban["use-limit"]) {
          if (!banList[msg.author.id].includes(targetUser.id)) {
            banList[msg.author.id].push(targetUser.id);
          }
          let tag = targetUser.user.tag;
          targetUser.ban({ reason: reason });
          if (reason) {
            customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was banned** | ${reason}`);
          } else {
            customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was banned**`);
          }
          msg.delete()
            .then()
            .catch(console.error);
          return;
        } else if (banList[msg.author.id].includes(targetUser.id)) {
          let tag = targetUser.user.tag;
          targetUser.ban({ reason: reason });
          if (reason) {
            customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was banned** | ${reason}`);
          } else {
            customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was banned**`);
          }
          msg.delete()
            .then()
            .catch(console.error);
          return;
        } else {
          badEmbed(Discord, msg, 'Failed Action', `<@${msg.author.id}>, you have used the command limit!`);
          msg.delete()
            .then()
            .catch(console.error);
          return;
        }
      } else {
        banList[msg.author.id] = [targetUser.id];
        let tag = targetUser.user.tag;
        targetUser.ban({ reason: reason });
        if (reason) {
          customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was banned** | ${reason}`);
        } else {
          customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was banned**`);
        }
        msg.delete()
          .then()
          .catch(console.error);
        return;
      }
    } else if (!args[0]) {
      informalEmbed(Discord, msg, 'Command Help', 'You did not mark any person. *Use @ or just type Discord ID*');
      msg.delete()
        .then()
        .catch(console.error);
      return;
    } else {
      badEmbed(Discord, msg, 'Failed Action', 'This person does not exist!');
      msg.delete()
        .then()
        .catch(console.error);
      return;
    }
  } else {
    badEmbed(Discord, msg, 'Failed Action', `<@${msg.author.id}>, you cannot use this command!`);
    msg.delete()
      .then()
      .catch(console.error);
    return;
  }
};