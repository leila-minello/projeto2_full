const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const requestedUserId = req.params.id;

    let user = await User.findById(requestedUserId);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

    res.json({ msg: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
