const express = require("express");
const Drone = require("../models/drone");

// require the Drone model here

const router = express.Router();

router.get("/drones", (req, res, next) => {
  Drone.find({}, (err, drones) => {
    if (err) {
      return next(err);
    }
    res.render("drones/index", {
      drones: drones
    });
  });
});

router.get("/drones/new", (req, res, next) => {
  res.render("drones/new");
});

router.post("/drones", (req, res, next) => {
  const droneInfo = {
    droneName: req.body.droneName,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };
  // Create a new Product with the params
  const newDrone = new Drone(droneInfo);
  // Save the product to the DB
  newDrone.save(err => {
    if (err) {
      return next(err);
    }
    // redirect to the list of products if it saves
    return res.redirect("/drones");
  });
});

module.exports = router;
