const express = require('express');
const router = express.Router();
const deploymentController = require('../controllers/deployment');

router.post('/create/:id', deploymentController.createDeployment);
router.get('/all', deploymentController.getDeployments);
router.delete('/delete/:id', deploymentController.deleteDeployment);

module.exports = router;
