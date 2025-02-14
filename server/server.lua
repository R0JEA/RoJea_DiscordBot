ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterUsableItem(Config.NewspaperItem, function(source)
  TriggerClientEvent('RoJea_DiscordBot:usedNewspaperItem', source)
end)

AddEventHandler('RoJea_DiscordBot:removeWhitelistQuery', function(ip)
  MySQL.Async.execute('UPDATE `ip_whitelist` SET `whitelisted` = @whitelist WHERE `ip` = @ip', {
    ['@whitelist'] = 1,
    ['@ip'] = ip
  }, function(rowsChanged)
    if rowsChanged < 1 then
      print('^1Non existing whitelist IP^0')
    end
  end)
end)

AddEventHandler('RoJea_DiscordBot:fetchNewspaperLink', function(cb)
  local data = MySQL.Sync.fetchAll("SELECT link FROM `newspapers` ORDER BY `id` DESC LIMIT 1", {})
  if data[1] and data[1].link then
    cb(data[1].link)
  else
    cb(nil)
  end
end)

AddEventHandler('RoJea_DiscordBot:updateNewspaperLink', function(newLink)
  MySQL.Async.execute('INSERT INTO `newspapers` (`link`) VALUES (@linkurl)', {
    ['@linkurl'] = newLink
  }, function(rowsChanged)
    if rowsChanged == 1 then
      print('^2Succesfully update the newspaper link.^0')
    else
      print('^1An error occured while updating the newspaper link.^0')
    end
  end)
end)
