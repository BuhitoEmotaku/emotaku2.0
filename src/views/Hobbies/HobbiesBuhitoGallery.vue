
<template>
  <Suspense>
    <div class="hobbieContainer">
      <div @click="router.back()" class="adhesiveGalleryContent">
        <img class="adhesiveGalleryContent" src="../../assets/images/adhesiveBandage.png" alt="">
      </div>
      <h1 class="hobbieTitle">{{ title }}<br> Buhito</h1>
      <div class="containerPicChosen">
        <video class="picChosen" v-if="getExtension(imgChosen) === 'webm'" :src="imgChosen" controls volume="0.1"></video>
        <img v-else class="picChosen picZoomer" :src="imgChosen" alt="">
      </div>
      <div class="hobbieContent">
        <span class="hobbieBuhitoGallery" v-for="imgEmo in buhitoImages" :key="imgEmo">
          <video class="hobbieBuhitoPics" v-if="getExtension(imgEmo) === 'webm'" :src="imgEmo"
            @click="changePathChosen(imgEmo)" type="video/webm">
          </video>
          <img v-else class="hobbieBuhitoPics" :src="imgEmo" alt="" @click="changePathChosen(imgEmo)">
        </span>
      </div>

    </div>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import specificAssetsSearch from '@/assets/scripts/specificAssetsSearch';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'HobbiesBuhitoGallery',
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    // Accede a los parámetros de la ruta usando el objeto route de router
    const buhitoImages = ref<any>(specificAssetsSearch(route.params.dataImages));
    const title = route.params.dataImages;
    const imgChosen = ref(buhitoImages.value[0]);

    const getExtension = (path: string) => {
      // Obtener la última aparición del punto en el nombre del archivo
      const ultimoPunto = path.lastIndexOf('.');
      const extension = path.slice(ultimoPunto + 1);
      return extension;
    }

    const changePathChosen = (path: string) => {
      imgChosen.value = path;
    }

    /*
    const goBack = () => {
      // Utilizamos el historial del navegador para retroceder
      window.history.length > 1 ? router.go(-1) : router.push('/');
    };
    */
    return {
      router,
      buhitoImages,
      imgChosen,
      title,
      getExtension,
      changePathChosen
    };
  }

});
</script>
<style scoped>
.hobbieTitle {
  color: #cea543;
  font-size: 38px;
  margin: 20px;
  padding: 10px;
}

.hobbieContent {
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  height: 125px;
  justify-content: center;
  overflow: auto;
}

.adhesiveGalleryContent {
  cursor: pointer;
  margin-left: -10px;
  position: absolute;
  width: 50px;
}

.hobbieBuhitoGallery {
  height: 120px;
  width: 120px;
}

.hobbieBuhitoPics {
  border: 2px solid white;
  border-radius: 10px;
  height: 120px;
  object-fit: cover;
  transition: all 0.2s ease;
  width: 100%;
}

.containerPicChosen {
  align-items: center;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  height: 289px;
  margin-bottom: 30px;
  max-width: 100%;
  overflow: hidden;
}

.picChosen {
  background-size: contain;
  transition: transform .5s ease;
  width: 100%;
}

.picZoomer:hover {
  transform: scale(1.3);
}

.hobbieBuhitoPics:hover {
  border: 3px solid #921bbd;
  cursor: pointer;
  transform: scale(0.8);
}

@media (max-width: 450px) {
  .hobbieTitle {
    font-size: 24px;
  }
}
</style>