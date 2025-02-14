module.exports = {
  checkNewNewspaper: (msg) => {
    const config = require('../config/modules/newspaper.json');
    if ((msg.channel.id !== config.newschannel) || (!msg.attachments.first())) {
      return;
    }
    const image = msg.attachments.first();
    if ((image.width !== config.dimensions.width) || (image.height !== config.dimensions.height)) {
      return;
    }
    return image.url;
  }
};