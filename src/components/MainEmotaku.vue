<template>
  <FpsEmotaku></FpsEmotaku>
  <main class="mainContentSkeleton">
    <div class="allContent">
      <aside class="mainContent">
        <aside class="mainLeft">
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>

          <nav class="principalViews">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
            <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
          </nav>
        </aside>
        <aside class="mainCenter">
          <marquee class="welcomeMessage" behavior="scroll" direction="left">Bienvenid@ a 🖤Emotaku🤍 pequeña ratita
          </marquee>
          <div id="viewSelected">
            <router-view />
            <h1>HEEEEEEEE</h1>
            <h1>HEEEEEEEE</h1>
            <h1>HEEEEEEEE</h1>
            V
            <h1>HEEEEEEEE</h1>
            <h1>HEEEEEEEE</h1>
            <h1>HEEEEEEEE</h1>
            <h1>HEEEEEEEE</h1>
            <h1>HEEEEEEEE</h1>
            <h1>HEEEEEEEE</h1>
            <h1>HEEEEEEEE</h1>
            <h1>HEEEEEEEE</h1>
          </div>

        </aside>
        <aside class="mainRight">
          <ConfigEmotaku></ConfigEmotaku>
        </aside>

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
export default defineComponent({
  name: 'MainEmotaku',
  components: {
    ConfigEmotaku,
    FpsEmotaku,
    ChatEmotaku
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
}

.mainLeft,
.mainRight,
.mainCenter {
  overflow: auto;
  max-height: 800px;
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
}

.mainLeft {
  width: 24%;
}

.mainRight {
  width: 24%;
  padding: 12px;
}

.mainCenter {
  width: 47.7%;
  padding: 20px;
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
  max-height: 459px;
  overflow: auto;
  border-radius: 5px;
}

.welcomeMessage {
  border: 2px solid white;
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
  