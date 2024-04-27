const { prisma } = require('../config/prisma');

exports.getMember = async (req, res) => {
  try {
    const result = await prisma.member.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        Fleet: {
          include: {
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
        },
      },
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const result = await prisma.member.findMany({
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

exports.editMember = async (req, res) => {
  try {
    const result = await prisma.member.update({
      where: {
        id: req.session.user.id,
      },
      data: req.body,
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const result = await prisma.member.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json({
      success: true,
      message: 'Member deleted',
    });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Something went wrong' });
  }
};
