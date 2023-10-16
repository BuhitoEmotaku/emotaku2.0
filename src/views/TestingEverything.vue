<template>
        <div class="testingZone">
        <img alt="Vue logo" src="../assets/logo.png">
        <WelcomeEmotaku msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
    <h1>HOLA</h1>
    <h1>HOLA</h1>
    <h1>HOLA</h1>
    <h1>HOLA</h1>
    <h1>HOLA</h1>
    <h1>HOLA</h1>
    
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import WelcomeEmotaku from '@/components/WelcomeEmotaku.vue'; // @ is an alias to /src

export default defineComponent({
    name: 'HomeView',
    components: {
        WelcomeEmotaku,
    },
});


</script>
<style scoped>
.testing {
    width: 100%;
    overflow: hidden;
}
</style>