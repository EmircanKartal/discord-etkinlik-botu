# 🎬  Discord Event Relay Bot

> A tiny Discord bot that **listens** for newly-created _scheduled events_ on a server and immediately **announces** them—in full colour, with the event’s cover image—inside a chosen text channel.  
> Born from one late-night “hey, let’s watch a film together” moment with friends, it now runs 24 / 7 on Render.

---

## ✨ Why I built it
I re-installed Discord this morning, spun up a brand-new server for my friend group, and realised:

1. We love running **Watch Party** voice channels.  
2. Someone always forgets the date or the movie we picked.  
3. Discord already has a **Scheduled Event** feature—so why not let a bot turn each event into a flashy announcement for everyone?

Whenever anyone schedules a film night (title, time, description, banner), the bot grabs that payload and drops a gorgeous embed into `#events`, ping-ready for the whole server.

---

## 🛠️ Tech stack

| Layer | What & Why |
|-------|------------|
| **Node.js 20 + discord.js v14** | Main runtime & Gateway API wrapper—modern, slash-command-ready. |
| **Express** | One-route “ping” service (`GET /`) that keeps the instance alive on Render. |
| **Replit → GitHub → Render** | Prototype on Replit, push to GitHub, Render auto-deploys 24 / 7. |
| **dotenv** | Keeps `DISCORD_TOKEN` & `LOG_CHANNEL_ID` out of source. |

---

## 🖼️ What it looks like
<p align="center">
  <img src="https://github.com/user-attachments/assets/36d9bd94-50f9-4585-a6c2-31cf4d69fdb2" width="420" alt="Creating an event"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/37cf4b24-8312-4398-adc0-0e28a25eb6f1" width="420" alt="Bot embed preview"/>
</p>

---


## 🔍 How it works – under the hood

1. **Gateway Intents**

    ```js
    new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildScheduledEvents,
      ],
    });
    ```

2. **Event listener** — `guildScheduledEventCreate` fires with the full payload.  
3. **EmbedBuilder magic**  
   * Title → `🎬 ${event.name}`  
   * Description block with **Time**, **Location**, **Blurb**  
   * `event.coverImageURL({ size: 1024 })` for the banner  
4. **Post to `LOG_CHANNEL_ID`** after a permission sanity-check.  
5. **Ping-worthy** because the channel is an **Announcement** type—Discord can broadcast to everyone who follows it.

---

## 🚀 Running locally

```bash
git clone https://github.com/<you>/discord-event-bot.git
cd discord-event-bot
cp how .env.example .env   # add your token & channel id
npm install
node index.js
```

## ☁️ Deploying to Render

1. **Connect GitHub → Render**  
   Create a new **Web Service** in the Render dashboard and point it at this repository.

2. **Set environment variables** (see the table below).

3. **Build & start commands**

    ```bash
    # Render runs these automatically
    npm i
    node index.js
    ```              

4. **Port**  
   Render detects that your Express server listens on **`3000`**, so no extra config is required.

5. **Automatic redeploys**  
   Push to **`main`** → Render rebuilds → bot restarts — no crons, no pings, always on.

&nbsp;  <!-- tiny spacer so GitHub knows the list is done -->

## ⚙️ Environment variables

| Name            | Description                                         |
|-----------------|-----------------------------------------------------|
| `DISCORD_TOKEN` | Bot token from the Discord Developer Portal         |
| `LOG_CHANNEL_ID`| ID of the text/announcement channel for embeds      |


## 🙋 Contributing

PRs & issues are welcome! If you’d like slash commands, TypeScript, or RSVP reactions, open a discussion first.

## 📝 License

MIT – do what you want, just keep my header.

Made with ☕, 🍿, and a sudden urge to watch more movies with friends.


Copy everything inside that fence into your `README.md` and you’re good to go.
