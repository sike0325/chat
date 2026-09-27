import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/chat', async (req, res) => {
  try {
        const { messages, profile } = req.body;
    const finalMessages = profile && profile.trim()
      ? [{ role: 'system', content: '以下是用户的个人档案，请以此为背景进行对话：\n' + profile }, ...messages]
      : messages;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
       messages: finalMessages,
        stream: false,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? '（没拿到回复）';
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: '出错了：' + err.message });
  }
});

app.listen(3000, '0.0.0.0', () => console.log('服务跑在 http://localhost:3000'));