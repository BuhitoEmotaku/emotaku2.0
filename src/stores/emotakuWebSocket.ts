import { defineStore } from 'pinia';
export const useEmotakuWebSocket = defineStore('emotakuWebSocket', () => {

  const receiveAllMessages = (callback: (message: any) => void) => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket('wss://emotaku.ddns.net/ws');
    const connect = () => {

      //ws://localhost:8080
      //ws://emotaku.ddns.net:8080
      ws.onopen = () => {
        console.log('WebSocket connected');
      };

      ws.onmessage = (event) => {
        const message = event.data;
        callback(message);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        // Intentar la reconexión después de un breve retraso
        setTimeout(() => {
          connect();
        }, 2000); // Reintento cada 2 segundos (puedes ajustar este valor)
      };

      ws.onerror = (error) => {
        console.error('WebSocket Emotaku: error');
      };
    };

    connect(); // Iniciar la conexión inicial
  }

  return {
    receiveAllMessages
  };
});
