const maxSlots = GetConvarInt('sv_maxclients', LoadResourceFile("RoJea_cmds", "slots.txt"));
const config = require('../config/config.json');

module.exports = {
  updateServerPlayerCount: (sec, alltimeMax, weeklyMax, dailyMax, monthlyMax) => {
    const interval = setInterval(setBotStatus = () => {

      let players = GetNumPlayerIndices();

      let wordEnding;
      if ((players == 1) || (players % 10 == 1)) {
        wordEnding = "player";
      } else if ((players > 10 && players < 20) || (players > 110 && players < 120) || (players > 210 && players < 220) || (players > 310 && players < 320) || (players > 410 && players < 420) || (players > 510 && players < 520) || (players > 610 && players < 720) || (players > 810 && players < 820) || (players > 910 && players < 920) || (players == 0) || (players % 10 == 0)) {
        wordEnding = "players";
      } else {
        wordEnding = "players";
      }
      // emit("connectqueue:getQueueSize", (queueSize) => {
      //   if (queueSize > 0) {
      //     wordEnding = wordEnding + `, ${queueSize} in queue`;
      //   }

      if (players > alltimeMax || players > alltimeMaxGlobal) {
        alltimeMax = players;
        alltimeMaxGlobal = players;
        emit("RoJea_cmds:statistics:updateAlltimeMax", players);
      }
      if (players > weeklyMax || players > weeklyMaxGlobal) {
        weeklyMax = players;
        weeklyMaxGlobal = players;
        emit("RoJea_cmds:statistics:updateWeeklyMax", players);
      }
      if (players > dailyMax || players > dailyMaxGlobal) {
        dailyMax = players;
        dailyMaxGlobal = players;
        emit("RoJea_cmds:statistics:updateDailyMax", players);
      }
      if (players > monthlyMax || players > monthlyMaxGlobal) {
        monthlyMax = players;
        monthlyMaxGlobal = players;
        emit("RoJea_cmds:statistics:updateMonthlyMax", players);
      }

      emitNet("RoJea_discordBot:newPlayerCount", -1, players);

      let status = `with ${players}/${maxSlots} ${wordEnding}`;
      client.user.setActivity(status, { type: config.activity.type })
        .then()
        .catch(console.error);
      return setBotStatus;

    }, sec * 1000);
  },

  plyCountsEmit: (cb) => {
    emit("RoJea_DiscordBot:getPlyCounts", (countTab) => {
      cb(countTab);
    });
  }

};