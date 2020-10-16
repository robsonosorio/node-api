import Sequelize, { Model } from 'sequelize';
class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        logo: Sequelize.STRING,
        manual: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Product;
