const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const app = express();

// Ping server to keep Replit alive
app.get("/", (req, res) => res.send("Bot is live"));
app.listen(3000, () => console.log("Ping server running"));

// Replace with your bot token
const bot = new Telegraf('8292651925:AAHs0L3fBUqFEv83Nzf2IyaGIPszhPfupcA');

// Replace with your sticker file_id or URL
const STICKER_ID = 'CAACAgUAAxkBAAEBb9xmRxyzABCDEfghIJKLmNoPqrstUvWXyzAAEAAiIAAjAABx3K8fLrKoWcljYE';

bot.on('new_chat_members', async (ctx) => {
  try {
    const groupLink = 'https://t.me/yourgroup'; // change to your group link

    await ctx.replyWithSticker(STICKER_ID, Markup.inlineKeyboard([
      [Markup.button.url('📣 Share Group', `https://t.me/share/url?url=${encodeURIComponent(groupLink)}`)],
      [Markup.button.url('🚪 Open Group', groupLink)]
    ]));
  } catch (err) {
    console.error('Error sending sticker or buttons:', err);
  }
});

bot.launch();
console.log('Bot is running...');
