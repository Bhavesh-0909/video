// lib/firebaseAdmin.js
import admin from 'firebase-admin';

const firebaseString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
console.log(firebaseString)
if(!firebaseString){
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not defined in environment variables");
}

const serviceAccount = JSON.parse(firebaseString);
console.log(serviceAccount)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
