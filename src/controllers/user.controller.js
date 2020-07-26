const users = require('../models/user.model');

const userJson = (data) => ({
  email: data.email,
  name: data.name,
  lists: data.lists.map(l => ({
    title: l.title,
    tasks: l.tasks.map(t => ({
      description: t.description,
      done: t.done,
    })),
  })),
});

const get = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email)
      return res.status(400).json({ message: 'Email invalid' });

    const user = await users.findOne({ email });
    if (!user)
      return res.status(404).json({ message: `Not found ${email}` });

    return res.status(200).json(userJson(user));
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const post = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email)
      return res.status(400).json({ message: 'Email invalid' });

    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: 'Name invalid' });

    const user = await users.findOne({ email });
    if (user)
      return res.status(409).json({ message: `Conflict ${email}` });

    await users.create({ email, name });
    return res.status(201).json({ email, name });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const put = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email)
      return res.status(400).json({ message: 'Email invalid' });

    const { lists } = req.body;
    if (!lists)
      return res.status(400).json({ message: 'Lists invalid' });

    const user = await users.findOne({ email });
    if (!user)
      return res.status(404).json({ message: `Not found ${email}` });

    user.lists = lists;
    await user.save();
    return res.status(202).json(userJson(user));
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { get, post, put };