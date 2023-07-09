const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const firebaseConfig = {
  apiKey: "AIzaSyCsfc3hFBAxTMS2wjvZZawCxGGENH7hDiA",
  authDomain: "svelte-ba034.firebaseapp.com",
  projectId: "svelte-ba034",
  storageBucket: "svelte-ba034.appspot.com",
  messagingSenderId: "209456477896",
  appId: "1:209456477896:web:b99e2b415c341bd16197fd",
  measurementId: "G-VYMHJ39WEW",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
module.exports = { storage };
