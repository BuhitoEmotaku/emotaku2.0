<template>
    <div class="comienzo">
        <h1 class="titleComenzar">Empezamos!</h1>
    </div>
    
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeView',
    components: {
    },
});


</script>
<style scoped>
    .comienzo {
        border:1px solid black;
        width: 90vw;
        margin: 0 auto;

    }
    .titleComenzar {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        transition: clip-path 1s;
    }
    .titleComenzar:hover {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

    }
</style>