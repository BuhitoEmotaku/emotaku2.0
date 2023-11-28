<template>
  <div class="chatFeatures">

    <h1 class="characteristics">CARACTERÍSTICAS</h1>
    <p>Además de poder comunicarnos mandando mensajes, también podemos mandar imágenes o Stickers / gifs.</p>
    <br>
    <hr><br>
    <p>Para ello tendremos que escribir el link de dicha imagen que queramos enseñar.</p>
    <br>
    <p>Todos los enlaces deberán ser tal que así: https://n.n.n/nnnnnn or http://n.n.n/nnnnnn</p>
    <br>
    <h4 class="titleExplainingChat">Sticker gif</h4>
    <video class="vidsExplainingChat" src="../assets/images/chatFeatures/gifSticker.webm" controls></video>
    <h4 class="titleExplainingChat">Sticker image</h4>
    <video class="vidsExplainingChat" src="../assets/images/chatFeatures/imageSticker.webm" controls></video>
    <h4 class="titleExplainingChat">Any Sticker + text</h4>
    <video class="vidsExplainingChat" src="../assets/images/chatFeatures/anyStickerWithText.webm" controls></video>
    <h4 class="titleExplainingChat">Links</h4>
    <video class="vidsExplainingChat" src="../assets/images/chatFeatures/links.webm" controls></video>
    <br><br><br><br>

    <img class="rulesChat" src="../assets/images/chatFeatures/rulesChat.webp" alt="rulesChat">
    <h2 class="atentionChatRules">⚠️ ATENCIÓN ⚠️</h2>

    <h3 class="idiomRules">Español:</h3>
    <div class="rulesSpanish">
      <span :class="[index % 2 === 0 ? 'goodBehaviour' : 'badBehaviour', 'indvRules']"
        v-for="(rule, index) in rulesSpanish" :key="index">{{ rule }}</span>
    </div>

    <h3 class="idiomRules">English:</h3>
    <div class="rulesEnglish">
      <span :class="[index % 2 === 0 ? 'goodBehaviour' : 'badBehaviour', 'indvRules']"
        v-for="(rule, index) in rulesEnglish" :key="index">{{ rule }}</span>
    </div>


  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatFeatures',
  setup() {
    const rulesSpanish = [
      'Respetar en el chat y no hacer nada malo.',
      'No mandar links ni imágenes +18.',
      'Saludar(no obligatorio), pero de buena educación ;).',
      'Evitar el envío masivo o inundación del chat con mensajes.',
      'Disfrutar y ser amable con el resto <3.',
      'Cualquier acción negativa conllevará baneo.'

    ];

    const rulesEnglish = [
      'Respect in the chat and refrain from any wrongdoing.',
      'Do not send links or images of +18 content.',
      "Say hello (not mandatory), but it's good manners ;).",
      'Avoid spamming or flooding the chat with messages.',
      'Enjoy and be kind to others <3.',
      'Any negative actions will result in a ban.'


    ];
    return {
      rulesSpanish,
      rulesEnglish
    }
  }
});
</script>
  
<style scoped>
.rulesChat {
  border: 2px solid #bb4ce3;
  border-left: 2px solid white;
  border-top: 2px solid white;
  width: 90%;
}

.characteristics {
  color: #7abaff;
  font-size: 25px;
  padding: 10px;
}

.titleExplainingChat {
  font-size: 20px;
  padding: 10px 0 0 0;
}

.vidsExplainingChat {
  cursor: pointer;
  width: 90%;
}

.atentionChatRules {
  color: yellow;
  font-size: 22px;
  padding: 10px;
}

.idiomRules {
  padding: 10px;
}

.rulesSpanish,
.rulesEnglish {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  width: 80%;
}

.goodBehaviour {
  color: #89ec89;
}

.badBehaviour {
  color: #ff3939;
}
</style>