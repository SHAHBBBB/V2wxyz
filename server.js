const express = require('express');
const Telegraf = require('telegraf');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

// توکن ربات تلگرام (از @BotFather گرفته شده)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_USERNAME = process.env.CHANNEL_USERNAME;

// ایجاد ربات تلگرام
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// تاریخ امروز
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const todayStr = `${year}-${month}-${day}`;

// لینک کانفیگ امروز
const configLink = `https://your-sub.com/today`;

// متن پیام برای ارسال کانفیگ
const messageText = `
🚀 V2Ray Subscription Generator (Daily)
لینک کانفیگ امروز: /today
لینک کانفیگ دیروز: /yesterday
دسترسی به کانفیگ‌ها: ${configLink}
`;

// ارسال پیام به کانال هر روز ساعت 00:00
cron.schedule('0 0 * * *', async () => {
  try {
    await bot.telegram.sendMessage(`@${CHANNEL_USERNAME}`, messageText);
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
    <p>دسترسی به کانفیگ‌ها: <a href="https://your-sub.com/today">https://your-sub.com/today</a></p>
  `);
});

// روت کانفیگ امروز
app.get('/today', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`vmess://eyJ2IjoiMiIsInZtZXNzIjoi...`);
});

// روت کانفیگ دیروز
app.get('/yesterday', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`vmess://eyJ2IjoiMiIsInZtZXNzIjoi...`);
});

// اجرا
app.listen(PORT, () => {
  console.log(`✅ سرور روی پورت ${PORT} اجرا شد.`);
});