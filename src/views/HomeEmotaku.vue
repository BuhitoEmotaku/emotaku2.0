<template>
  <div>
    <div>
      <video class="welcomeEmotakuHome" autoplay loop muted playsinline>
              <source src="../assets/images/welcome-anime.webm" type="video/webm"/>
      </video>

      <h1>Bienvenido a Emotaku!</h1>

      <p class="plResumeEmotaku">Esta página ha sido creada con el fin de aprender y mejorar en el ámbito de la
        programación.
      </p>
      <hr>

      <p class="prResumeEmotaku">El objetivo principal, ya seas emo, otaku o simplemente curioso, será de disfrutar
        explorando y charlando con los demás.
      </p>
      <hr>
      <br>

      <p class="plResumeEmotaku">Inspirada en otras páginas como...
        <a href="https://dimden.dev/" target="_blank" rel="noopener noreferrer">dimden.dev</a> |
        <a href="https://adilene.net/" target="_blank" rel="noopener noreferrer">adilene.net</a> |
        <a href="https://neocities.org/browse" target="_blank" rel="noopener noreferrer">neocities.org</a>
      </p>
      <hr>
    </div>

  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeEmotaku',

});
</script>
  
<style scoped>
h1,
h2 {
  padding: 10px;
}

h1 {
  font-size: 30px;
}

.prResumeEmotaku {
  /*color: #a87fd2;*/
  text-align: right;
}

.plResumeEmotaku {
  text-align: left;
}

p {
  padding: 10px;
}

ul li {
  margin: 0 auto;
  width: 60%;
}

@media (max-width: 600px) {
  .welcomeEmotakuHome {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .welcomeEmotakuHome {
    width: 100%;
  }

  h1 {
    font-size: 20px;
  }
}
</style>