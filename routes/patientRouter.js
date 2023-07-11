const express = require('express');

const { upload } = require('../middleware/imageUploader');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.post(
  '/patient', //
  // upload.single('file'),
  patientController.createPatient
);
// router.get('/patient/:patientId', patientController.getPatient);
// router.patch(
//   '/patient/:patientId',
//   upload.array('file'),
//   patientController.updatePatient
// );
// router.delete('/patient/:patientId', patientController.deletePatient);

module.exports = { router };
