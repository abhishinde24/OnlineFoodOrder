import {admin} from "../config/firebase"
import {Response, NextFunction } from "express"
import { CustomerRequest } from "../Utils/Request";

// Middleware to validate Firebase ID token and attach user information to request object
async function validateFirebaseIdToken(req: CustomerRequest, res: Response, next: NextFunction) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    console.error('No Firebase ID token was found in the Authorization header.');
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken; // Attach user information to request object
    return next();
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    return res.status(403).json({ error: 'Unauthorized' });
  }
}

export {validateFirebaseIdToken}