exports.runCmd = async (msg, args) => {
  msg.channel.send(`**All time player high:** \`${alltimeMaxGlobal}\` :palm_tree:\n**Today's player high:** \`${dailyMaxGlobal}\` :trophy:\n**This week's high:** \`${weeklyMaxGlobal}\` :large_orange_diamond:\n**This month's high:** \`${monthlyMaxGlobal}\` :large_blue_diamond:`);
};