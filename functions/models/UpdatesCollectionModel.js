const CollectionNames = require("../constants/CollectionNames");

/**
 * @typedef {Object} Update
 * @property {String} title
 * @property {String} message
 * @property {String} author
 */

/**
 * Model for the Updates collection
 */
class UpdatesCollectionModel {
  /**
   * Constructs new UpdatesCollectionModel
   * @param {admin.firestore.Firestore} db Firestore database
   */
  constructor(db) {
    this.UpdatesCollection = db.collection(CollectionNames.UPDATES);
  }

  /**
   * Returns all updates stored in Firestore
   * @return {Promise} updates stored in Firebase
   */
  getAllUpdates() {
    return new Promise((resolve, reject) => {
      this.UpdatesCollection.get()
          .then((snapshot) => {
            if (snapshot.empty) {
              resolve([]);
            }

            const updates = [];
            snapshot.forEach((doc) => {
              updates.push(doc.data());
            });
            resolve(updates);
          })
          .catch((error) => reject(new Error(error)));
    });
  }

  /**
   * Creates new update in Firestore
   * @param {Update} update
   * @return {Promise} ID of the new update
   */
  createUpdate(update) {
    return new Promise((resolve, reject) => {
      this.UpdatesCollection.add({
        title: update.title,
        message: update.message,
        author: update.author,
        timestamp: Date.now(),
      })
          .then((ref) => resolve(ref.id))
          .catch((error) => reject(new Error(error)));
    });
  }
}

module.exports = UpdatesCollectionModel;
