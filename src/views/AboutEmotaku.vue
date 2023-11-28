<template>
  <div class="aboutBuhito">
    <div class="buhitoGreetings">
      <h1 class="titleAboutBuhito">Holitaaaaa!</h1>

      <img class="buhitoProfile" src="../assets/images/characters/buhito.webp" alt="buhitoProfile">
      <span>Soy Buhito, creador de Emotaku, encantado jejeje :)</span>
    </div>
    <div class="containerBuhitoBasicInfo">
      <h2 class="titleBuhitoBasicInfo">Información básica</h2>
      <div class="infoUniqueBuhito">
        <b class="infoBasicUniqueBuhito" v-for="buhitoInfoValue in buhitoInfo">
          ⋆ {{ buhitoInfoValue }} ⋆
        </b>
      </div>

      <div class="hobbiesBuhito">

        <h1 class="titleHobbiesBuhito">HOBBIES</h1>
        <div class="contentHobbiesBuhito">

          <div class="boxLinksHobbieBuhito" v-for="(hobbieRoutes, index) in buhitoHobbies" :key="index"
            :style="{ 'background-image': index % 2 === 0 ? `url('${useAssets('/src/assets/images/stickersKawaii/straw.gif')}')` : `url('${useAssets('/src/assets/images/stickersKawaii/straw2.gif')}` }">
            <router-link class="linksHobbieBuhito" :to="{ path: `HobbiesBuhitoGallery/${hobbieRoutes.parameter}` }">
              {{ hobbieRoutes.text }}
            </router-link>
          </div>


        </div>



      </div>
    </div>
    <div class="containerBuhitoDetails">
      <h2 class="titleBuhitoDetails">Gustos y detalles</h2>
      <div class="infoUniqueBuhito">
        <span v-for="(buhitoDetailsValue, index) in buhitoDetails" :key="index"
          :class="['detailsUniqueBuhito', index % 2 === 0 ? 'socialMediaUniqueBuhitoEven' : 'socialMediaUniqueBuhitoOdd']">
          <span class="arrowAboutInfo"></span>
          {{ buhitoDetailsValue }}
          <span class="arrowAboutInfo"></span>
        </span>

      </div>

    </div>
    <div class="containerBuhitoRedes">
      <h2 class="titleBuhitoRedes">Redes Sociales</h2>
      <div class="infoUniqueBuhitoContainer">
        <span class="infoUniqueMedia" v-for="(buhitoSocialMediaValue, index) in buhitoSocialMedia" :key="index">
          <a :href="buhitoSocialMediaValue.url" rel="norrefer" target="_blank">
            <img class="imgIconsBuhitoSocialMedia" :src="buhitoSocialMediaValue.icon" :alt="buhitoSocialMediaValue.text">
          </a>
          &nbsp;&nbsp;
          <a :href="buhitoSocialMediaValue.url" rel="norrefer" target="_blank">
            <b class="socialMediaUniqueBuhito"><a :href="buhitoSocialMediaValue.url" rel="norrefer" target="_blank"></a>{{
              buhitoSocialMediaValue.text }}</b>
          </a>
        </span>
      </div>

    </div>

  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import useAssets from '@/assets/scripts/composable';

