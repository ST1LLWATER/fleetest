const { prisma } = require('../config/prisma');
const cloudinary = require('../middleware/cloudinary');

exports.createDeployment = async (req, res) => {
  try {
    const result = await prisma.deployment.create({
      data: {
        fleet_id: parseInt(req.params.id),
        location: req.body.location,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        objective: req.body.objective,
      },
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};

exports.getDeployments = async (req, res) => {
  try {
    const result = await prisma.deployment.findMany({
      where: {
        id: req.params.id,
      },
      include: {
        Fleet: true,
      },
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};

exports.deleteDeployment = async (req, res) => {
  try {
    const result = await prisma.fleet.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};
