<template>
  <main class="home">
    <div class="mainContent">
      <aside class="mainLeft">
        <div></div>
        <nav class="principalViews">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
          <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
        </nav>
      </aside>
      <aside class="mainCenter">
        <marquee class="welcomeMessage" behavior="scroll" direction="left">Bienvenid@ a 🖤Emotaku🤍 pequeña ratita</marquee>
        <router-view />
      </aside>
      <aside class="mainRight"></aside>
    </div>
  </main>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainEmotaku'
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.home {
  width: 100%;
  height: 85vh;
}

.mainContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 9px;
  justify-content: center;
  background-color: rgb(184, 184, 184);
  gap: 13.5px;
}

.mainLeft {
  width: 24%;
  height: 100%;
  background-color: red;
}

.mainRight {
  width: 24%;
  height: 100%;
  background-color: blue;
}

.mainCenter {
  overflow-x: hidden;
  width: 49.5%;
  height: 100%;
  padding: 20px;
  background-color: black;
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

.welcomeMessage {
  border: 2px solid white;
}

@media (max-width: 1110px) {

  .mainLeft,
  .mainRight,
  .mainCenter {
    width: 100%;
  }
}
</style>
  