const { Router } = require("express");
const User = require("../models/User");
const checkAuth = require("../middlewares/checkAuth");
const router = Router();




router.get("/users", checkAuth, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ id: newUser.id, email: newUser.email, role: newUser.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.get("/users/:id", checkAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.put("/users/:id", checkAuth, async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




router.delete("/users/:id", checkAuth, async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    res.sendStatus(deleted ? 204 : 404);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
