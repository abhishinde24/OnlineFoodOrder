/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';
import * as express from 'express';
import {addResturant, addItemToMenu, setLocationResturant, getResturantsNearMe} from "./View/Resturant"
import {userSignUp,userSignIn} from "./View/User"
const app = express();

app.get('/health', (req, res) => res.status(200).send('Healthy server!'));
app.post('/addResturant',[addResturant]);
app.post('/addItemToMenu',[addItemToMenu]);
app.post('/setLocationResturant',[setLocationResturant]);
app.post('/getResturantsNearMe',[getResturantsNearMe]);
app.post('/signUp',[userSignUp]);
app.post('/signIn',[userSignIn]);


exports.app = functions.https.onRequest(app);