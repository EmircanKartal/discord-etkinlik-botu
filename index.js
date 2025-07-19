// 🌐 Ping servisi için Expres
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot çalışıyor ✅'));

app.listen(3000, () => console.log('🌐 Ping servisi dinlemede'));

// 🤖 Discord botu
require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildScheduledEvents,
  ],
});

client.once('ready', () => {
  console.log(`✅ Bot Aktif: ${client.user.tag}`);
});

client.on('guildScheduledEventCreate', async (event) => {
  try {
    const channel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
    if (!channel) return console.error('❌ Kanal bulunamadı!');

    if (!channel.permissionsFor(client.user).has('SendMessages')) {
      return console.error('❌ Bot mesaj gönderme iznine sahip değil!');
    }

    const timestamp = `<t:${Math.floor(event.scheduledStartTimestamp / 1000)}:F>`;
    const location = event.channel?.name || 'Belirtilmedi';
    const description = event.description || '*Açıklama girilmemiş*';

    const embed = new EmbedBuilder()
      .setTitle(`🎬 ${event.name}`)
      .setDescription(
        `🕒 **Zaman:** ${timestamp}\n📍 **Konum:** ${location}\n✨ **Açıklama:** ${description}`
      )
      .setColor(0x00b0f4)
      .setURL(`https://discord.com/events/${event.guildId}/${event.id}`)
      .setTimestamp(new Date(event.scheduledStartTimestamp));

    await channel.send({ embeds: [embed] });
    console.log('✅ Etkinlik mesajı gönderildi (görsel içermiyor)');
  } catch (error) {
    console.error('❌ Mesaj gönderilirken hata:', error.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
