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

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id || req.params.name);

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

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação de dados.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Já existe usuário cadastrado com esse email' });
    }

    const { id, name, email, adm, active } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      adm,
      active,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação de dados.' });
    }

    const user = await User.findByPk(req.params.id);

    const { id, name, adm, active } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      adm,
      active,
    });
  }

  async destroy(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      await user.destroy();

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: 'algo deu errado.' });
    }
  }
}

export default new UserController();
