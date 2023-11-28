import { defineStore } from 'pinia';
export const useEmotakuWebSocket = defineStore('emotakuWebSocket', () => {
  
  const ws = new WebSocket('wss://emotaku.ddns.net/ws');
  const receiveAllMessagesWebsocket = (callback: (message: any) => void) => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const connect = () => {

      //ws://localhost:8080
      //ws://emotaku.ddns.net:8080
      ws.onopen = () => {
        console.log('WebSocket connected');
        setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ping: 'ping'}));
          }
        }, 58000); // Send a ping every 30 seconds
      };

      ws.onmessage = (event) => {
        const message = event.data;
        callback(message);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setTimeout(() => {
          connect();
        }, 2000); // Reintento cada 2 segundos (ajusta este valor según tus necesidades)
        // Intentar la reconexión después de un breve retraso
      };

      ws.onerror = (error) => {
        console.error('WebSocket Emotaku: error');
      };
    };
    
    connect(); // Iniciar la conexión inicial
  }

  return {
    ws,
    receiveAllMessagesWebsocket
  };
});
