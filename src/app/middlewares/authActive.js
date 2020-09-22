import User from '../models/User';

export default async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { active } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário desativado.' });
    }

    req.send(user);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
