import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ref } from 'vue';
import type { Ref } from 'vue';

import { onUnmounted } from 'vue';
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where, Timestamp } from "firebase/firestore";
import { onValue, ref as rtdbRef, getDatabase, set as rtdbSet, onDisconnect, query as rtdbQuery, child as rtdbChild, get as rtdbGet, DataSnapshot } from 'firebase/database';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCeVFK3PHr6ZtrtJf4fERChvfv4sSSrWeQ",

  authDomain: "emotaku.firebaseapp.com",

  databaseURL: "https://emotaku-default-rtdb.europe-west1.firebasedatabase.app/",
  
  projectId: "emotaku",

  storageBucket: "emotaku.appspot.com",

  messagingSenderId: "118058285248",

  appId: "1:118058285248:web:a7cd94aabe7b06cc1b5525",

  measurementId: "G-ERK5EJMSS6"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Acceder a Firestore
const firestore = getFirestore(app);
const twentyFourHoursAgo = new Date();
twentyFourHoursAgo.setTime(twentyFourHoursAgo.getTime() - 24 * 60 * 60 * 1000); // Resta 24 horas en milisegundos

const messagesCollection = collection(firestore, 'messages');
const messagesQuery = query(
  messagesCollection,
  orderBy('createdAt', 'desc'), // Ordena por createdAt en orden descendente
  where('createdAt', '>', Timestamp.fromDate(twentyFourHoursAgo)) // Filtra por mensajes creados en las últimas 24 horas
);

export function useChat() {
  const messages: Ref<any> = ref([]);
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    messages.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });

  

  const sendMessage = (text: any, displayName: string | null) => {
    const userName = displayName || `Anonimous-${Math.floor(Math.random() * 1000)}`;

    addDoc(messagesCollection, {
      userName,
      message: text,
      createdAt: serverTimestamp(),
    });
  }

  onUnmounted(unsubscribe);



  // Inicializa Realtime Database
  const db = getDatabase(app);
  const onlineUsersRef = rtdbRef(db, 'onlineUsers');

  // Agregar usuario a la lista de usuarios en línea
  const addUserToOnlineList = () => {
    const userId = Math.random().toString(36).substring(7);
    rtdbSet(rtdbChild(onlineUsersRef, userId), true);

    // Cuando el usuario se desconecta, eliminarlo de la lista
    onDisconnect(rtdbChild(onlineUsersRef, userId)).remove();
  }

  const numOnlineUsers = ref(0);
  const getOnlineUsersCount = () => {
    const query = onlineUsersRef; // Usamos la referencia directamente
  
    const unsubscribe = onValue(query, (snapshot:any) => {
      numOnlineUsers.value = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
    });

  }
  return { messages, numOnlineUsers, sendMessage, addUserToOnlineList, getOnlineUsersCount };
}