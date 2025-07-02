import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCsEz0RL-xCPJuJajEUJD2ZY0R73xwsE1k",
  authDomain: "notes-app-f2764.firebaseapp.com",
  databaseURL: "https://notes-app-f2764-default-rtdb.firebaseio.com",
  projectId: "notes-app-f2764",
  storageBucket: "notes-app-f2764.firebasestorage.app",
  messagingSenderId: "143157961334",
  appId: "1:143157961334:web:9fe8719d2061cf55c4f557",
  measurementId: "G-0ZEKQEJWE5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);