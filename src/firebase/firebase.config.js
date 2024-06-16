import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBWmhewNwzBabEIIhHxpPGzWIBjSZ0G7LI",
  authDomain: "chemnitz-map-app.firebaseapp.com",
  projectId: "chemnitz-map-app",
  storageBucket: "chemnitz-map-app.appspot.com",
  messagingSenderId: "630539812105",
  appId: "1:630539812105:web:dea8b8f148b1ab03ade7d8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
