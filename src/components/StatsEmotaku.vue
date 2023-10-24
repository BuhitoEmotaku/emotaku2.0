<template>
  <div class="statsContent">
    <div class="titleStats">
      <h1>Stats</h1>
    </div>
   <h1 class="totalVisits">Visitas totales -> {{ totalEntries }}</h1>
   <h1 class="uniqueUsers">Usuarios únicos -> {{ totalUniqueUsers }}</h1>

  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { ref, onMounted, watch } from 'vue';
import { statsValues } from '@/assets/scripts/firebase';
export default defineComponent({

  name: 'StatsEmotaku',
  setup() {

    //GET ENTRIES AND UNIQUE USERS
    const { totalEntries, totalUniqueUsers } = statsValues();

    return { totalEntries, totalUniqueUsers };
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
