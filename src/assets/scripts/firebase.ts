import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import type { Ref } from 'vue';
import { onUnmounted, onMounted, ref } from 'vue';

import {
  getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where,
  Timestamp, count, limit, getDocs, doc, getDoc, setDoc
} from "firebase/firestore";

import {
  onValue, ref as rtdbRef, getDatabase, set as rtdbSet, onDisconnect, query as rtdbQuery,
  child as rtdbChild, get as rtdbGet, DataSnapshot
} from 'firebase/database';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

/*
const messagesQuery = query(
  messagesCollection,
  orderBy('createdAt', 'desc'), // Ordena por createdAt en orden descendente
  where('createdAt', '>', Timestamp.fromDate(twentyFourHoursAgo)) // Filtra por mensajes creados en las últimas 24 horas
);
*/


export function useChat() {

  const MESSAGES_COLLECTION = 'messages';
  const messagesCollection = collection(firestore, MESSAGES_COLLECTION);

  const messagesQuery = query(
    messagesCollection,
    orderBy('createdAt', 'desc'), // Ordena por createdAt en orden descendente
    limit(100) // Limita el resultado a los últimos 100 mensajes
  );


  const messages: Ref<any> = ref([]);
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    messages.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });

  const onlyImage = ref(false);
  const sendMessage = async (text: any, displayName: string | null) => {
    const userName = displayName || `Anonimous-${Math.floor(Math.random() * 1000)}`;
    const processedMessage = await processMessages(text); // Procesa el mensaje antes de guardarlo
    await addDoc(messagesCollection, {
      userName,
      onlyImage: onlyImage.value,
      message: htmlPurify(processedMessage), // Utiliza el mensaje procesado
      createdAt: serverTimestamp(),
      
    });
  }

  const htmlPurify = (processedMessage:string) => {
    return processedMessage.replace(/<(?!\/?(img|a)( |>))/g, "&lt;").replace(/(?<=&lt;[^>]+)>/g, "&gt;");
  };
  
  // Función para verificar si una URL es una imagen y devolver una etiqueta img si es válida
  async function verifyUrlImage(url: string, widthImg: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // La carga de la imagen tuvo éxito, por lo que es una imagen válida.
      const cleanURL = url; // Codifica la URL de manera segura
      resolve(`<img src="${cleanURL}" alt="sticker" style="width: ${widthImg};">`);
    };
    img.onerror = () => {
      // La carga de la imagen falló, por lo que no es una imagen válida.
      const cleanURL = url; // Codifica la URL de manera segura
      resolve(`<a href="${cleanURL}" target="_blank" rel="noreferrer">${cleanURL}</a>`);
    };
    img.src = url;
  });
}

  async function processMessages(messages: string): Promise<string> {
    const messageArray = messages.split(' '); // Dividir el texto en palabras
  
    const processedMessages = [];
    let widthImg = '20px';
    let containsImage = false;
    if(messageArray.length == 1) widthImg = '190px';
    for (let message of messageArray) {
      if (message.includes('http')) {
        // Si la palabra contiene "http", verificar si es una URL de imagen
        //const encodedURL = encodeURIComponent(message);
        const isImage = await verifyUrlImage(message, widthImg);
        if (isImage.includes('<img')) {
          // Si es una imagen válida, agregamos la etiqueta img al resultado
          processedMessages.push(isImage);
          if(messageArray.length == 1) containsImage = true;
          continue; // Saltar al siguiente mensaje
        } else {
          message = isImage;
        }
      }
      // Si no es una imagen válida o no contiene "http", agregamos el mensaje original
      processedMessages.push(message);
    }
  
    if (containsImage) {
      onlyImage.value = true;
    }
  
    return processedMessages.join(' '); // Reunir las palabras procesadas en una cadena
  }












  
  // Inicializa Realtime Database
  const db = getDatabase(app);
  const onlineUsersRef = rtdbRef(db, 'onlineUsers');

  let userRegistered = false;












  const addUserToOnlineList = () => {
    const userKey:any = localStorage.getItem('userID'); // Un identificador único para este usuario

// Verifica si ya existe un contador de ventanas
const windowCount = localStorage.getItem('windowCount'); // Parsea el valor de localStorage a un número

if (localStorage.getItem('windowCount') == null) {
  console.log('MEEME2')
  // El usuario no está registrado en ninguna pestaña
  // Registra al usuario en Realtime Database
  rtdbSet(rtdbChild(onlineUsersRef, userKey), true);

  // Marca al usuario como registrado en el almacenamiento local
  localStorage.setItem('windowCount', '1');
  // Llamar a la función para incrementar el contador cuando se abre una nueva pestaña
}else {
  incrementWindowCount();
}

// Función para incrementar el contador y almacenarlo en el almacenamiento local
function incrementWindowCount() {
  const windowCount = Number(localStorage.getItem('windowCount'));
  console.log(windowCount);
  const updatedWindowCount = windowCount + 1;
  localStorage.setItem('windowCount', updatedWindowCount.toString());
}


// Escuchar cambios en el almacenamiento local desde otras pestañas
window.addEventListener('storage', (event) => {
  if (event.key === 'windowCount') {
    // El contador en el almacenamiento local ha cambiado
    const updatedCount = parseInt(event.newValue || '1');
    console.log("KHE");
    // Actualizar la UI o realizar acciones según sea necesario
    console.log('El contador se ha actualizado a', updatedCount);
  }
});


// Agrega un escuchador para detectar cuándo se cierra una pestaña
window.addEventListener('beforeunload', () => {
  // Disminuye el contador de ventanas
  const windowCount = localStorage.getItem('windowCount');
  let updatedWindowCount = Number(windowCount);
  if(windowCount != null){
    updatedWindowCount = Number(windowCount) - 1;
  console.log('MEEME');
  localStorage.setItem('windowCount', updatedWindowCount.toString());

  }
  
  // Comprueba si todas las pestañas están cerrando
  if (updatedWindowCount === 0) {
    // Todas las pestañas se están cerrando, por lo que el usuario se desconecta
    // Elimina al usuario de la lista de usuarios en línea
    onDisconnect(rtdbChild(onlineUsersRef, userKey)).remove();
    localStorage.removeItem('windowCount');

  }

});
  }

  const numOnlineUsers = ref(0);
  const getOnlineUsersCount = () => {
    const query = onlineUsersRef; // Usamos la referencia directamente

    onValue(query, (snapshot: any) => {
      numOnlineUsers.value = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
    });

  }

  onMounted(() => {
    addUserToOnlineList();
    getOnlineUsersCount();
  });

  onUnmounted(() => {
    unsubscribe();
  });


  return { messages, numOnlineUsers, sendMessage, addUserToOnlineList, getOnlineUsersCount };
}





