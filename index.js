// 🌐 Ping Service
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is running ✅'));
app.listen(3000, () => console.log('🌐 Ping service listening'));

// 🤖 Bot Code
require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildScheduledEvents,
  ],
});

client.once('ready', () => console.log(`✅ Bot is active: ${client.user.tag}`));

client.on('guildScheduledEventCreate', async (event) => {
  try {
    const channel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
    if (!channel) return console.error('❌ Log channel not found!');

    if (!channel.permissionsFor(client.user).has('SendMessages')) {
      return console.error('❌ Bot does not have permission to send messages!');
    }

    const timestamp = `<t:${Math.floor(event.scheduledStartTimestamp / 1000)}:F>`;
    const location = event.channel?.name || 'Not specified';
    const description = event.description || '*No description provided*';

    const embed = new EmbedBuilder()
      .setTitle(`🎬  ${event.name}`)
      .setDescription(`🕒  **Time:** ${timestamp}\n📍  **Location:** ${location}\n✨  **Description:** ${description}`)
      .setColor(0x00b0f4)
      .setURL(`https://discord.com/events/${event.guildId}/${event.id}`)
      .setTimestamp(new Date(event.scheduledStartTimestamp));

    const imageUrl = event.coverImageURL({ size: 1024 });
    if (imageUrl) {
      embed.setImage(imageUrl);
    }

    await channel.send({ embeds: [embed] });

    // Logging full event details
    console.log(`✅ Event message sent:
- Name: ${event.name}
- Time: ${timestamp}
- Location: ${location}
- Description: ${description.replace(/\n/g, ' ')}`);

  } catch (err) {
    console.error('❌ Error while sending event message:', err.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
