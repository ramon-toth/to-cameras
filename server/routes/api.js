import { Router } from 'express';
import { DataController } from '../controllers/dataController.js';
const router = Router();

const dataController = new DataController();

router.get('/update', (req, res) => {
  dataController.updateSpeed();
  dataController.updateRedlight();
  res.send('Updated');
});

router.get('/datasets/speed', (req, res) => {
  dataController.getSpeed().subscribe((speed) => res.json(speed));
});
router.get('/datasets/redlight', (req, res) => {
  dataController.getRedlight().subscribe((r) => res.json(r));
});

router.post('/log/location', (req, res) => {
  dataController
    .testLog(req.body)
    .then((r) => res.json({ success: true }))
    .catch((e) => res.json({ success: false }));
});

export default router;
