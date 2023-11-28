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

  const buhitoOnline = ref<any>();

  const allMusic = ref<any>(false);
  const songSelected = ref<any>(false);

  const userNameDNI = ref<any>();


  const wsEmotaku = ref<any>();

  const getMessages = async () => { // Asegurarse de que id sea de tipo any o definir un tipo específico
    try {
      const response: ResponseData = await emotakuServices.getAllMessage();
      checkerNewMessages.value = !checkerNewMessages.value;
      return response.data;
    } catch (error) {
      console.error('Error getMessages Emotaku Chat');
    }
  }

  const getMusic = async () => { // Asegurarse de que id sea de tipo any o definir un tipo específico
    try {
      const response: ResponseData = await emotakuServices.getAllmusic();
      allMusic.value = response.data;
      return response.data;
    } catch (error) {
      console.error('Error getMessages Emotaku Chat');
    }
  }

  const requestSong = (folder: any, subFolder: any, song: any) => { // Asegurarse de que id sea de tipo any o definir un tipo específico
    try {
      songSelected.value = `https://emotaku.ddns.net/apiEmotaku/requestSong/${folder}/${subFolder}/${song}`;
      return songSelected.value;
    } catch (error) {
      console.error('Error getMessages Emotaku Chat');
    }
  }

  const commandsEmotaku = async (fullCommand: string) => {
    try {
      // Definir un array de comandos permitidos
      const allowedCommands = ['/admin', '/check', '/good']; // Agrega más comandos según sea necesario

      // Dividir la cadena en palabras para obtener el comando y el código
      const words = fullCommand.trim().split(' ');

      // Obtener el primer elemento como el comando
      const command = words[0];

      // Obtener el segundo elemento como el código
      const code = words[1];

      // Verificar si el comando proporcionado está en la lista de comandos permitidos
      const isValidCommand = allowedCommands.some(validCommand => command.startsWith(validCommand));

      if (isValidCommand && words.length == 2) {
        // El comando es válido, procede a enviar el mensaje
        const commandCode = {
          command: command,
          code: code
        };
        await wsEmotaku.value.send(JSON.stringify(commandCode));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error en commandsEmotaku:', error);
    }
  };

  const startWebWorkerEmotaku = async () => {
    createEntry();
    const response = await EmotakuWebSocketStore.receiveAllMessagesWebsocket((message: any) => {
      wsEmotaku.value = EmotakuWebSocketStore.ws;

      try {
        let parsedMessage = JSON.parse(message);

        if ('numUsersOnline' in parsedMessage) {
          numUsersConnected.value = parseInt(parsedMessage.numUsersOnline);
        }

        else if ('buhitoOnline' in parsedMessage) {
          buhitoOnline.value = parsedMessage.buhitoOnline;
        }

        else if ('totalEntries' in parsedMessage) {
          totalEntries.value = parseInt(parsedMessage.totalEntries);
          uniqueEntries.value = parseInt(parsedMessage.uniqueEntries);
          if (!totalEntriesChecker.value) {
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


  const sendMessage = async (text: any) => {
    if (await commandsEmotaku(text)) return false;
    const regExp = /((?:http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(?:\/\S*)?)/g;
    const textParts = text.split(regExp);
    const filteredTextParts = textParts.filter((part: string) => part.trim() !== '').map((part: string) => part.replace(/ +/g, ' '));
    const userName = (userNameDNI.value && userNameDNI.value !== '')
      ? userNameDNI.value
      : '';
    //const processedMessage = await processMessages(text); // Procesa el mensaje antes de guardarlo
    const timezone = new Date().getTime() / 1000;

    return {
      createdAt: timezone,
      message: await processMessage(filteredTextParts), // Utiliza el mensaje procesado
      userName,

    }
  }

  const createMessage = async (message: any) => { // Asegurarse de que id sea de tipo any o definir un tipo específico
    const dataMessage = await sendMessage(message);
    try {
      if (!dataMessage) return '';
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
    wsEmotaku,
    buhitoOnline,
    allMessages,
    checkerNewMessages,
    numUsersConnected,
    totalEntries,
    totalEntriesStats,
    uniqueEntries,
    allMusic,
    songSelected,
    userNameDNI,
    getMessages,
    updatePublished,
    startWebWorkerEmotaku,
    createMessage,
    getMusic,
    requestSong
  };
});
