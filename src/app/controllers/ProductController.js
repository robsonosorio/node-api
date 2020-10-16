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

  async show(req, res) {
    try {
      const product = await Product.findByPk(req.params.id || req.params.name);

      return res.json(product);
    } catch (err) {
      return res.status(400).json({ error: 'algo deu errado.' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      logo: Yup.string(),
      manual: Yup.string(),
    });

    if (!(await schema.isValid(req.body, req.file))) {
      return res.status(400).json({ error: 'Falha na validação de dados.' });
    }

    const productExists = await Product.findOne({
      where: { name: req.body.name },
    });

    if (productExists) {
      return res
        .status(400)
        .json({ error: 'Já existe produto cadastrado com esse nome.' });
    }

    const { filename: logo } = req.file;

    const { id, name, description, manual } = req.body;

    const products = await Product.create({
      id,
      name,
      description,
      logo,
      manual,
    });

    return res.json(products);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      logo: Yup.string(),
      manual: Yup.string(),
    });

    if (!(await schema.isValid(req.body, req.file))) {
      return res.status(400).json({ error: 'Falha na validação de dados.' });
    }

    const product = await Product.findByPk(req.params.id);

    const { filename: logo } = req.file;

    const { id, name, description, manual } = req.body;

    const products = await product.update({
      id,
      name,
      description,
      logo,
      manual,
    });

    return res.json(products);
  }

  async destroy(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);

      await product.destroy();

      return res.json(product);
    } catch (err) {
      return res.status(400).json({ error: 'algo deu errado.' });
    }
  }
}

export default new ProductController();
