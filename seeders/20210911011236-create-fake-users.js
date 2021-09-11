'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'johndoe@gemail.com',
      uuid: '0ae01cdf-1603-4634-9f93-ae125d3cf67c',
      role: "admin",
      createdAt: "2021-09-10T22:19:05.966Z",
      updatedAt: "2021-09-11T01:09:46.701Z",
      // isBetaMember: false
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
