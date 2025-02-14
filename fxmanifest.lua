name 'RoJea_DiscordBot'

author 'RoJea'

description 'Discord bot for FiveM'

version '1.0.0'

fx_version 'bodacious'

game 'gta5'

client_scripts {
  '@es_extended/locale.lua',
  'locales/lt.lua',
  'config/config.lua',
  'client/client.lua'
}

server_scripts {
  '@mysql-async/lib/MySQL.lua',
  '@es_extended/locale.lua',
  'bot.js',
  'locales/lt.lua',
  'config/config.lua',
  'server/server.lua'
}

ui_page 'web/html/index.html'

files {
  'web/html/index.html',
  'web/css/styles.css',
  'web/js/init.js'
}

dependencies {
  'es_extended'
}








