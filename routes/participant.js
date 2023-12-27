const { Router } = require("express");
const Participant = require("../models/Participant");
const checkAuth = require("../middlewares/checkAuth");
const router = Router();

var checkAuth = require('../midlewares/checkAuth')

router.get("/participants", checkAuth, async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.post("/participants", async (req, res) => {
  try {
    const newParticipant = await Participant.create(req.body);
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/participants/:id", checkAuth, async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (participant) {
      res.status(200).json(participant);
    } else {
      res.status(404).json({ error: 'Participant non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.put("/participants/:id", checkAuth, async (req, res) => {
  try {
    const [updated] = await Participant.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedParticipant = await Participant.findByPk(req.params.id);
      res.status(200).json(updatedParticipant);
    } else {
      res.status(404).json({ error: 'Participant non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




router.delete("/participants/:id", checkAuth, async (req, res) => {
  try {

    const deleted = await Participant.destroy({
      where: { id: req.params.id }
    });
    res.sendStatus(deleted ? 204 : 404);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
