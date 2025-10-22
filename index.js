const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const app = express();

// === Express keep-alive server (for Railway) ===
app.get("/", (req, res) => res.send("Bot is live ✅"));
app.listen(3000, () => console.log("✅ Keep-alive server running on port 3000"));

// === Telegram bot setup ===
const bot = new Telegraf('8292651925:AAHs0L3fBUqFEv83Nzf2IyaGIPszhPfupcA'); // <--- replace with your bot token

// === New member welcome ===
bot.on('new_chat_members', async (ctx) => {
  try {
    const chatId = ctx.chat.id;

    // 1️⃣ Send the single emoji first — Telegram may render it LARGE automatically
    await ctx.telegram.sendMessage(chatId, '🔐'); // <-- EXACTLY this, no spaces/newlines

    // 2️⃣ Small delay so the emoji message shows before the caption/buttons
    await new Promise(r => setTimeout(r, 400));

    // 3️⃣ Send the main caption + inline buttons
    await ctx.reply(
      'To unlock full group access, invite 5 people by clicking below:',
      {
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.url(
              '📤 SHARE TO OPEN [0/5]',
              'https://t.me/share/url?url=https://t.me/starlight1_8&text=Join this group'
            )
          ],
          [
            Markup.button.url(
              '🔓 OPEN GROUP',
              'https://t.me/starlight1_8'
            )
          ]
        ])
      }
    );

    console.log(`👋 Sent welcome message with emoji to ${ctx.from.username || 'a new member'}`);
  } catch (err) {
    console.error("❌ Failed to send welcome message:", err.message);
  }
});

// === Launch bot ===
bot.launch()
  .then(() => console.log("🚀 Bot launched successfully"))
  .catch(err => console.error("❌ Launch error:", err.message));

// === Heartbeat log (every 2 minutes) ===
setInterval(() => {
  console.log("💓 Bot still alive");
}, 2 * 60 * 1000);

// === Error handling ===
process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('⚠️ Unhandled rejection:', reason);
});
