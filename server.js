const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { exec } = require('child_process');

app.use(bodyParser.json());

// Start Minecraft Server
app.post('/start-minecraft-server', (req, res) => {
  const { serverId } = req.body;
  const serverPath = '/path/to/servers/' + serverId;
  exec(`screen -S minecraft-server -dm java -Xmx1024M -Xms1024M -jar ${serverPath}/minecraft_server.jar nogui`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Server started' });
  });
});

// Stop Minecraft Server
app.post('/stop-minecraft-server', (req, res) => {
  const { serverId } = req.body;
  exec(`screen -S minecraft-server -X quit`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Server stopped' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
