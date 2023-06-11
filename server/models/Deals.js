module.exports = (sequelize, DataTypes) => {
  const Deals = sequelize.define("Deals", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Deals.associate = (models) => {
    Deals.hasMany(models.ClaimedDeal);
  };

  return Deals;
};
