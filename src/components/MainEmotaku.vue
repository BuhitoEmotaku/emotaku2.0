<template>
  <FpsEmotaku></FpsEmotaku>
  <main class="mainContentSkeleton">
    <div class="allContent">
      <aside class="mainContent">
        <aside class="mainLeft">
          <aside class="routesEmotaku">
            <nav class="principalViews">
              <router-link to="/">INICIO</router-link>
              <router-link to="/about">Buhito(CREADOR)</router-link>
              <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
              <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>

            </nav>
          </aside>
          <aside class="statsEmotaku">
            <StatsEmotaku></StatsEmotaku>
          </aside>
          
        </aside>



        <aside class="mainCenter">
          <marquee class="welcomeMessage" behavior="scroll" direction="left">Bienvenid@ a 🖤Emotaku🤍 pequeña ratita
          </marquee>
          <div id="viewSelected">
            <router-view />
          </div>

        </aside>
        <aside class="mainRight">
          <aside class="configAside">
            <ConfigEmotaku></ConfigEmotaku>
          </aside>

          <aside class="configAside" id="spriteGameContainer">
            <SpriteMovingGame></SpriteMovingGame>
          </aside>


        </aside>

      </aside>

      <aside class="stickersSlidingChat">
        <StickersSliding></StickersSliding>
      </aside>

      <aside class="mainChatEmotaku">
        <ChatEmotaku></ChatEmotaku>
      </aside>
    </div>
  </main>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import ConfigEmotaku from '@/components/ConfigEmotaku.vue';
import FpsEmotaku from '@/components/FpsEmotaku.vue';
import ChatEmotaku from '@/components/chatEmotaku/ChatEmotaku.vue';
import SpriteMovingGame from '@/components/miniApps/SpriteMovingGame.vue';
import StickersSliding from '@/components/decorationEmotaku/stickersSliding/StickersSliding.vue';
import StatsEmotaku from '@/components/StatsEmotaku.vue';

export default defineComponent({
  name: 'MainEmotaku',
  components: {
    ConfigEmotaku,
    FpsEmotaku,
    ChatEmotaku,
    SpriteMovingGame,
    StickersSliding,
    StatsEmotaku
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainContentSkeleton {
  width: 100%;
}

aside {
  background-color: rgb(0, 0, 0);
}

.allContent {
  display: flex;
  flex-direction: column;
  gap: 15.5px;
  margin-top: 4px;
}

.mainLeft,
.mainRight,
.mainCenter {
  overflow: auto;
  max-height: 772px;
  border-radius: 10px;
}

.mainContent {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 19px;
  gap: 22.5px;
  border-radius: 5px;
  overflow: hidden;
  min-height: 772px;
}

.mainLeft {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 24%;
  padding: 12px;
}

.mainRight {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 24%;
  padding: 12px;
}

.mainCenter {
  width: 47.7%;
  padding: 20px;
}

#viewSelected {
  margin-top: 10px;
}

.mainTopInfo {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  height: 48vh;
  margin: 0 auto;
  background-color: red;
  border: 2px solid black;

}

.principalViews {
  display: flex;
  flex-direction: column;
  
}

.principalViews a {
  padding: 4px 0 4px 0;
  font-weight: bold;
  color: #61eefd;
  text-decoration: none;
}

.principalViews a.router-link-exact-active {
  color: #bf00f9;
  text-decoration: underline; 
}



.selfExplanation {
  width: 75%;
  height: 88%;
  overflow-y: auto;
  background-color: green;
  border: 1px solid white;

}

.mainTopRightInfo {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 22%;
  background-color: blue;
  margin-left: 28px;
}

.mainChatEmotaku {
  width: 100%;
  padding: 20px 20px 30px 20px;
  max-height: auto;
  overflow: hidden;
  border-radius: 5px;
}

.welcomeMessage {
  border: 2px solid white;
}

.configAside {
  overflow: auto;
  max-height: 300px;
  padding: 15px;
  border-radius: 10px;
}

.routesEmotaku {
  overflow: auto;
  max-height: 300px;
  padding: 15px;
  border-radius: 10px;
}

.stickersSlidingChat {
  border-radius: 6px;
}
.statsEmotaku {
  border-radius: 6px;
}

@media (max-width: 1110px) {

  .mainLeft,
  .mainRight,
  .mainCenter {
    overflow: scroll;
    width: 100%;
  }

  .mainLeft {
    height: 300px;
  }

  .mainContentSkeleton {
    max-height: 100%;
    max-width: 95%;
    margin: 0 auto;
  }

  .mainContent {
    max-height: 100%;
  }
}
</style>
  