import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

import emotakuServices from "@/services/emotakuServices";
import type ResponseData from "@/types/ResponseData";
import { useEmotakuWebSocket } from '@/stores/emotakuWebSocket'; // Importa tu store de Pinia


export const useApiStore = defineStore('apiEmotakuStore', () => {

  const EmotakuWebSocketStore = useEmotakuWebSocket();
  
  const allMessages = ref<any>([[]]);
  const checkerNewMessages = ref<boolean>(false);
  const numUsersConnected = ref<any>(0);

  const totalEntries = ref<any>(0);
  const totalEntriesStats = ref<any>(0);
  const uniqueEntries = ref<any>(0);
  const totalEntriesChecker = ref<any>(false);


  const getMessages = async () => { // Asegurarse de que id sea de tipo any o definir un tipo específico
    try {
      const response: ResponseData = await emotakuServices.getAllMessage();
      return response.data;
    } catch (error) {
      console.error('Error getMessages Emotaku Chat');
    }
  }

  const startWebWorkerEmotaku = async () => {
    createEntry();
    const response = await EmotakuWebSocketStore.receiveAllMessages((message: any) => {
      try {
        let parsedMessage = JSON.parse(message);
        if ('numUsersOnline' in parsedMessage) {
          numUsersConnected.value = parseInt(parsedMessage.numUsersOnline);

        } else if ('totalEntries' in parsedMessage) {
          console.log(parsedMessage.totalEntries);
          totalEntries.value = parseInt(parsedMessage.totalEntries);
          uniqueEntries.value = parseInt(parsedMessage.uniqueEntries);
          if(!totalEntriesChecker.value){
            totalEntriesStats.value = totalEntries.value;
            totalEntriesChecker.value = true;
          }
          
        }
        else {
          allMessages.value = parsedMessage;
          checkerNewMessages.value = !checkerNewMessages.value;

        }
      } catch (error) {
        console.error('Error al analizar el mensaje JSON:', error);
      }
    });
  };


  const sendMessage = async (text: any, displayName: string | null) => {
    const regExp = /((?:http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(?:\/\S*)?)/g;
    const textParts = text.split(regExp);
    const filteredTextParts = textParts.filter((part: string) => part.trim() !== '').map((part: string) => part.replace(/ +/g, ' '));
    const userName = displayName || `Anonimous-${totalEntriesStats.value}`;
    //const processedMessage = await processMessages(text); // Procesa el mensaje antes de guardarlo
    const timezone = new Date().getTime() / 1000;

    return {
      createdAt: timezone,
      message: await processMessage(filteredTextParts), // Utiliza el mensaje procesado
      userName,

    }
  }

  const createMessage = async (message: any) => { // Asegurarse de que id sea de tipo any o definir un tipo específico
    const dataMessage = await sendMessage(message, '');
    try {
      const response = await emotakuServices.createMessage(JSON.stringify(dataMessage));

    } catch (error) {
      console.error('Error creating Emotaku message');
    }
  };


  // Función para verificar si una URL es una imagen y devolver una etiqueta img si es válida
  async function verifyUrlImage(url: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        // La carga de la imagen tuvo éxito, por lo que es una imagen válida.
        resolve('img');
      };

      img.onerror = () => {
        // La carga de la imagen falló, por lo que no es una imagen válida.
        resolve('link');
      };
      img.src = url;
    });
  }

  async function processMessage(messageChecked: any): Promise<any> {

    const processedMessages = [];

    let containsImage = false;

    for (let message of messageChecked) {
      if (message.includes('http')) {
        // Si la palabra contiene "http", verificar si es una URL de imagen
        //const encodedURL = encodeURIComponent(message);
        const isImage = await verifyUrlImage(message);
        if (isImage.includes('img')) {
          if (messageChecked.length === 1) {
            // Agregar información adicional si solo hay una imagen
            processedMessages.push({
              type: 'img',
              src: message, // La URL de la imagen
              imageFeature: 'sticker',
            });
          } else {
            processedMessages.push({
              type: 'img',
              src: message, // La URL de la imagen
              imageFeature: 'nonSticker',
            });
          }
        } else {
          processedMessages.push({
            type: 'link',
            href: message, // La URL del enlace
          });
        }
      } else {
        // Si no es un enlace, simplemente agrega el texto
        processedMessages.push({
          type: 'text',
          content: message,
        });
      }
    }
    return processedMessages; // Reunir las palabras procesadas en una cadena
  }








  const updatePublished = async (status: boolean) => { // Especificar que status es de tipo boolean
    const data = {
      //createdAt: allMessages.value?.createdAt,
      //message: allMessages.value?.message,
      //userID: emotakuMessage.value?.userID,
    };

    try {

      //const response = await emotakuServices.update(emotakuMessage.value?.userID, data);
      //console.log(response.data);
      //emotakuMessage.value!.published = status;
      //allMessages.value = 'The status was updated successfully!';
    } catch (error) {
      console.error(error);
    }
  };


  const createEntry = async () => { // Asegurarse de que id sea de tipo any o definir un tipo específico

    try {
      let userId = localStorage.getItem('userID');
      if (!userId) {
        // Si no tiene un ID, genera uno nuevo y almacénalo en localStorage
        userId = Math.random().toString(36).substring(7);
        localStorage.setItem('userID', userId);
      }

      const timezone = new Date().getTime() / 1000;
      const userIdPatched = String(localStorage.getItem('userID')); // Obtén el ID del usuario autenticado
      const entryData = { timestamp: timezone, userName: userId };
      const response = await emotakuServices.createEntry(JSON.stringify(entryData));

    } catch (error) {
      console.error('Error creating Emotaku entry');
    }
  }

  return {
    allMessages,
    checkerNewMessages,
    numUsersConnected,
    totalEntries,
    totalEntriesStats,
    uniqueEntries,
    getMessages,
    updatePublished,
    startWebWorkerEmotaku,
    createMessage
  };
});
