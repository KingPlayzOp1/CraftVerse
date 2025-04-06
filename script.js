const api = 'http://localhost:3000/api';

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      location.href = 'dashboard.html';
    } else {
      document.getElementById('msg').innerText = data.error || 'Login failed';
    }
  });
}

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch(`${api}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(data => {
    document.getElementById('msg').innerText = 'Registered! Please login.';
  });
}

function logout() {
  localStorage.removeItem('token');
}

if (location.pathname.endsWith('dashboard.html')) {
  fetch(`${api}/servers`, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  }).then(res => res.json()).then(data => {
    const serversDiv = document.getElementById('servers');
    data.forEach(s => {
      const el = document.createElement('div');
      el.innerHTML = `<b>${s.name}</b> - ${s.path}`;
      serversDiv.appendChild(el);
    });
  });
}

function addServer() {
  const name = document.getElementById('serverName').value;
  const path = document.getElementById('serverPath').value;
  fetch(`${api}/servers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ name, path })
  }).then(res => res.json()).then(() => {
    alert('Server added!');
    location.reload();
  });
}

function startServer() {
  fetch(`${api}/start-minecraft-server`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ serverId: 'exampleServerId' })
  }).then(res => res.json()).then(data => {
    alert('Server started!');
  });
}

function stopServer() {
  fetch(`${api}/stop-minecraft-server`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ serverId: 'exampleServerId' })
  }).then(res => res.json()).then(data => {
    alert('Server stopped!');
  });
}
