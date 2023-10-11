<template>
  <BackgroundDayNightEmotaku></BackgroundDayNightEmotaku>
  <EmotakuLines></EmotakuLines>
  <BannerEmotaku></BannerEmotaku>
  <main class="home">
    <div class="mainContent">
      <aside class="mainLeft">
        <nav class="principalViews">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link :to="{ name: 'testingEverything' }">TestingZone</router-link>
          <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link>
        </nav>
      </aside>
      <aside class="mainCenter">
        <marquee behavior="scroll" direction="left">Bienvenid@ a 🖤Emotaku🤍 pequeña ratita</marquee>
        <router-view />
      </aside>
      <aside class="mainRight"></aside>
    </div>


  </main>
</template>



<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import BackgroundDayNightEmotaku from '@/components/BackgroundDayNightEmotaku.vue';
import EmotakuLines from '@/components/EmotakuLines.vue';
import BannerEmotaku from '@/components/BannerEmotaku.vue';
export default defineComponent({

  components: {
    BackgroundDayNightEmotaku,
    EmotakuLines,
    BannerEmotaku

  },

});
</script>


<style>
@import './assets/styles/fonts.css';

#app {
  font-family: Pixel Operator, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.home {
  width: 100%;
  height: 85vh;
  outline: var(--outlineContent);
  margin-bottom: 20px;
}

.mainContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.mainLeft {
  width: 25%;
  height: 100%;
  background-color: red;
}

.mainRight {
  width: 25%;
  height: 100%;
  background-color: blue;
}

.mainCenter {
  overflow-x: hidden;
  width: 50%;
  height: 100%;
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

@media (max-width: 1110px) {

  .mainLeft,
  .mainRight,
  .mainCenter {
    width: 100%;
  }
}</style>
