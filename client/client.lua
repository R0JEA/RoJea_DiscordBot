ESX = nil

-- very OLD ESX lol
CreateThread(function()
  while ESX == nil do
    TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
    Wait(0)
  end
end)

RegisterNetEvent('RoJea_DiscordBot:usedNewspaperItem')
AddEventHandler('RoJea_DiscordBot:usedNewspaperItem', function()
  SetNuiFocus(true, true)
  SendNUIMessage({
    action = 'visibility'
  })
end)

RegisterNetEvent('RoJea_DiscordBot:newImg')
AddEventHandler('RoJea_DiscordBot:newImg', function(link)
  SendNUIMessage({
    action = 'newImg',
    img = link
  })
end)

RegisterNUICallback("closeNewspaper", function(data, cb)
  SetNuiFocus(false, false)
  cb('ok')
  ESX.ShowNotification(_U('thanks_for_reading'))
end)