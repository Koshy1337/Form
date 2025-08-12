export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const chatId = process.env.TELEGRAM_CHAT_ID;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const text = `📩 New Form Submission:\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const telegramRes = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!telegramRes.ok) {
      throw new Error(`Telegram API error: ${telegramRes.statusText}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
