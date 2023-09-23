const { User, JobPosting, JobApplication, Review, Category, EducationLevel } = require("../models");

const { NUM_JOB_POSTINGS_PER_PAGE } = require('../config/pagination');

class Controller {

  static async getJobPostings(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async addJobPosting(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async updateJobPostingDetails(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async updateJobPostingStatus(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async applyToJob(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async processJobApplication(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

}

module.exports = Controller;
