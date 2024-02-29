module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Product", {
      productId: {
        type:DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  
    });
    return Products;
  }
  
  