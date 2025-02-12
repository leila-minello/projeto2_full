const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: 'Usuário ou senha inválidos' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Usuário ou senha inválidos' });

    res.json({ token: generateToken(user._id), user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
};
