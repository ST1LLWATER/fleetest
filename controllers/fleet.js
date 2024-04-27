const { prisma } = require('../config/prisma');
const cloudinary = require('../middleware/cloudinary');

exports.createFleet = async (req, res) => {
  try {
    const result = await prisma.fleet.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        base_location: req.body.base_location,
        openings: parseInt(req.body.openings),
      },
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};

exports.getFleet = async (req, res) => {
  try {
    const result = await prisma.fleet.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        Members: true,
        Deployments: {
          select: {
            location: true,
            start_date: true,
            end_date: true,
            objective: true,
          },
        },
        FleetTrackings: {
          orderBy: {
            timestamp: 'desc',
          },
          select: {
            timestamp: true,
            latitude: true,
            longitude: true,
          },
        },
        Announcements: true,
      },
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};

exports.getFleets = async (req, res) => {
  try {
    const result = await prisma.fleet.findMany({
      include: {
        _count: {
          select: { Members: true },
        },
        Deployments: true,
      },
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};

exports.deleteFleet = async (req, res) => {
  try {
    const result = await prisma.fleet.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json({
      message: 'Fleet deleted',
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};
