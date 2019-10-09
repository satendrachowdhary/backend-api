const handleSignin = (req, res, bcrypt, db) => {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.status(400).json("please enter all the fields");
  }
  db.select("email", "hash", "id")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      console.log(isValid);
      if (isValid) {
        db.select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json("unable to get users"));
      } else {
        res.status(400).json("wrong info");
      }
    })
    .catch(err => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignin: handleSignin
};
