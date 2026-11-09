const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../helpers/jwt');
const { Admin } = require('../models/admin');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin access required.' });
  try {
    const admins = await Admin.find().select('-passwordHash');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load admins.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const secret = process.env.secret;
    if (!secret) return res.status(500).json({ message: 'Server authentication is not configured.' });
    const token = jwt.sign({ adminemail: admin.email, isAdmin: admin.isAdmin }, secret, { expiresIn: '1d' });
    return res.json({ admin: admin.email, token });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to sign in.' });
  }
});

// Keep initial admin provisioning private: this endpoint is available only when explicitly enabled.
router.post('/', async (req, res) => {
  if (process.env.ALLOW_ADMIN_REGISTRATION !== 'true') {
    return res.status(403).json({ message: 'Admin registration is disabled.' });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
    const existing = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (existing) return res.status(409).json({ message: 'An admin with this email already exists.' });
    const admin = await new Admin({
      email: email.trim().toLowerCase(),
      passwordHash: bcrypt.hashSync(password, 10),
    }).save();
    return res.status(201).json({ id: admin.id, email: admin.email });
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create admin.' });
  }
});

module.exports = router;
