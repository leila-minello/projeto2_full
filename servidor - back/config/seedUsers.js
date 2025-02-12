const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const User = require('../models/User');
const db = require('./db');

const users = [
  {
    name: 'Leila',
    email: 'leila@gmail.com',
    password: 'leila123',
    isAdmin: true,
  },
  {
    name: 'Gabriel',
    email: 'gabriel@gmail.com',
    password: 'gabriel123',
    isAdmin: false,
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔹 Conectado ao MongoDB');

    await User.deleteMany();
    console.log('🔄 Usuários antigos removidos');

    await User.insertMany(users);
    console.log('✅ Usuários predefinidos criados com sucesso');

    mongoose.connection.close();
    console.log('🔚 Conexão encerrada');
  } catch (error) {
    console.error('❌ Erro ao criar usuários:', error);
    mongoose.connection.close();
  }
};

seedUsers();
