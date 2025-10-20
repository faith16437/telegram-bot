const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const app = express();

// Keep-alive route
app.get("/", (req, res) => res.send("Bot is live"));
app.listen(3000, () => console.log("Ping server running"));

const bot = new Telegraf('8292651925:AAHs0L3fBUqFEv83Nzf2IyaGIPszhPfupcA');

// 🔒 Image — replace this with your own hosted no-background version later
const photoUrl = 'https://i.postimg.cc/TPz0mH6t/Locked-With-Key-Emoji-removebg-preview.png';

// When new user joins
bot.on('new_chat_members', async (ctx) => {
  try {
    await ctx.replyWithPhoto(
      { url: photoUrl },
      {
        caption: '🔒 To unlock full group access, invite 5 people by clicking below:',
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
    );
  } catch (err) {
    console.error('❌ Failed to send message:', err);
  }
});

bot.launch();
