function error(err, req, res, next) {
  console.error(err);
  res.status(500).send("something field.");
}

module.exports = { error };
