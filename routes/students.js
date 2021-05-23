const express = require('express');
const router = express.Router();
const { Student, Campus } = require('../database/models');

//so we don't have to use try-catch for each request handler
const ash = require('express-async-handler');

/** GET ALL STUDENTS: then/catch */
// router.get('/', function(req, res, next) {
//   Student.findAll({include: [Campus]})
//     .then(students => res.status(200).json(students))
//     .catch(err => next(err));
// });

/** GET ALL STUDENTS: async/await */
// router.get('/', async (req, res, next) => {
//   try {
//     let students = await Student.findAll({include: [Campus]});
//     res.status(200).json(students);
//   } catch(err) {
//     next(err);
//   }
// });

/** GET ALL STUDENTS: express-async-handler (ash) */
// automatically catches any error and sends to middleware
// same as using try/catch and calling next(error)
router.get('/', ash(async(req, res) => {
  let students = await Student.findAll({include: [Campus]});
  res.status(200).json(students);
}));

/** GET STUDENT BY ID */
router.get('/:id', ash(async(req, res) => {
  let student = await Student.findByPk(req.params.id, {include: [Campus]});
  res.status(200).json(student);
}));

/** ADD NEW STUDENT */
router.post('/', function(req, res, next) {
  // Set options for find or create
  let options = {
    where: { email: req.body.email }, // email should be a student's unique identifier
    default: req.body // if no student with that email was found, create a student with the req.body
  };
  Student.findOrCreate(options)
    .then(createdStudent => res.status(200).json(createdStudent))
    .catch(err => next(err));
});

/** DELETE STUDENT */
router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a student!"))
    .catch(err => next(err));
});

/******************* EDIT *********************/

router.put('/:id', ash(async(req, res) => {
  await Student.update(req.body,
        { where: {id: req.params.id} }
  );
  let student = await Student.findByPk(req.params.id);
  res.status(201).json(student);
}));

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;