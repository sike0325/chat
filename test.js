const res = await fetch('http://localhost:3000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: '你好，用一句话介绍你自己' }]
  })
});
const data = await res.json();
console.log(data);