export default defineComponent({
  name: 'AboutEmotaku',
  setup() {


    const buhitoInfo = [
      "Chico",
      "20 años",
      "España",
      '"Emo" <-> "Otaku"'
    ];

    const buhitoDetails = [
      "Color favorito: Rosa",
      "Me encanta Pokémon!",
      "Juego fav: Pokémon Soulsilver",
      'Actuales: Battlefield V / Valorant',
      "6º de España Cubos de Rubik a una mano",
      "Love Electronics <3",
      "Beatles forever ^^",
      'Adicto a la fanta de NARANJA',
      'Domador de pájaros'
    ];

    const buhitoSocialMedia = [
      {
        icon: useAssets('/src/assets/images/socialMediaIcons/usedOnes/githubIcon.webp'), url: "", text: "githubIcon"
      },
      {
        icon: useAssets('/src/assets/images/socialMediaIcons/usedOnes/instagramIcon.webp'), url: "", text: "instagramIcon"
      },
      {
        icon: useAssets('/src/assets/images/socialMediaIcons/usedOnes/tiktokIcon.webp'), url: "", text: "tiktokIcon"
      },
      {
        icon: useAssets('/src/assets/images/socialMediaIcons/usedOnes/twitterIcon.webp'), url: "", text: "twitterIcon"
      },
      {
        icon: useAssets('/src/assets/images/socialMediaIcons/usedOnes/youtubeIcon.webp'), url: "", text: "youtubeIcon"
      }
    ];

    const buhitoHobbies = [
      {
        icon: "", text: "SpeedCubing", parameter: "speedCubing"
      },
      {
        icon: "", text: "Electrónica", parameter: "electronic"
      }
    ];



    let intervalarrowAboutInfo: any;
    let arrows: any;
    let arrayDetailsUnique: any;
    let index = 1;
    let indexDetails = 0;
    onMounted(() => {
      arrows = document.querySelectorAll('.arrowAboutInfo');
      arrayDetailsUnique = document.querySelectorAll('.detailsUniqueBuhito');

      intervalarrowAboutInfo = setInterval(() => {
        // Actualiza el índice actual
        arrows[index - 1].textContent = arrows[index - 1].textContent === '' ? '< ' : '';
        arrows[index].textContent = arrows[index].textContent === '' ? ' >' : '';
        arrayDetailsUnique[indexDetails].style.color = 'yellow';

        // Vuelve al índice anterior y establece su texto a '-'
        const previousIndex1 = (index - 3 + arrows.length) % arrows.length;
        const previousIndex2 = (index - 2 + arrows.length) % arrows.length;
        arrows[previousIndex2].textContent = '';
        arrows[previousIndex1].textContent = '';
        if (indexDetails > 0)
          arrayDetailsUnique[indexDetails - 1].style.color = 'rgb(187, 186, 186)';
        else arrayDetailsUnique[arrayDetailsUnique.length - 1].style.color = 'rgb(187, 186, 186)';
        // Incrementa al siguiente índice
        index = (index + 2) % arrows.length;
        indexDetails = (indexDetails + 1) % arrayDetailsUnique.length;

      }, 1500);
    });

    onUnmounted(() => {
      clearInterval(intervalarrowAboutInfo);

      // Borrar el texto de todos los elementos con la clase 'arrowAboutInfo'
      for (let i = 0; i < arrows.length; i++) {
        arrows[i].textContent = '';
      }
    });

    return {
      useAssets,
      buhitoInfo,
      buhitoDetails,
      buhitoSocialMedia,
      buhitoHobbies
    }

  }

});
</script>
<style scoped>
a {
  color: white;
  text-decoration: none;
}

.buhitoGreetings {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.aboutBuhito {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.titleAboutBuhito {
  font-size: 47px;
  padding: 13px;
}

.titleBuhitoBasicInfo {
  color: #f05e5e;
  font-size: 28px;
  margin: 8px;
}

.titleBuhitoDetails {
  color: #bbb250;
  font-size: 28px;
  margin: 8px;
}

.titleBuhitoRedes {
  color: #8eecf5;
  font-size: 28px;
  margin: 8px;
}

.titleHobbiesBuhito {
  color: #aaffb775;
  font-size: 28px;
  margin: 20px 0 20px 0;
}

.buhitoProfile {
  border: 2px solid rgb(186, 102, 235);
  border-radius: 10px;
  height: auto;
  margin: 0 0 10px 0;
  width: 100%;
}

.infoUniqueBuhito {
  display: flex;
  flex-direction: column;
}

.infoUniqueBuhitoContainer {
  margin: 0 auto;
  padding: 20px 0 20px 0;
  width: 50%;
}

.infoUniqueMedia {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 6px auto;
}

.socialMediaUniqueBuhito,
.imgIconsBuhitoSocialMedia {
  border: 2px solid white;
  cursor: pointer;
}

.socialMediaUniqueBuhito {
  padding: 3px;
}

.imgIconsBuhitoSocialMedia:hover {
  filter: brightness(50%);
}

.contentHobbiesBuhito {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.boxLinksHobbieBuhito {
  background-size: cover;
  display: flex;
  height: auto;
}

.linksHobbieBuhito {
  color: rgb(0, 0, 0);
  font-size: 10px;
  padding: 10px;
}

.socialMediaUniqueBuhito:hover {
  color: rgb(170, 13, 176);
}

.infoBasicUniqueBuhito {
  padding: 2px 0 8px 0;
}

.infoBasicUniqueBuhito:hover {
  color: rgb(209, 248, 15);
}

.socialMediaUniqueBuhitoEven,
.socialMediaUniqueBuhitoOdd {
  border-radius: 3px;
  color: rgb(187, 186, 186);
  margin: 4px;
  padding: 4px;
}

.socialMediaUniqueBuhitoEven {
  background-color: rgb(10, 24, 27);
  border: 1px solid rgb(20, 59, 58);
}

.socialMediaUniqueBuhitoOdd {
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(33, 33, 33);
}

.imgIconsBuhitoSocialMedia {
  height: auto;
  width: 50px;
}

.arrowAboutInfo {
  color: rgb(244, 233, 15);
}

@media (max-width:1110px) {
  .titleAboutBuhito {
    font-size: 60px;
    margin: 25px;
  }

  .buhitoProfile {
    width: 70%;
  }
}

@media (max-width:880px) {
  .titleAboutBuhito {
    font-size: 55px;
  }

  @media (max-width:616px) {
    .titleAboutBuhito {
      font-size: 50px;
    }

    .buhitoProfile {
      width: 85%;
    }
  }
}

@media (max-width:444px) {
  .titleAboutBuhito {
    font-size: 40px;
    margin: 10px;
  }
}
</style>