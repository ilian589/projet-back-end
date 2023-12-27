const { Router } = require("express");
const Categorie = require("../models/Categorie");
const checkAuth = require("../middlewares/checkAuth"); 
const router = Router();

var checkAuth = require('../midlewares/checkAuth')


router.get("/categories", async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/categories", checkAuth, async (req, res) => {
  try {
    const newCategorie = await Categorie.create({
      cate_nom: req.body.cate_nom,
      description: req.body.description
    });
    res.status(201).json(newCategorie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




router.get("/categories/:id", async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (categorie) {
      res.status(200).json(categorie);
    } else {
      res.status(404).json({ error: 'Catégorie non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.put("/categories/:id", checkAuth, async (req, res) => {
  try {
    const [updated] = await Categorie.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCategorie = await Categorie.findByPk(req.params.id);
      res.status(200).json(updatedCategorie);
    } else {
      res.status(404).json({ error: 'Catégorie non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





router.delete("/categories/:id", checkAuth, async (req, res) => {
  try {
    const deleted = await Categorie.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Catégorie non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
