const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const app = express();

// Keep-alive for Railway
app.get('/', (req, res) => res.send('Bot is live'));
app.listen(3000, () => console.log('✅ Web server running'));

// Telegram bot
const bot = new Telegraf('8292651925:AAHs0L3fBUqFEv83Nzf2IyaGIPszhPfupcA');

bot.on('new_chat_members', async (ctx) => {
  try {
    // 🔐 Sent separately to appear large
    await ctx.reply('🔐');

    // Text + inline buttons
    await ctx.reply(
      `To Unlock Full Group Access✅:`,
      {
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.url(
              '📤 SHARE TO OPEN [0/5]',
              'https://t.me/share/url?url=https://t.me/starlight1_8&text=Join this group'
            ),
          ],
          [Markup.button.url('🔓 OPEN GROUP', 'https://t.me/starlight1_8')],
        ]),
      }
    );

    console.log('👋 Sent welcome/unlock message');
  } catch (err) {
    console.error('❌ Error sending message:', err.message);
  }
});

// Launch bot
bot.launch().then(() => console.log('🚀 Bot launched successfully'));

// Keep alive logs
setInterval(() => console.log('💓 Bot still alive'), 120000);

process.on('uncaughtException', (err) => console.error('⚠️ Uncaught exception:', err));
process.on('unhandledRejection', (reason) => console.error('⚠️ Unhandled rejection:', reason));
