import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getOnePatientEntry(id);
  console.log(id, patient);
  res.json(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send(e);
    }
  }
});

export default router;