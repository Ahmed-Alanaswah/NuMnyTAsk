module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastLoginDateTime: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    image: {
      type: DataTypes.STRING,
    },
  });

  // Users.associate = (models) => {
  //   // ClaimedDeal.belongsTo(models.Users);
  //   ClaimedDeal.belongsTo(models.Deals);
  // };
  return Users;
};
