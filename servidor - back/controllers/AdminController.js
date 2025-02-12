const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Usuário já existe" });
    }

    const newAdmin = new User({
      name,
      email,
      password,
      isAdmin: true,
    });

    await newAdmin.save();

    res.json({ msg: "Admin criado com sucesso" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
