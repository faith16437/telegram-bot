const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const app = express();

app.get("/", (req, res) => res.send("Bot is live"));
app.listen(3000, () => console.log("Ping server running"));

const bot = new Telegraf('8292651925:AAHs0L3fBUqFEv83Nzf2IyaGIPszhPfupcA');
const photoUrl = 'https://i.postimg.cc/f3vYQCkd/6078839e.jpg';

bot.on('new_chat_members', (ctx) => {
  ctx.replyWithPhoto(
    { url: photoUrl },
    {
      caption: '🔒 To unlock full group access, invite 5 people by clicking below:',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.url('📤 SHARE TO OPEN [0/5]', 'https://t.me/share/url?url=https://t.me/starlight1_8&text=Join this group')],
        [Markup.button.url('🔓 OPEN GROUP', 'https://t.me/starlight1_8')]
      ])
    }
  );
});

bot.launch();
