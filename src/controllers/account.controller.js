const accounts = require('../models/account.model');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim())
      return res.status(400).json({ message: 'Email invalid' });
    if (!password?.trim())
      return res.status(400).json({ message: 'Password invalid' });

    const account = await accounts.findOne({ email });
    if (!account)
      return res.status(404).json({ message: `Not found ${email}` });

    if (account.password !== password)
      return res.status(401).json({ message: `Unauthorized ${email}` });

    const { name } = account;
    return res.status(200).json({ email, name });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email?.trim())
      return res.status(400).json({ message: 'Email invalid' });
    if (!password?.trim())
      return res.status(400).json({ message: 'Password invalid' });
    if (!name?.trim())
      return res.status(400).json({ message: 'Name invalid' });

    const account = await accounts.findOne({ email });
    if (account)
      return res.status(409).json({ message: `Conflict ${email}` });

    await accounts.create({ email, password, name });
    return res.status(201).json({ email, name });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const put = async (req, res) => {
  try {
    const { email } = req.params;
    const { password, name } = req.body;
    if (!email?.trim())
      return res.status(400).json({ message: 'Email invalid' });
    if (!password?.trim())
      return res.status(400).json({ message: 'Password invalid' });
    if (!name?.trim())
      return res.status(400).json({ message: 'Name invalid' });

    const account = await accounts.findOne({ email });
    if (!account)
      return res.status(404).json({ message: `Not found ${email}` });

    account.password = password;
    account.name = name;
    await account.save();
    return res.status(200).json({ email, name });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signin, signup, put };