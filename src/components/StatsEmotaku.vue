<template>
  <div class="statsContent">
    <div class="titleStats">
      <h1>Stats</h1>
    </div>
    <h1 class="totalVisits">Visitas totales <span class="statsNumber">{{ ApiStoreController.totalEntries }}</span></h1>
    <h1 class="uniqueUsers">Usuarios únicos <span class="statsNumber">{{ ApiStoreController.uniqueEntries }}</span></h1>

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
  color: #29ff36;
  font-size: 27px;
  padding: 0 6px 6px 6px;
  text-align: center;
}

.totalVisits {
  padding-bottom: 10px;
}

.statsNumber {
  color: var(--color-titleMusic-stats);
  font-family: Monaco;
  font-size: 21px;
}
</style>
