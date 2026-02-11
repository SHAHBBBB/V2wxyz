const express = require('express');
const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

// توکن ربات تلگرام (از @BotFather گرفته شده)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8313232626:AAGRR0Z1I1vwyqXnAvV39NX0Y18AaAKh0jc';
const CHANNEL_USERNAME = process.env.CHANNEL_USERNAME || 'https://t.me/+3FkY9qe55zw3YjJk';

// ایجاد ربات تلگرام
let bot = null;
if (TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE') {
  bot = new Telegraf(TELEGRAM_BOT_TOKEN);
  console.log('✅ ربات تلگرام با موفقیت ساخته شد.');
} else {
  console.log('⚠️ توکن ربات تنظیم نشده. ارسال پیام به کانال غیرفعال است.');
}

// متن پیام برای ارسال کانفیگ
function getMessageText() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  return `
🚀 V2Ray Subscription Generator
📅 تاریخ: ${todayStr}
🔗 لینک کانفیگ امروز: /today
🔗 لینک کانفیگ دیروز: /yesterday
  `;
}

// ارسال پیام به کانال هر روز ساعت 00:00
cron.schedule('0 0 * * *', async () => {
  if (!bot) {
    console.log('⚠️ ربات فعال نیست. پیام ارسال نشد.');
    return;
  }
  try {
    await bot.telegram.sendMessage(`@${CHANNEL_USERNAME}`, getMessageText());
    console.log('✅ پیام امروز به کانال ارسال شد.');
  } catch (error) {
    console.error('❌ خطا در ارسال پیام به کانال:', error.message);
  }
});

// روت اصلی
app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 V2Ray Subscription Generator (Daily)</h1>
    <p>لینک کانفیگ امروز: <a href="/today">/today</a></p>
    <p>لینک کانفیگ دیروز: <a href="/yesterday">/yesterday</a></p>
  `);
});

// روت کانفیگ امروز
app.get('/today', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('vmess://eyJ2IjoiMiIsInZtZXNzIjoi...');
});

// روت کانفیگ دیروز
app.get('/yesterday', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('vmess://eyJ2IjoiMiIsInZtZXNzIjoi...');
});

// اجرای سرور
app.listen(PORT, () => {
  console.log(`✅ سرور روی پورت ${PORT} اجرا شد.`);
});