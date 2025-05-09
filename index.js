const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// ✅ Hardcoded NetSuite URL
const TARGET_URL = 'https://8869626.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2239&deploy=1&compid=8869626&ns-at=AAEJ7tMQWqfayGlovA_0cQpw0pkkSJj8L7hOYASVjnO86mffWDA';

app.post('/clean', async (req, res) => {
  try {
    const response = await axios({
      url: TARGET_URL,
      method: 'POST',
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': '' // Strip or fake User-Agent
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      detail: error.response?.data || 'Request failed'
    });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Clean Proxy is running. Use POST /clean');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy server running on port ${PORT}`));
