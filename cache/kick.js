let kickList = {}

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
      targetUser.kick(reason);
      if (reason) {
        customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was kicked** | ${reason}`);
      } else {
        customColorEmbed(Discord, msg, config.actions.ban.color, `<:yes:682683469133774848> **${tag} was kicked**`);
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
      targetUser = args[0]
    } else if (msg.mentions.members.first()) {
      targetUser = msg.mentions.members.first();
    }
    if (targetUser.displayName) {
      if (canUseCommand(targetUser)) {
        badEmbed(Discord, msg, 'Failed Action', 'Cannot be kicked.');
        msg.delete()
          .then()
          .catch(console.error);
        return;
      }
      if (args[1]) {
        args.shift();
        reason = args.join(" ");
      }
      if (kickList[msg.author.id]) {
        if (kickList[msg.author.id].length < config.actions.kick["use-limit"]) {
          if (!kickList[msg.author.id].includes(targetUser.id)) {
            kickList[msg.author.id].push(targetUser.id);
          }
          let tag = targetUser.user.tag;
          targetUser.kick(reason);
          if (reason) {
            customColorEmbed(Discord, msg, config.actions.kick.color, `<:yes:682683469133774848> **${tag} was kicked** | ${reason}`);
          } else {
            customColorEmbed(Discord, msg, config.actions.kick.color, `<:yes:682683469133774848> **${tag} was kicked**`);
          }
          msg.delete()
            .then()
            .catch(console.error);
          return;
        } else if (kickList[msg.author.id].includes(targetUser.id)) {
          let tag = targetUser.user.tag;
          targetUser.kick(reason);
          if (reason) {
            customColorEmbed(Discord, msg, config.actions.kick.color, `<:yes:682683469133774848> **${tag} was kicked** | ${reason}`);
          } else {
            customColorEmbed(Discord, msg, config.actions.kick.color, `<:yes:682683469133774848> **${tag} was kicked**`);
          }
          msg.delete()
            .then()
            .catch(console.error);
          return;
        } else {
          badEmbed(Discord, msg, 'Failed action', `<@${msg.author.id}>, used command limit!`);
          msg.delete()
            .then()
            .catch(console.error);
          return;
        }
      } else {
        kickList[msg.author.id] = [targetUser.id];
        let tag = targetUser.user.tag;
        targetUser.kick(reason);
        if (reason) {
          customColorEmbed(Discord, msg, config.actions.kick.color, `<:yes:682683469133774848> **${tag} was kicked** | ${reason}`);
        } else {
          customColorEmbed(Discord, msg, config.actions.kick.color, `<:yes:682683469133774848> **${tag} was kicked**`);
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
      badEmbed(Discord, msg, 'Failed Action', 'Person does not exist');
      msg.delete()
        .then()
        .catch(console.error);
      return;
    }
  } else {
    badEmbed(Discord, msg, 'Failed Action', `<@${msg.author.id}>, cannot use this command!`);
    msg.delete()
      .then()
      .catch(console.error);
    return;
  }
};