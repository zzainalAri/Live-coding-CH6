const { Car, User } = require("../models");
const { Op } = require("sequelize");

const getAllCars = async (req, res) => {
  try {
    const {
      name,
      type,
      minPrice,
      maxPrice,
      available,
      createdBy,
      sortBy = "createdAt",
      order = "DESC",
      page = 1,
      limit = 10,
      creatorName,
    } = req.query;

    const whereConditions = {};

    if (name) {
      whereConditions.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (type) {
      whereConditions.type = {
        [Op.iLike]: `%${type}%`,
      };
    }

    if (minPrice) {
      whereConditions.price = {
        ...whereConditions.price,
        [Op.gte]: minPrice,
      };
    }

    if (maxPrice) {
      whereConditions.price = {
        ...whereConditions.price,
        [Op.lte]: maxPrice,
      };
    }

    if (available !== undefined) {
      whereConditions.available = available === "true";
    }

    if (createdBy) {
      whereConditions.createdBy = createdBy;
    }

    const includeConditions = [
      {
        model: User,
        as: "creator",
        attributes: ["id", "name", "email"],
        where: creatorName
          ? {
              name: {
                [Op.iLike]: `%${creatorName}%`,
              },
            }
          : undefined,
      },
    ];

    const offset = (page - 1) * limit;

    const { count, rows: cars } = await Car.findAndCountAll({
      where: whereConditions,
      include: includeConditions,
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "Success",
      message: "Cars retrieved successfully",
      isSuccess: true,
      data: {
        cars,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
        {
          model: User,
          as: "updater",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!car) {
      return res.status(404).json({
        status: "Failed",
        message: "Car not found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Car retrieved successfully",
      isSuccess: true,
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const createCar = async (req, res) => {
  try {
    const { name, type, price, available, image } = req.body;

    const car = await Car.create({
      name,
      type,
      price,
      available,
      image,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });

    const carWithCreator = await Car.findByPk(car.id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(201).json({
      status: "Success",
      message: "Car created successfully",
      isSuccess: true,
      data: carWithCreator,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, price, available, image } = req.body;

    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({
        status: "Failed",
        message: "Car not found",
        isSuccess: false,
        data: null,
      });
    }

    await car.update({
      name,
      type,
      price,
      available,
      image,
      updatedBy: req.user.id,
    });

    const updatedCar = await Car.findByPk(id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
        {
          model: User,
          as: "updater",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json({
      status: "Success",
      message: "Car updated successfully",
      isSuccess: true,
      data: updatedCar,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({
        status: "Failed",
        message: "Car not found",
        isSuccess: false,
        data: null,
      });
    }

    await car.update({ deletedBy: req.user.id });
    await car.destroy();

    res.status(200).json({
      status: "Success",
      message: "Car deleted successfully",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