//get stats web Emotaku
export function statsValues() {

  const totalEntries = ref<any>('?');
  const totalUniqueUsers = ref<any>('?');
  const userCreateIDCountHits = () => {

    // Verifica si el usuario ya se ha registrado en este navegador
    let userId = localStorage.getItem('userID');

    if (!userId) {
      // Si no tiene un ID, genera uno nuevo y almacénalo en localStorage
      userId = Math.random().toString(36).substring(7);
      localStorage.setItem('userID', userId);
    }

    const ENTRIES_COLLECTION = 'entries';
    const USERS_COLLECTION = 'users';

    const entriesCollection = collection(firestore, ENTRIES_COLLECTION);
    const usersCollection = collection(firestore, USERS_COLLECTION);

    async function addEntryToFirestore() {
      const userIdPatched = String(localStorage.getItem('userID')); // Obtén el ID del usuario autenticado
      const entryData = { timestamp: serverTimestamp(), userId };

      try {
        await addDoc(entriesCollection, entryData);

        const userDocRef = doc(usersCollection, userIdPatched);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          const querySnapshot = await getDocs(usersCollection);
          const newEntryCount = querySnapshot.size + 1;
          await setDoc(userDocRef, { entryCount: newEntryCount }, { merge: true });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    addEntryToFirestore();


    // Para calcular el número total de entradas y usuarios únicos
    getDocs(entriesCollection) // Obtener todos los documentos en la colección 'entries'
      .then((querySnapshot) => {
        totalEntries.value = querySnapshot.size;
        console.log(`Entradas totales: ${totalEntries.value}`);

        getDocs(usersCollection) // Obtener todos los documentos en la colección 'users'
          .then((userQuerySnapshot) => {
            totalUniqueUsers.value = userQuerySnapshot.size;
            console.log(`Usuarios únicos: ${totalUniqueUsers.value}`);
          })
          .catch((error) => {
            console.error('Error al obtener los documentos de usuarios:', error);
          });
      })
      .catch((error) => {
        console.error('Error al obtener los documentos de entradas:', error);
      });

  }

  userCreateIDCountHits();

  return {
    totalEntries, totalUniqueUsers
  }

}