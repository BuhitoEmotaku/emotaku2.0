<template>
  <h1 class="titleChatEmotaku">CHAT EMOTAKU</h1>
  <div class="contentNumActiveUsers"><span class="activeUsersText">Usuarios activos</span>:<span
      class="numActiveUsers">&nbsp;{{ numOnlineUsers }}</span></div>
  <br>
  <div class="mainSendMessage">
    <div class="messageToSend">
      <label for="messageToSend">
        <input type="text" id="messageToSend" v-model="messageCreated" @keyup.enter="sendNewMessage(messageCreated)"
          placeholder="Bienvenido al chat! -- Se respetuoso y amable ✧✿◕‿◕✿ <3" autocomplete="off" maxlength="300"
          required>
      </label>
    </div>

    <button class="sendMessageButton" @click="sendNewMessage(messageCreated)">Enviar</button>
  </div>

  <div class="chatEmotakuStyler">
    <div class="messagesContainer">
      <div class="khe" ref="bottom" />
      <div class="chatEmotaku" v-for="message in messages" :key="message.id">
        <span class="chatUser">{{ message.userName }}></span>
        <div class="messageData">
          <span class="chatMessage"><b v-if="!message.onlyImage">▶</b> <span class="chatMessageContent" v-html="message.message"></span></span>
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
import audioNewMessage from '@/assets/music/newMessageSound.mp3';
import { useCounterStore } from '@/stores/userOutOfPage';
export default defineComponent({
  name: 'ChatEmotaku',
  setup() {

    const { messages, numOnlineUsers, sendMessage, addUserToOnlineList, getOnlineUsersCount } = useChat();


    //SEND MESSAGE METHOD
    const messageCreated = ref('');
    const sendNewMessage = (text: string) => {
      if (text != '') {
        sendMessage(text, ''); // Puedes pasar el nombre de usuario aquí
        messageCreated.value = '';
      }
    };

    //CONVERTER TIME TO 24H
    const time24Hours = (timestamp: number) => {
      const fecha = new Date(timestamp * 1000); // Multiplica por 1000 para convertir a milisegundos
      const horas = fecha.getHours().toString().padStart(2, '0'); // Asegura que las horas tengan dos dígitos
      const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Asegura que los minutos tengan dos dígitos
      const segundos = fecha.getSeconds().toString().padStart(2, '0'); // Asegura que los segundos tengan dos dígitos
      return `${horas}:${minutos}:${segundos}`;
    }


    //CHECK USER DISCONNECT FAKE ARREGLAR CON VISIBILITY EN VEZ DE TIMEOUT
    const cofigVariablesWebStore = useCounterStore();


    //ON MOUNTED //ACTIVATE AUDIO MESSAGE IF OUT_PAGE AND NEW MESSAGE
    const audioMessage = new Audio(audioNewMessage) as HTMLAudioElement;
    audioMessage.volume = 0.03;
    const checkerNewMessages = ref(false);
    onMounted(() => {
      //document.addEventListener("visibilitychange", reconectUserWhenIsOnPage);

      setInterval(() => {
        if (cofigVariablesWebStore.checkerOnWeb && checkerNewMessages.value && cofigVariablesWebStore.clickedConfig) {
          audioMessage.play();
          checkerNewMessages.value = false;
        } else {
          checkerNewMessages.value = false;
        }
      }, 300000);

      
    });


    //BEFORE MOUNTED
    onBeforeUnmount(() => {
      
    });


    //WATCH
    const bottom: Ref<HTMLElement | null> = ref(null);
    watch(
      messages,
      () => {
        checkerNewMessages.value = true;
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: 'smooth' });
        })

      }, { deep: true }
    );
/*
    watch(
      () => cofigVariablesWebStore.checkerOnWeb, // Devuelve la propiedad que deseas observar
      (newValue) => {
        if (newValue === false) {
          // La variable `checkerOnWeb` ha cambiado de true a false
          // Ejecuta el código necesario aquí
          addUserToOnlineList();
          getOnlineUsersCount();
          console.log(numOnlineUsers.value);
        }
      }
    );
    */
    return { messages, messageCreated, numOnlineUsers, sendNewMessage, time24Hours };
  }

});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatEmotakuStyler {
  border: 2px solid white;
  padding: 10px 0 10px 0;
  max-height: 410px;
  overflow: auto;
}

.titleChatEmotaku {
  padding: 10px 0 25px 0;
}

.contentNumActiveUsers {
  display: flex;
  justify-content: center;
  align-items: center;
}

.activeUsersText {

  color: green;
}

.numActiveUsers {
  color: red;
  font-size: 20px;
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
  cursor: pointer;
}

.sendMessageButton:hover {
  background-color: rgb(32, 32, 32);

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

.chatMessage, .chatMessageContent {
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
  