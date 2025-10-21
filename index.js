const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const app = express();

// Express keep-alive server
app.get("/", (req, res) => res.send("Bot is live"));
app.listen(3000, () => console.log("✅ Ping server running on port 3000"));

// Telegram Bot setup
const bot = new Telegraf('8292651925:AAHs0L3fBUqFEv83Nzf2IyaGIPszhPfupcA');
const photoUrl = 'https://i.postimg.cc/bv1H0nf4/lock-key-trarent.png';

// Handle new member joins
bot.on('new_chat_members', async (ctx) => {
  try {
    await ctx.replyWithPhoto(
      { url: photoUrl },
      {
        caption: '🔒 To unlock full group access, invite 5 people by clicking below:',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.url('📤 SHARE TO OPEN [0/5]', 'https://t.me/share/url?url=https://t.me/starlight1_8&text=Join this group')],
          [Markup.button.url('🔓 OPEN GROUP', 'https://t.me/starlight1_8')]
        ])
      }
    );
    console.log("👋 Sent welcome/share message to new member");
  } catch (err) {
    console.error("❌ Failed to send welcome message:", err.message);
  }
});

// Launch bot
bot.launch()
  .then(() => console.log("🚀 Bot launched successfully"))
  .catch(err => console.error("❌ Launch error:", err.message));

// 🩺 Heartbeat (every 2 minutes) to keep Railway active
setInterval(() => {
  console.log("💓 Bot still alive");
}, 2 * 60 * 1000);

// 🔁 Auto-restart if Telegram connection fails
process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('⚠️ Unhandled rejection:', reason);
});


