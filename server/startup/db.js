module.exports = function (app) {
  const db = require("../models");

  db.sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  });
};
