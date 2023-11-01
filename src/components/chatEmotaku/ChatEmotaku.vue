<template>
  <h1 class="titleChatEmotaku">CHAT EMOTAKU</h1>
  <div class="contentNumActiveUsers"><span class="activeUsersText">Usuarios activos</span>:<span
      class="numActiveUsers">&nbsp;{{ ApiStoreController.numUsersConnected }}</span></div>
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
    <div id="khe" ref="topChat" />
    <div class="messagesContainer">
      <div class="chatEmotakuUnique" v-for="(messageObj, index) in messages" :key="index">
        <div class="topMesageContainer">
          <span class="chatUser">&lt;{{ messageObj.userName }}&gt;</span>
          <span class="chatTimeMessage">{{ formatDateHour(messageObj.createdAt) }}</span>
        </div>
        <div class="messageData">
          <div>
            <span v-for="(message, messageIndex) in messageObj.message" :key="messageIndex">
              <!-- Verifica el tipo de mensaje -->
              <span v-if="message.type === 'text'">{{ message.content }}</span>
              <img :class="message.imageFeature" v-else-if="message.type === 'img'" :src="message.src"
                :alt="message.imageFeature">
              <a v-else-if="message.type === 'link'" :href="message.href" target="_blank" rel="norrefer">{{ message.href
              }}</a>
            </span>
          </div>


        </div>

      </div>
    </div>

  </div>
</template>
  
<script lang="ts">
import { defineComponent, nextTick, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import audioNewMessage from '@/assets/music/newMessageSound.mp3';
import { useCounterStore } from '@/stores/userOutOfPage';
import { useApiStore } from '@/stores/apiData';


export default defineComponent({
  name: 'ChatEmotaku', 
  setup() {


    const ApiStoreController = useApiStore();
    const messages = ref<any>('');


    //SEND MESSAGE METHOD
    const messageCreated = ref('');
    const sendNewMessage = (text: string) => {
      scrollTopChat();
      let textTrimed = text.trim();
      if (textTrimed != '') {
        messageCreated.value = '';
        ApiStoreController.createMessage(textTrimed); // Puedes pasar el nombre de usuario aquí

      }
    };

    //CONVERTER TIME TO 24H
    const formatDateHour = (timestampSeconds: string) => {
      const milliseconds = parseInt(timestampSeconds) * 1000; // Convertir segundos a milisegundos
      const date = new Date(milliseconds);

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses en JavaScript comienzan en 0 (enero).
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    };



    const scrollTopChat = () =>{
      nextTick(() => {
            topChat.value?.scrollIntoView({ behavior: 'smooth' });
      });
    }


    //CHECK USER DISCONNECT FAKE ARREGLAR CON VISIBILITY EN VEZ DE TIMEOUT
    const cofigVariablesWebStore = useCounterStore();

    //ON MOUNTED //ACTIVATE AUDIO MESSAGE IF OUT_PAGE AND NEW MESSAGE
    const audioMessage = new Audio(audioNewMessage) as HTMLAudioElement;
    audioMessage.volume = 0.03;
    const checkerNewMessages = ref(false);
    onMounted(async () => {
      //iniciarWebsocket
      await ApiStoreController.startWebWorkerEmotaku();
      //Recibir primeros mensajes
      messages.value = await ApiStoreController.getMessages();
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
    const topChat= ref<any>(null);
    let contChat = 0
    watch(
      () => ApiStoreController.checkerNewMessages, // Propiedad a observar en tu store
      () => {
          messages.value = ApiStoreController.allMessages;
          contChat = contChat++;
          if(contChat > 1)scrollTopChat();
          
        
      }
    );


    return { topChat, messageCreated, messages, ApiStoreController, sendNewMessage, formatDateHour, scrollTopChat };
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

.chatEmotakuUnique {
  text-align: left;
  margin: 5px 0 5px 0;
  background-color: #0f0f0f;
  border-radius: 5px;
  padding: 6px 6px 14px 6px;
}

.messagesContainer {
  padding: 0 13px 0 13px;
}

.chatUser {
  color: green;
}

.topMesageContainer {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 3px;
}

.chatTimeMessage {
  padding-right: 5px;

}

.messageData {
  width: 80%;
  padding: 2px 0 0 20px;
  word-break: break-all;
}

.sticker {
  width: 190px;
  height: auto;
  border: 2px solid rgb(197, 0, 246);
  border-radius: 7px;
}

.nonSticker {
  width: 20px;

}

.khe {
  background-color: red;
}

@media (max-width: 650px) {
  .topMesageContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .chatUser {
    font-size: 20px;

  }

  .messageData {
    justify-content: center;
    display: flex;
    margin: 0 auto;
    padding: 0;
    text-align: center;
  }
}
</style>
  