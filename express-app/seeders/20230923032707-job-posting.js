'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rawSeedData = JSON.parse(fs.readFileSync('../data/job-postings.json'));
    const seedData = rawSeedData.map(el => {
      const createdAt = new Date();
      const updatedAt = new Date();
      return { ...el, createdAt, updatedAt }
    });
    await queryInterface.bulkInsert('JobPostings', seedData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JobPostings', null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    });
  }
};
