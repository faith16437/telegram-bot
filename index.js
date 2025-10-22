const { Telegraf } = require('telegraf');
const express = require('express');
const fs = require('fs');
const app = express();

app.get("/", (req, res) => res.send("Bot is live"));
app.listen(3000, () => console.log("✅ Ping server running on port 3000"));

const bot = new Telegraf('8292651925:AAHs0L3fBUqFEv83Nzf2IyaGIPszhPfupcA');

// Preload sticker into memory for instant send
const stickerBuffer = fs.readFileSync('chpic.su_-_RestrictedEmoji_616-ezgif.com-gif-maker.webp');

bot.on('new_chat_members', async (ctx) => {
  try {
    // Send sticker first
    const stickerMsg = await ctx.replyWithSticker({ source: stickerBuffer });

    // Send buttons immediately below (no text)
    await ctx.reply('‎', {  // invisible character to bypass Telegram text requirement
      reply_to_message_id: stickerMsg.message_id,
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
    });

    console.log("✅ Sticker + buttons sent (clean mode)");
  } catch (err) {
    console.error("❌ Failed to send message:", err.message);
  }
});

bot.launch()
  .then(() => console.log("🚀 Bot launched successfully"))
  .catch(err => console.error("❌ Launch error:", err.message));

setInterval(() => console.log("💓 Bot still alive"), 2 * 60 * 1000);
process.on('uncaughtException', err => console.error('⚠️ Uncaught exception:', err));
process.on('unhandledRejection', reason => console.error('⚠️ Unhandled rejection:', reason));
