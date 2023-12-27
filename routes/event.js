const { Router } = require("express");
const Event = require("../models/Event"); 
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();


var checkAuth = require('../midlewares/checkAuth')

router.get("/events", async (req, res, next) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    next(err);
  }
});


router.post("/events", checkAuth, async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});


router.get("/events/:id", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});


router.patch("/events/:id", checkAuth, async (req, res, next) => {
  try {
    const [updated] = await Event.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEvent = await Event.findByPk(req.params.id);
      res.status(200).json(updatedEvent);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});


router.delete("/events/:id", checkAuth, async (req, res, next) => {
  try {
    const deleted = await Event.destroy({
      where: { id: req.params.id }
    });
    res.sendStatus(deleted ? 204 : 404);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
