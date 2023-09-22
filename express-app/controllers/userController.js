const { User, JobPosting, JobApplication, Review, Category, EducationLevel } = require("../models/model");
const { compare } = require('../helpers/password');
const { signToken } = require('../helpers/jwt');

class Controller {

  static async login(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async getUsers(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async getLoggedInUserDetails(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async getLoggedInUserReviews(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async getLoggedInUserJobApplications(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async getLoggedInUserJobPostings(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async editLoggedInUserDetails(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

  static async addReview(req, res, next) {
    try {

    } catch(err) {
      next(err);
    }
  }

}

module.exports = Controller;
