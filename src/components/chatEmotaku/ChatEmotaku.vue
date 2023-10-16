<template>
  <div class="chatEmotakuStyler">
    <h1 class="titleChatEmotaku">CHAT EMOTAKU</h1>
    <button
      @click="sendNewMessage('Estoy hasta la pinga de física, quiero cagarme en peter la anguila. Cabrónnnn, deja de robar comida')">
      Click to send</button>
    <div class="messagesContainer">
      <div class="chatEmotaku" v-for="message in messages" :key="message.id">
        <span class="chatUser">&lt{{ message.userName }}></span>
        <div class="messageData">
          <span class="chatMessage">-> {{ message.message }}</span>
          <span class="chatTimeMessage">{{ message.createdAt ? time24Hours(message.createdAt.seconds) : '' }}</span>
        </div>
      </div>
    </div>

    <div class="khe" ref="bottom" />

  </div>
</template>
  
<script lang="ts">
import { defineComponent, nextTick, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useChat } from '@/assets/scripts/firebase';

interface Message {
  id: string;
  userName: string;
  text: string;
  // Agrega otras propiedades aquí si es necesario
}

export default defineComponent({
  name: 'ChatEmotaku',
  setup() {
    const { messages, sendMessage } = useChat();
    const message = ref('');
    const bottom: Ref<HTMLElement | null> = ref(null);

    const sendNewMessage = (text: string) => {
      sendMessage(text, 'RoverxD'); // Puedes pasar el nombre de usuario aquí
      console.log(messages.value);
    };


    const time24Hours = (timestamp: number) => {
      const fecha = new Date(timestamp * 1000); // Multiplica por 1000 para convertir a milisegundos
      const horas = fecha.getHours().toString().padStart(2, '0'); // Asegura que las horas tengan dos dígitos
      const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Asegura que los minutos tengan dos dígitos
      const segundos = fecha.getSeconds().toString().padStart(2, '0'); // Asegura que los segundos tengan dos dígitos
      return `${horas}:${minutos}:${segundos}`;
    }



    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: 'smooth' });
        })

      },
      {
        deep: true
      }
    )

    return { message, messages, sendNewMessage, time24Hours };
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatEmotakuStyler {
  border: 2px solid white;
  padding: 0 0 10px 0;
}

.titleChatEmotaku {
  padding: 20px 0 20px 0;
}

.chatEmotaku {
  text-align: left;
  margin: 5px 0 5px 0;
  background-color: #0f0f0f;
  border-radius: 5px;
  padding: 6px;
}

.messagesContainer {
  padding: 0 13px 0 13px;
}

.chatUser {
  color: green;
}

.chatMessage {
  word-break: break-word;
  padding: 5px 0 0 6px;
}

.messageData {
  display: flex;
  justify-content: space-between;
}

.chatTimeMessage {
  padding-right: 5px;
}

.khe {
  background-color: red;
}
</style>
  