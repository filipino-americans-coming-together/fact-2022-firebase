const express = require('express');

const UpdatesCollectionModel = require('../models/UpdatesCollectionModel');

/**
 * Controller for Updates Firestore collection
 */
class UpdatesController {
  /**
   * Constructor for UpdatesController
   * @param {admin.firestore.Firestore} db Firestore database
   */
  constructor(db) {
    // eslint-disable-next-line new-cap
    this.router = express.Router();
    this.updatesCollectionModel = new UpdatesCollectionModel(db);
    this.initRoutes();
  }

  /**
   * Initializes routes
   */
  initRoutes() {
    // GET /updates
    this.router.get('/', (req, res) => {
      res.status(200).send({
        message: '/updates endpoint is live',
      });
    });

    // GET /updates/all
    this.router.get('/all', (req, res) => {
      this.updatesCollectionModel
          .getAllUpdates()
          .then((_res) => {
            res.status(200).send({
              message: 'Successfully got all updates!',
              data: {
                updates: _res,
              },
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: 'Unable to get all updates.',
              error,
            });
          });
    });

    // POST /updates
    this.router.post('/', (req, res) => {
      const update = req.body.update;
      //  TODO: add type validation!
      if (update) {
        this.updatesCollectionModel
            .createUpdate(update)
            .then((_res) => {
              res.status(201).send({
                message: 'Update created!',
                data: {
                  id: _res,
                },
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: 'Unable to create object.',
                error,
              });
            });
      } else {
        res.status(400).send({
          message: 'Provide update object in request body.',
        });
      }
    });
  }

  /**
   * Returns router
   */
  get routes() {
    return this.router;
  }
}

module.exports = UpdatesController;
