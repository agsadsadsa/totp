const express = require('express');
const otplib = require('otplib');
const path = require('path');

const app = express();

// 提供静态资源：public 文件夹中的 HTML、JS、CSS
app.use(express.static(path.join(__dirname, 'public')));

// API 路由：生成 TOTP 验证码
app.get('/api/totp', (req, res) => {
  const secret = req.query.secret;
  if (!secret) return res.status(400).send('Missing secret');
  try {
    const token = otplib.authenticator.generate(secret);
    res.send(token);
  } catch (err) {
    res.status(500).send('Invalid secret');
  }
});


// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TOTP API running on port ${PORT}`);
});
