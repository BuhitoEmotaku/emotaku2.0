<template>
  <div class="buhitoOnlineChecker">
    <h1 :class="['titleOnlineChecker', `${ApiStoreController.buhitoOnline}BuhitoOnline`]"></h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApiStore } from '@/stores/apiData';

export default defineComponent({
  name: 'BuhitoOnlineCheck',
  setup() {
    const ApiStoreController = useApiStore();
    console.log(ApiStoreController.buhitoOnline);
    return { ApiStoreController };
  }
});
</script>

<style scoped>
.titleOnlineChecker {
  align-items: center;
  display: flex;
  font-size: 20px;
  height: 50px;
  justify-content: center;
  width: 100%;
}

.falseBuhitoOnline::before {
  color: red;
  content: 'Buhito Offline';
}

.trueBuhitoOnline::before {
  color: #5ee85e;
  content: 'Buhito Online';
}
</style>
