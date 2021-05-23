const express = require('express');
const router = express.Router();
const { Student, Campus } = require('../database/models');

const ash = require('express-async-handler');

/** GET ALL CAMPUSES */

router.get('/', ash(async(req, res) => {
  let campuses = await Campus.findAll({include: [Student]});
  res.status(200).json(campuses);
}));

/** GET CAMPUS BY ID*/
router.get('/:id', ash(async(req, res) => {
  let campus = await Campus.findByPk(req.params.id, {include: [Student]});
  res.status(200).json(campus);
}));

/** ADD NEW CAMPUS */
router.post('/', function(req, res, next) {
  // Set options for find or create
  let options = {
    where: { name: req.body.name }, // email should be a student's unique identifier
    default: req.body // if no student with that email was found, create a student with the req.body
  };
  Campus.findOrCreate(options)
    .then(createdCampus => res.status(200).json(createdCampus))
    .catch(err => next(err));
});

/** DELETE CAMPUS */
router.delete('/:id', function(req, res, next) {
  Campus.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a campus!"))
    .catch(err => next(err));
});

/** UPDATE CAMPUS */
router.put('/:id', ash(async(req, res) => {
  await Campus.update(req.body,
        { where: {id: req.params.id} }
  );
  let campus = await Campus.findByPk(req.params.id);
  res.status(201).json(campus);
}));

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
