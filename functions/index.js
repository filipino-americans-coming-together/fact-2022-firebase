const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('The FACT 2022 API Lives!');
});

// Routes
// const NotificationsRouter = require("./controllers/NotificationsRouter");
const UpdatesController = require('./controllers/UpdatesController');
const WorkshopsController = require('./controllers/WorkshopsController');

// app.use("/notifications", new NotificationsRouter(db).routes);
app.use('/updates', new UpdatesController(db).routes);
app.use('/workshops', new WorkshopsController().routes);

exports.app = functions.https.onRequest(app);
