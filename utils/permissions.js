module.exports = {
  canUseCommand: (member) => {
    const config = require('../config/config.json');
    const teamMembers = config.people.serverTeam;
    let found = false;
    teamMembers.forEach(iterate = (item, index, array) => {
      if (member.roles.cache.has(item)) found = true;
    });
    if (!found && member.id === config.people.rojea) found = true;
    return found;
  },

  isHigherAdmin: (member) => {
    const config = require('../config/config.json');
    const teamMembers = config.people.highadmin;
    let found = false;
    if ((member.id === config.people.rojea) || (member.id === teamMembers)) found = true;
    return found;
  }
};
