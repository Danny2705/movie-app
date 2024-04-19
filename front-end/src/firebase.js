import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAdcF7L7pBJQwaziEQLtn2SSH3IByfNnqA",
  authDomain: "anime-cave.firebaseapp.com",
  projectId: "anime-cave",
  storageBucket: "anime-cave.appspot.com",
  messagingSenderId: "582459567307",
  appId: "1:582459567307:web:0ab58c54708cb91c4aff4e",
};

export const app = initializeApp(firebaseConfig);
