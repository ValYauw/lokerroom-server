const { JobPosting } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id: jobPostingId } = req.params;
    if (isNaN(jobPostingId)) throw { name: 'NotFoundError' };
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!jobPosting) throw { name: 'NotFoundError' };
    if (req.user.id !== jobPosting.AuthorId) throw { name: 'Forbidden' };
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = authorization;