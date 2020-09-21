import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Já existe usuário cadastrado com esse email' });
    }

    const { id, name, email, adm_user, active } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      adm_user,
      active,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email != user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'Já existe usuário cadastrado com esse email' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const { id, name, adm_user, active } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      adm_user,
      active,
    });
  }
}

export default new UserController();
