const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data', 'settings.json');
const MESSAGES_FILE = path.join(__dirname, 'data', 'messages.json');
const BANNERS_FILE = path.join(__dirname, 'data', 'banners.json');
const NAV_FILE     = path.join(__dirname, 'data', 'navigation.json');
const EXPERTS_FILE = path.join(__dirname, 'data', 'experts.json');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// SSE clients list
let sseClients = [];

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    websiteName: 'Inteshape Admin',
    supportEmail: 'admin@inteshape.com',
    primaryColor: '#29abe2',
    tagline: 'Subscribe',
    logoStyle: 'Rectangle',
    headerLogo: null,
    footerLogo: null,
    favicon: null,
  }, null, 2));
}
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(BANNERS_FILE)) {
  fs.writeFileSync(BANNERS_FILE, JSON.stringify([
    { id: 1, number: '01', eyebrow: 'VARIETY',  title: 'Flooring for Any Interior site',    desc: 'Right design and right ideas matter a lot in interior design business.', cta: 'READ MORE', image: null, active: true },
    { id: 2, number: '02', eyebrow: 'RELIABLE', title: 'Professionals you can rely on',      desc: 'Right design and right ideas matter a lot in interior design business.', cta: 'READ MORE', image: null, active: true },
    { id: 3, number: '03', eyebrow: 'DESIGN',   title: 'Minimalist vibes with natural light', desc: 'Bring calm to your space with clean lines and warm textures.', cta: 'READ MORE', image: null, active: true },
    { id: 4, number: '04', eyebrow: 'STYLE',    title: 'Scandi chairs and soft plants',       desc: 'Balanced contrast for spaces that feel curated yet livable.', cta: 'READ MORE', image: null, active: true },
  ], null, 2));
}
if (!fs.existsSync(NAV_FILE)) {
  fs.writeFileSync(NAV_FILE, JSON.stringify({
    header: [
      { id: 1, label: 'Home',       path: '/',          active: true },
      { id: 2, label: 'About Us',   path: '/about',     active: true },
      { id: 3, label: 'Portfolio',  path: '/portfolio', active: true },
      { id: 4, label: 'Blog',       path: '/blog',      active: true },
      { id: 5, label: 'Projects',   path: '/projects',  active: true },
      { id: 6, label: 'Contact Us', path: '/contact',   active: true },
    ],
    footer: [
      { id: 1, label: 'Home',      path: '/',          active: true },
      { id: 2, label: 'About',     path: '/about',     active: true },
      { id: 3, label: 'Portfolio', path: '/portfolio', active: true },
      { id: 4, label: 'Blog',      path: '/blog',      active: true },
      { id: 5, label: 'Contact',   path: '/contact',   active: true },
    ],
    mobileMenuTop: [],
    mobileApp: [],
    socialMediaLinks: { facebookLink: '', twitterLink: '', instagramLink: '', linkedinLink: '' },
  }, null, 2));
}
if (!fs.existsSync(EXPERTS_FILE)) {
  fs.writeFileSync(EXPERTS_FILE, JSON.stringify([
    { id: 1, title: 'Interior Work Avroko',   location: 'Muscat, Sultanate of Oman', image: null, active: true },
    { id: 2, title: 'Qatar Pavilion',          location: 'Muscat, Sultanate of Oman', image: null, active: true },
    { id: 3, title: 'House Blueprint',         location: 'Muscat, Sultanate of Oman', image: null, active: true },
  ], null, 2));
}

const readSettings = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const writeSettings = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
const readMessages = () => JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
const writeMessages = (data) => fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data, null, 2));
const readBanners  = () => JSON.parse(fs.readFileSync(BANNERS_FILE, 'utf-8'));
const writeBanners = (data) => fs.writeFileSync(BANNERS_FILE, JSON.stringify(data, null, 2));
const readNav  = () => JSON.parse(fs.readFileSync(NAV_FILE, 'utf-8'));
const writeNav = (data) => fs.writeFileSync(NAV_FILE, JSON.stringify(data, null, 2));
const readExperts  = () => JSON.parse(fs.readFileSync(EXPERTS_FILE, 'utf-8'));
const writeExperts = (data) => fs.writeFileSync(EXPERTS_FILE, JSON.stringify(data, null, 2));

// Broadcast to all SSE clients
const broadcast = (data) => {
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach(client => client.res.write(msg));
};

// GET /api/settings/stream  — SSE real-time updates
app.get('/api/settings/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.flushHeaders();

  // Send current settings immediately on connect
  try {
    const settings = readSettings();
    res.write(`data: ${JSON.stringify(settings)}\n\n`);
  } catch (e) {}

  const client = { id: Date.now(), res };
  sseClients.push(client);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c.id !== client.id);
  });
});

// GET /api/settings
app.get('/api/settings', (req, res) => {
  try {
    const settings = readSettings();
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load settings' });
  }
});

