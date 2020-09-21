import * as Yup from 'yup';

import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    try {
      const product = await Product.findAll();

      return res.json(product);
    } catch (err) {
      return res.status(400).json({ error: 'algo deu errado.' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      logo: Yup.string().required(),
      manual: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const productExists = await Product.findOne({
      where: { name: req.body.name },
    });

    if (productExists) {
      return res
        .status(400)
        .json({ error: 'Já existe produto cadastrado com esse nome.' });
    }

    const { id, name, description, logo, manual } = await Product.create(
      req.body
    );

    return res.json({
      id,
      name,
      description,
      logo,
      manual,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.index(),
      name: Yup.string(),
      description: Yup.string(),
      logo: Yup.string(),
      manual: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const product = await Product.findByPk(req.userId);

    if (product != product.id) {
      const productExists = await Product.findOne({ where: { id } });

      if (productExists) {
        return res
          .status(400)
          .json({ error: 'Já existe produto cadastrado com esse nome.' });
      }
    }

    const { id, name, description, logo, manual } = await product.update(
      req.body
    );

    return res.json({
      id,
      name,
      description,
      logo,
      manual,
    });
  }
}

export default new ProductController();
