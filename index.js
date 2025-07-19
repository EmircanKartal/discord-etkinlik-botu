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
  try {
    const channel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
    if (!channel) {
      console.error('❌ Kanal bulunamadı!');
      return;
    }

    // Check if bot has permission to send messages
    if (!channel.permissionsFor(client.user).has('SendMessages')) {
      console.error('❌ Bot mesaj gönderme iznine sahip değil!');
      return;
    }

    const timestamp = `<t:${Math.floor(event.scheduledStartTimestamp / 1000)}:F>`;
    const location = event.channel?.name || 'Belirtilmedi';

    await channel.send(`📅 **Yeni Etkinlik Oluşturuldu!**\n🎬 **${event.name}**\n🕒 ${timestamp}\n📍 Konum: ${location}`);
    console.log('✅ Etkinlik mesajı gönderildi!');
  } catch (error) {
    console.error('❌ Mesaj gönderilirken hata:', error.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
