const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/fleet');
const { checkDriver } = require('../middleware/checkRole');

router.post('/create', fleetController.createFleet);
router.get('/all', fleetController.getFleets);
router.get('/:id', fleetController.getFleet);
router.delete('/delete/:id', fleetController.deleteFleet);

module.exports = router;
