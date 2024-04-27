const { prisma } = require('../config/prisma');
const validator = require('validator');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.member.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }
    req.session.user = {
      id: user.id,
      email: user.email,
      admin: user.admin,
    };

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fleet_id: user.fleet_id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, rank, admin } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.member.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        rank: rank,
        admin: admin ?? false,
      },
    });

    const fleet = await prisma.fleet.findFirst({
      orderBy: {
        openings: 'asc',
      },
      take: 1,
    });

    if (fleet) {
      const memberUpdate = prisma.member.update({
        where: {
          id: user.id,
        },
        data: {
          fleet_id: fleet.id,
        },
      });

      const fleetUpdate = prisma.fleet.update({
        where: {
          id: fleet.id,
        },
        data: {
          openings: fleet.openings - 1,
        },
      });

      await prisma.$transaction([memberUpdate, fleetUpdate]);

      user.fleet_id = fleet.id;
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      admin: user.admin,
    };
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fleet_id: user.fleet_id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
  });
  res.status(200).json({
    success: true,
    message: 'User has logged out',
  });
};
