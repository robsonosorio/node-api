import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const user = await User.findAll();

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: 'algo deu errado.' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Falha na validação de dados.' });
    }

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.params.id);

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
