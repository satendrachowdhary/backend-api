const handleImageCount = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entry => {
      if (entry.length) {
        res.json(entry[0]);
      } else {
        res.status(400).json("no entries");
      }
    })
    .catch(err => res.json("cannot get entries"));
};

module.exports = {
  handleImageCount: handleImageCount
};
