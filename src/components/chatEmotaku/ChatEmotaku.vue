<template>
  <h1 class="titleChatEmotaku">CHAT EMOTAKU</h1>
  <div class="mainSendMessage">
    <div class="messageToSend">
      <label for="messageToSend">
        <input type="text" id="messageToSend" v-model="messageCreated"
          placeholder="Bienvenido al chat! -- Se respetuoso y amable <3 ^^*" autocomplete="off" maxlength="300" required>
      </label>
    </div>

    <button class="sendMessageButton" @click="sendNewMessage(messageCreated)">Enviar</button>
  </div>


  <div class="chatEmotakuStyler">
    <div class="messagesContainer">
      <div class="khe" ref="bottom" />
      <div class="chatEmotaku" v-for="message in messages" :key="message.id">
        <span class="chatUser">&lt{{ message.userName }}></span>
        <div class="messageData">
          <span class="chatMessage">-> {{ message.message }}</span>
          <span class="chatTimeMessage">{{ message.createdAt ? time24Hours(message.createdAt.seconds) : '' }}</span>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script lang="ts">
import { defineComponent, nextTick, ref, watch, onMounted, onBeforeUnmount } from 'vue';
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
    const messageCreated = ref('')
    const { messages, sendMessage } = useChat();
    const message = ref('');
    const bottom: Ref<HTMLElement | null> = ref(null);

    const sendNewMessage = (text: string) => {
      if (text != '') {
        sendMessage(text, ''); // Puedes pasar el nombre de usuario aquí
        messageCreated.value = '';
      }

    };

    const time24Hours = (timestamp: number) => {
      const fecha = new Date(timestamp * 1000); // Multiplica por 1000 para convertir a milisegundos
      const horas = fecha.getHours().toString().padStart(2, '0'); // Asegura que las horas tengan dos dígitos
      const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Asegura que los minutos tengan dos dígitos
      const segundos = fecha.getSeconds().toString().padStart(2, '0'); // Asegura que los segundos tengan dos dígitos
      return `${horas}:${minutos}:${segundos}`;
    }

    const checkerOnWeb = ref(true);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        checkerOnWeb.value = false;
        // La página está oculta, el usuario cambió de pestaña o aplicación
        // Puedes detener el sonido aquí o realizar cualquier otra acción.
      } else {
        checkerOnWeb.value = true;
        // La página está enfocada, el usuario volvió a ella
        // Puedes iniciar el sonido o realizar cualquier otra acción.
      }
    };

    onMounted(() => {
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Asegúrate de eliminar el evento cuando el componente se desmonta
      onBeforeUnmount(() => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      });
    });

    watch(
      messages,
      () => {
        if (checkerOnWeb.value != true)
          console.log('try');
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: 'smooth' });
        })

      },
      {
        deep: true
      }
    )

    return { message, messages, messageCreated, sendNewMessage, time24Hours };
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatEmotakuStyler {
  border: 2px solid white;
  padding: 0 0 10px 0;
  max-height: 410px;
  overflow: auto;
}

.titleChatEmotaku {
  padding: 20px 0 20px 0;
}

.mainSendMessage {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
  border: 2px solid white;
}

.messageToSend {
  flex-grow: 3;
  /* El input ocupa más espacio (2 veces más) */
  height: 100%;
  background-color: #000;
  color: #fff;
  border: 1px solid #383838;
  font-family: MS Gothic, monospace;
}

#messageToSend {
  width: 100%;
  background-color: black;
  color: white;
  height: 100%;
  padding-left: 10px;
  font-size: 18px;
}

.sendMessageButton {
  flex-grow: 0.5;
  /* El botón ocupa menos espacio (1 vez) */
  width: auto;
  /* Anchura automática para ajustarse al contenido */
  background-color: rgb(0, 0, 0);
  color: white;
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
}</style>
  