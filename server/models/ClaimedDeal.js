module.exports = (sequelize, DataTypes) => {
  const ClaimedDeal = sequelize.define("ClaimedDeal", {
    amount: {
      type: DataTypes.INTEGER,
    },
    currency: {
      type: DataTypes.STRING,
    },
  });

  ClaimedDeal.associate = (models) => {
    ClaimedDeal.belongsTo(models.Users);
    ClaimedDeal.belongsTo(models.Deals);
  };

  return ClaimedDeal;
};
