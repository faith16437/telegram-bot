const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const fs = require('fs');
const app = express();

app.get("/", (req, res) => res.send("Bot is live"));
app.listen(3000, () => console.log("✅ Ping server running on port 3000"));

const bot = new Telegraf('8292651925:AAHs0L3fBUqFEv83Nzf2IyaGIPszhPfupcA');
const stickerBuffer = fs.readFileSync('chpic.su_-_RestrictedEmoji_616-ezgif.com-gif-maker.webp');

// --- Helper: auto retry if send fails ---
async function safeSend(action, retries = 2, delay = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await action();
    } catch (err) {
      if (i < retries) {
        console.warn(`⚠️ Send failed (${i + 1}), retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        console.error(`❌ Send permanently failed: ${err.message}`);
      }
    }
  }
}

bot.on('new_chat_members', async (ctx) => {
  try {
    // Send both simultaneously for speed
    const sendSticker = safeSend(() =>
      ctx.replyWithSticker({ source: stickerBuffer })
    );

    const sendButtons = safeSend(() =>
      ctx.reply(
        '<b>🔐 To Unlock Full Group Access✅</b>\nInvite 5 people by clicking below:',
        {
          parse_mode: 'HTML',
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.url('📤 SHARE TO OPEN [0/5]', 'https://t.me/share/url?url=https://t.me/starlight1_8&text=Join this group')],
            [Markup.button.url('🔓 OPEN GROUP', 'https://t.me/starlight1_8')]
          ])
        }
      )
    );

    await Promise.allSettled([sendSticker, sendButtons]);
    console.log('✅ Sticker + buttons sent successfully');
  } catch (err) {
    console.error('❌ Failed to send welcome flow:', err.message);
  }
});

bot.launch()
  .then(() => console.log('🚀 Bot launched successfully'))
  .catch(err => console.error('❌ Launch error:', err.message));

setInterval(() => console.log('💓 Bot still alive'), 2 * 60 * 1000);

process.on('uncaughtException', err => console.error('⚠️ Uncaught exception:', err));
process.on('unhandledRejection', reason => console.error('⚠️ Unhandled rejection:', reason));
