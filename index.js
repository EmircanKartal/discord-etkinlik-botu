require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildScheduledEvents
  ],
});

client.once('ready', () => {
  console.log(`✅ Bot Aktif: ${client.user.tag}`);
});

client.on('guildScheduledEventCreate', async (event) => {
  const channel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
  if (!channel) return;

  const timestamp = `<t:${Math.floor(event.scheduledStartTimestamp / 1000)}:F>`;
  const location = event.channel?.name || 'Belirtilmedi';

  channel.send(`📅 **Yeni Etkinlik Oluşturuldu!**\n🎬 **${event.name}**\n🕒 ${timestamp}\n📍 Konum: ${location}`);
});

client.login(process.env.DISCORD_TOKEN);
