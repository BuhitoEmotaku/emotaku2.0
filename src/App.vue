<template>
  <BackgroundDayNightEmotaku></BackgroundDayNightEmotaku>
  <EmotakuLines></EmotakuLines>
  <BannerEmotaku></BannerEmotaku>
  <div class="home">
    <aside class="leftSide"></aside>
      <div class="selfExplanation">
        <marquee>Hola chaval, eres una rata</marquee>
      </div>
      <div class="mainTopRightInfo">
        <div class="imOnline"></div>
        <div class="zones"></div>
      </div>
    
  </div>

  <router-view />
<nav>
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link :to="{ name: 'testingEverything' }"><abbr>TestingZone</abbr></router-link> |
  <router-link :to="{ name: 'tricksBoy' }">TricksBoy</router-link> | 
</nav>
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
</style>