// POST /api/settings
app.post('/api/settings', (req, res) => {
  try {
    const current = readSettings();
    const updated = { ...current, ...req.body };
    writeSettings(updated);
    broadcast(updated); // Push to all SSE clients instantly
    res.json({ success: true, message: 'Settings saved successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save settings' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Inteshape Backend is running', port: PORT });
});

// ── Messages API ─────────────────────────────────────────
// GET /api/messages
app.get('/api/messages', (req, res) => {
  try {
    res.json({ success: true, data: readMessages() });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load messages' });
  }
});

// POST /api/messages  (submitted from contact form)
app.post('/api/messages', (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    const msgs = readMessages();
    const newMsg = {
      id: Date.now(),
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      phone: phone || '',
      message: message || '',
      read: false,
      createdAt: new Date().toISOString(),
    };
    msgs.unshift(newMsg);
    writeMessages(msgs);
    broadcast({ type: 'newMessage', message: newMsg });
    res.json({ success: true, data: newMsg });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save message' });
  }
});

// PATCH /api/messages/:id/read
app.patch('/api/messages/:id/read', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const msgs = readMessages().map(m => m.id === id ? { ...m, read: true } : m);
    writeMessages(msgs);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// DELETE /api/messages/:id
app.delete('/api/messages/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const msgs = readMessages().filter(m => m.id !== id);
    writeMessages(msgs);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ── Banners API ──────────────────────────────────────────
app.get('/api/banners', (req, res) => {
  try { res.json({ success: true, data: readBanners() }); }
  catch (err) { res.status(500).json({ success: false }); }
});

app.post('/api/banners', (req, res) => {
  try {
    const { number, eyebrow, title, desc, cta, image } = req.body;
    const banners = readBanners();
    const newBanner = { id: Date.now(), number: number || String(banners.length + 1).padStart(2,'0'), eyebrow: eyebrow||'', title: title||'', desc: desc||'', cta: cta||'READ MORE', image: image||null, active: true };
    banners.push(newBanner);
    writeBanners(banners);
    broadcast({ type: 'bannersUpdated', banners });
    res.json({ success: true, data: newBanner });
  } catch (err) { res.status(500).json({ success: false }); }
});

app.put('/api/banners/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const banners = readBanners().map(b => b.id === id ? { ...b, ...req.body, id } : b);
    writeBanners(banners);
    broadcast({ type: 'bannersUpdated', banners });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false }); }
});

app.delete('/api/banners/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const banners = readBanners().filter(b => b.id !== id);
    writeBanners(banners);
    broadcast({ type: 'bannersUpdated', banners });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false }); }
});

// ── Navigation API ───────────────────────────────────────
// GET /api/navigation
app.get('/api/navigation', (req, res) => {
  try { res.json({ success: true, data: readNav() }); }
  catch (err) { res.status(500).json({ success: false }); }
});

// PUT /api/navigation/:section  (section = header | footer | mobileMenuTop | mobileApp)
app.put('/api/navigation/:section', (req, res) => {
  try {
    const { section } = req.params;
    const allowed = ['header', 'footer', 'mobileMenuTop', 'mobileApp', 'socialMediaLinks'];
    if (!allowed.includes(section)) return res.status(400).json({ success: false, message: 'Invalid section' });
    const nav = readNav();
    nav[section] = req.body;
    writeNav(nav);
    broadcast({ type: 'navUpdated', nav });
    res.json({ success: true, data: nav });
  } catch (err) { res.status(500).json({ success: false }); }
});

// ── Experts API ─────────────────────────────────────────
app.get('/api/experts', (req, res) => {
  try { res.json({ success: true, data: readExperts() }); }
  catch (err) { res.status(500).json({ success: false }); }
});

app.post('/api/experts', (req, res) => {
  try {
    const { title, location, image } = req.body;
    const experts = readExperts();
    const newExpert = { id: Date.now(), title: title||'', location: location||'', image: image||null, active: true };
    experts.push(newExpert);
    writeExperts(experts);
    res.json({ success: true, data: newExpert });
  } catch (err) { res.status(500).json({ success: false }); }
});

app.put('/api/experts/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const experts = readExperts().map(e => e.id === id ? { ...e, ...req.body, id } : e);
    writeExperts(experts);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false }); }
});

app.delete('/api/experts/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    writeExperts(readExperts().filter(e => e.id !== id));
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false }); }
});

app.listen(PORT, () => {
  console.log(`✅ Inteshape Backend running on http://localhost:${PORT}`);
  console.log(`   GET  http://localhost:${PORT}/api/settings`);
  console.log(`   POST http://localhost:${PORT}/api/settings`);
  console.log(`   SSE  http://localhost:${PORT}/api/settings/stream`);
  console.log(`   GET  http://localhost:${PORT}/api/messages`);
  console.log(`   POST http://localhost:${PORT}/api/messages`);
});
