const express = require('express');

const WORKSHOPS = require('../constants/Workshops');

/**
 * Controller for Workshops routes
 */
class WorkshopsController {
  /**
   * Constructor for WorkshopsController
   */
  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  /**
   * Initialize routes for WorkshopsController
   */
  initRoutes() {
    // GET /workshops
    this.router.get('/', (req, res) => {
      res.status(200).send({
        message: '/workshops endpoint is live',
      });
    });

    // GET /workshops/all
    this.router.get('/all', (req, res) => {
      res.status(200).send({
        message: 'Successfully got all workshops!',
        data: {
          workshops: WORKSHOPS,
        },
      });
    });
  }

  /**
   * Returns router
   */
  get routes() {
    return this.router;
  }
}

module.exports = WorkshopsController;
