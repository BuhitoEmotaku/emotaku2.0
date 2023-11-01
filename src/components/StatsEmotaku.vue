<template>
  <div class="statsContent">
    <div class="titleStats">
      <h1>Stats</h1>
    </div>
   <h1 class="totalVisits">Visitas totales -> {{ ApiStoreController.totalEntries }}</h1>
   <h1 class="uniqueUsers">Usuarios únicos -> {{ ApiStoreController.uniqueEntries }}</h1>

  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useApiStore } from '@/stores/apiData';
export default defineComponent({

  name: 'StatsEmotaku',
  setup() {

    //GET ENTRIES AND UNIQUE USERS
    const ApiStoreController = useApiStore();

    return { ApiStoreController };
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statsContent {
  padding: 15px;
}
.titleStats {
  text-align: center;
  font-size: 27px;
  color: #29ff36;
  padding: 0 6px 6px 6px;
}
.totalVisits {
padding-bottom: 10px;
}

</style>
