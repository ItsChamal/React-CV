
const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const authMW  = require('../middleware/auth');
const crypto  = require('crypto');

const router = express.Router();
const { JWT_SECRET } = process.env;

// Register new user
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hash });
    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Authenticate user & get token
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Forgot password - generate reset token
router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // In a real application, you would send an email with a link containing the token
    // For demonstration purposes, we'll just return the token
    res.json({ 
      msg: 'Password reset link sent to your email',
      // Remove this in production - just for testing
      resetToken: resetToken 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Reset password
router.post('/resetpassword/:token', async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    
    // Find user by reset token and check if it's expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ msg: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get current user (protected)
router.get('/me', authMW, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
