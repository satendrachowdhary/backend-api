const handleRegister = (req, res, bcrypt, db, saltRounds) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json("please enter all the fields");
  }
  const hash = bcrypt.hashSync(password, saltRounds);

  db.transaction(trx => {
    trx("login")
      .insert({
        hash: hash,
        email: email
      })
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({ email: loginEmail[0], name: name, joined: new Date() })
          .then(user => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("unable to register"));
};

module.exports = { handleRegister: handleRegister };
