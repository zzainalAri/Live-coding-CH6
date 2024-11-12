"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("superadmin123", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "superadmin@binar.com",
          password: hashedPassword,
          name: "Super Admin",
          role: "superadmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", { role: "superadmin" }, {});
  },
};
