const accounts = require('../models/account.model');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email/Password invalid' });

    const account = await accounts.findOne({ email });
    if (!account)
      return res.status(404).json({ message: `Not found ${email}` });

    if (account.password !== password)
      return res.status(401).json({ message: `Unauthorized ${email}` });

    return res.status(200).json({ email });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email/Password invalid' });

    const account = await accounts.findOne({ email });
    if (account)
      return res.status(409).json({ message: `Conflict ${email}` });

    await accounts.create({ email, password });
    return res.status(201).json({ email });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const put = async (req, res) => {
  try {
    const { email } = req.params;
    const { password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email/Password invalid' });

    const account = await accounts.findOne({ email });
    if (!account)
      return res.status(404).json({ message: `Not found ${email}` });

    account.password = password;
    await account.save();
    return res.status(200).json({ email });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signin, signup, put };