const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

app.get("/", (req, res) => res.send("Bot is live"));
app.listen(3000, () => console.log("✅ Ping server running on port 3000"));

const bot = new Telegraf('8292651925:AAHs0L3fBUqFEv83Nzf2IyaGIPszhPfupcA');

bot.on('new_chat_members', async (ctx) => {
  try {
    // Preload typing action (optional)
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_photo').catch(() => {});

    // Launch both requests simultaneously
    await Promise.all([
      ctx.replyWithSticker({ source: 'chpic.su_-_RestrictedEmoji_616-ezgif.com-gif-maker.webp' }),
      ctx.reply(
        '<b>🔐 To Unlock Full Group Access✅</b>\nInvite 5 people by clicking below:',
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '📤 SHARE TO OPEN [0/5]',
                  url: 'https://t.me/share/url?url=https://t.me/starlight1_8&text=Join this group'
                }
              ],
              [
                {
                  text: '🔓 OPEN GROUP',
                  url: 'https://t.me/starlight1_8'
                }
              ]
            ]
          }
        }
      )
    ]);

    console.log("✅ Instant message + emoji triggered in parallel");
  } catch (err) {
    console.error("❌ Error sending message:", err.message);
  }
});

bot.launch()
  .then(() => console.log("🚀 Bot launched"))
  .catch(err => console.error("❌ Launch error:", err.message));

setInterval(() => console.log("💓 Bot alive"), 2 * 60 * 1000);
process.on('uncaughtException', err => console.error('⚠️', err));
process.on('unhandledRejection', reason => console.error('⚠️', reason));
