<template>
  <h1 class="titleChatEmotaku">CHAT EMOTAKU</h1>
  <div class="contentNumActiveUsers"><span class="activeUsersText">Usuarios activos</span>:&nbsp;<span
      class="numActiveUsers">{{ ApiStoreController.numUsersConnected }}</span><span class="numActiveUsersInfo">1 Usuario
      por IP! </span>
  </div>
  <br>
  <div class="mainSendMessage">
    <div class="messageToSend">
      <label for="messageToSend">
        <input type="text" id="messageToSend" v-model="messageCreated" @keyup.enter="sendNewMessage(messageCreated)"
          placeholder="Bienvenido al chat! -- Se respetuoso y amable ✧✿◕‿◕✿ <3 (max 400lts)" autocomplete="off"
          maxlength="400" required>
      </label>
    </div>

    <button class="sendMessageButton" @click="sendNewMessage(messageCreated)">Enviar</button>
  </div>
  <div class="chatEmotakuStyler" id="chatScrollController">
    <div class="topChatReference" ref="topChat" />
    <div class="messagesContainer">
      <div class="chatEmotakuUnique" v-for="(messageObj, index) in messages" :key="messageObj.id"
        :class="lastMessageEffect(index) ? 'lastMessage' : null">
        <div class="topMesageContainer">
          <span :class="['chatUser', { 'userAdmin': messageObj.admin }]">&lt;{{ messageObj.userName }}&gt;</span>
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
import { useUserConfig } from '@/stores/userConfigStates';
import { useApiStore } from '@/stores/apiData';


export default defineComponent({
  name: 'ChatEmotaku',
  setup() {

    const audioMessage = new Audio(audioNewMessage) as HTMLAudioElement;
    audioMessage.volume = 0.019;

    const ApiStoreController = useApiStore();
    const messages = ref<any>([]);
    let messageCheck = false;

    //SEND MESSAGE METHOD
    const messageCreated = ref('');
    const sendNewMessage = (text: string) => {
      let textTrimed = text.trim();
      if (textTrimed != '') {
        messageCreated.value = '';
        ApiStoreController.createMessage(textTrimed); // Puedes pasar el nombre de usuario aquí
        messageCheck = true;
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






    //CHECK USER DISCONNECT FAKE ARREGLAR CON VISIBILITY EN VEZ DE TIMEOUT
    const cofigVariablesWebStore = useUserConfig();
    //ON MOUNTED //ACTIVATE AUDIO MESSAGE IF OUT_PAGE AND NEW MESSAGE

    onMounted(async () => {
      //iniciarWebsocket
      await ApiStoreController.startWebWorkerEmotaku();

      //Recibir primeros mensajes
      messages.value = await ApiStoreController.getMessages();
      //document.addEventListener("visibilitychange", reconectUserWhenIsOnPage);
    });


    //BEFORE MOUNTED
    onBeforeUnmount(() => {

    });



    const scrollToChat = () => {
      nextTick(() => {
        topChat.value?.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const scrollTopChat = () => {
      const scrollerChat = document.getElementById('chatScrollController');
      nextTick(() => {
        if (scrollerChat != null) {
          scrollerChat.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    };

    const lastMessageEffect = (index: any) => {
      return index === 0;
    }

    let checkFirstTime = 0;
    //WATCH
    const topChat = ref<any>(null);
    const botMessage = [{
      createdAt: "1699908262.734",
      message: {
        content: "Bienvenido!",
        type: "text"
      },
      userName: "Anonimous-1484"
    }];


    watch(
      () => ApiStoreController.checkerNewMessages, // Propiedad a observar en tu store
      () => {
        if (checkFirstTime == 0) {
          //messages.value = [botMessage, ...messages.value]; //MAKE INITIAL BOT MESSAGE
          checkFirstTime = 1; // Set to a non-zero value to indicate that it's not the first time anymore
        } else {
          if (messageCheck == true) {
            scrollToChat();
            scrollTopChat();
            messageCheck = false;
          }

          const scrollerChat = document.getElementById('chatScrollController');
          if (scrollerChat != null) {
            if (scrollerChat.scrollTop == 0) {
              scrollTopChat();
            }
          }
          messages.value = [ApiStoreController.allMessages, ...messages.value];

          if (cofigVariablesWebStore.checkerOnWeb && cofigVariablesWebStore.clickedConfig && !cofigVariablesWebStore.checkMuteChat) {
            audioMessage.play();
          }
        }

      }
    );

    addEventListener('visibilitychange', cofigVariablesWebStore.handleVisibilityChange);

    return { topChat, messageCreated, messages, ApiStoreController, sendNewMessage, formatDateHour, scrollTopChat, lastMessageEffect };
  }

});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatEmotakuStyler {
  border: 2px solid white;
  background-color: #000;
  border-radius: 10px;
  max-height: 410px;
  overflow: auto;
  padding: 10px 0 10px 0;
}

.titleChatEmotaku {
  padding: 10px 0 25px 0;
}

.contentNumActiveUsers {
  align-items: center;
  display: flex;
  justify-content: center;
}

.activeUsersText {
  color: green;
}

.numActiveUsers {
  color: red;
  cursor: pointer;
  font-size: 20px;
}

.numActiveUsersInfo {
  background-color: black;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  display: none;
  height: 50px;
  margin-right: 35px;
  position: absolute;
  width: 210px;
  z-index: 100;
}

.numActiveUsers:hover+.numActiveUsersInfo {
  align-items: center;
  color: green;
  display: flex;
  justify-content: center;
}

.mainSendMessage {
  border: 2px solid white;
  border-radius: 4px;
  display: flex;
  height: 36px;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
}

.messageToSend {
  border: 1px solid #383838;
  color: #fff;
  flex-grow: 3;
  font-family: MS Gothic, monospace;
  height: 100%;
}

#messageToSend {
  background-color: black;
  color: white;
  font-size: 18px;
  height: 100%;
  padding-left: 10px;
  width: 100%;
}

.sendMessageButton {
  background-color: rgb(0, 0, 0);
  color: white;
  cursor: pointer;
  flex-grow: 0.5;
  width: auto;
}

.sendMessageButton:hover {
  background-color: rgb(32, 32, 32);
}

.chatEmotakuUnique {
  background-color: var(--color-backgroundChat);
  border-radius: 5px;
  margin: 5px 0 5px 0;
  padding: 6px 6px 14px 6px;
  text-align: left;
}

.chatEmotakuUnique:hover {
  background-color: var(--color-backgroundChatHover);
}

.messagesContainer {
  padding: 0 13px 0 13px;
}

.chatUser {
  color: green;
}

.userAdmin {
  color: #00ffcf;
}

.topMesageContainer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
  padding: 10px;
}

.chatTimeMessage {
  padding-right: 5px;
}

.messageData {
  padding: 2px 0 0 20px;
  width: 80%;
  word-break: break-all;
}

.sticker {
  border: 2px solid rgb(197, 0, 246);
  border-radius: 7px;
  height: auto;
  width: 190px;
}

.nonSticker {
  width: 20px;
}

.topChatReference {
  margin-bottom: 5px;
}

.lastMessage {
  animation: 0.3s newMessageEffect linear;
  position: relative;
}

@keyframes newMessageEffect {
  from {
    margin-left: 200px;
    margin-right: 200px;
    transform: rotateX(90deg);
  }

  to {
    margin-left: 0;
    margin-right: 0;
  }
}

@media (max-width: 650px) {
  .topMesageContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .chatUser {
    font-size: 17px;
  }

  .messageData {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 0;
    text-align: center;
  }
}

</style>
  