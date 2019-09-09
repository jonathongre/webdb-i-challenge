const router = require('express').Router();

const db = require("../data/dbConfig");

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    });
});

router.post("/", (req, res) => {
  const account = req.body;

  db("accounts")
    .insert(account)
    .then(ids => {
      const id = ids[0];

      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  db("accounts")
    .where({ id: id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db("accounts")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(201).json({ message: `${count} record(s) deleted` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;