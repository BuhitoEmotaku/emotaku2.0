<template>
  <div class="musicPlayer">
    <h2 class="titleDJEmotaku">- DJ EMOTAKU -</h2>
    <div class="configPlayer">
      <img :src="loopPlayImg" alt="loopPlay" @click="playLoop"
        :class="['configPlayerIcons', 'loopPlay', { 'selectedConfigOption': loopPlay == true }]">
      <img :src="autoPlayImg" alt="autoPlay" @click="playAuto"
        :class="['configPlayerIcons', 'autoPlay', { 'selectedConfigOption': autoPlay == true }]">

      <img :src="randomPlayImg" alt="autoPlay" @click="playRandom"
        :class="['configPlayerIcons', 'randomPlay', { 'selectedConfigOption': randomPlay == true }]">
    </div>

    <div class="musicSongsContainer">
      <div class="listTypes">
        <span v-for="(folder, index) in ApiStoreController.allMusic" :key="index"
          @click="showSongList(folder.folder, index)" :class="['uniqueType', { 'selectedOne': indexFolderDt === index }]">
          <h4>{{ folder.folder }}</h4>
        </span>
      </div>
      <div class="subFolderGroupContainer" v-for="(folder, indexFolder) in ApiStoreController.allMusic"
        :key="indexFolder">
        <div v-if="selectedFolder === folder.folder">
          <div v-for="(nestedFolder, nestedIndex) in folder.nestedFolders" :key="nestedIndex">
            <div class="titleFolderGroup" @click="showSubFolders(nestedFolder.folder)">
              <b>{{ nestedFolder.folder }}</b>
            </div>
            <div class="listSongs" v-if="selectedSubfolder === nestedFolder.folder"
              :class="['uniqueList', { 'selectedList': nestedIndexDt === nestedIndex }]">
              <span v-for="(song, songIndex) in nestedFolder.songs" :key="songIndex" class="uniqueSongs"
                @click="selectSong(folder.folder, nestedFolder.folder, song.file, indexFolder, nestedIndex, songIndex)"
                :class="[
                  'uniqueType',
                  { 'selectedOne': `${currentPlay}` == `${indexFolder}${nestedIndex}${songIndex}` }
                ]">
                <b>{{ song.title }}</b>
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <audio id="audioSelected" controls @ended="checkPlayConfig()"></audio>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useApiStore } from '@/stores/apiData';
import autoPlayImg from '@/assets/images/musicPlayer/autoPlay.webp';
import loopPlayImg from '@/assets/images/musicPlayer/loopPlay.webp';
import randomPlayImg from '@/assets/images/musicPlayer/randomPlay.webp';

export default defineComponent({

  name: 'MusicEmotaku',
  setup() {

    const songObj = ref<any>();

    const ApiStoreController = useApiStore();
    const audioPlayer = ref<any>();

    const selectedFolder = ref<any>();
    const selectedSubfolder = ref<any>();
    const selectedSong = ref<any>();

    const currentPlay = ref<any>();

    const indexFolderDt = ref<any>();
    const nestedIndexDt = ref<any>();
    const songIndexDt = ref<any>();

    const loopPlay = ref<any>(false);
    const autoPlay = ref<any>(false);
    const randomPlay = ref<any>(false);

    const showSongList = (folder: any, index: any) => {
      if (selectedFolder.value == folder) {
        indexFolderDt.value = '';
        selectedFolder.value = '';
      }
      else {
        indexFolderDt.value = index;
        selectedFolder.value = folder;
      }
    }

    const showSubFolders = (subFolder: any) => {
      if (selectedSubfolder.value == subFolder) selectedSubfolder.value = '';
      else selectedSubfolder.value = subFolder;
    }


    const playSongMeth = async () => {
      selectedFolder.value = ApiStoreController.allMusic[indexFolderDt.value].folder;
      selectedSubfolder.value = ApiStoreController.allMusic[indexFolderDt.value].nestedFolders[nestedIndexDt.value].folder;
      selectedSong.value = ApiStoreController.allMusic[indexFolderDt.value].nestedFolders[nestedIndexDt.value].songs[songIndexDt.value].file;

      currentPlay.value = `${indexFolderDt.value}${nestedIndexDt.value}${songIndexDt.value}`;
      await ApiStoreController.requestSong(selectedFolder.value, selectedSubfolder.value, selectedSong.value);
      songObj.value.setAttribute("src", ApiStoreController.songSelected);
      songObj.value.play();
    }


    const checkPlayConfig = async () => {
      if (loopPlay.value) songObj.value.play();
      else if (randomPlay.value) {
        const randomSong = Math.floor(Math.random() * ApiStoreController.allMusic[indexFolderDt.value].nestedFolders[nestedIndexDt.value].songs.length);
        songIndexDt.value = randomSong;
        playSongMeth();
      }
      else if (autoPlay.value) {
        if (songIndexDt.value == ApiStoreController.allMusic[indexFolderDt.value].nestedFolders[nestedIndexDt.value].songs.length - 1)
          songIndexDt.value = 0;
        else songIndexDt.value++;

        playSongMeth();

      }


    }

    const playLoop = () => {
      // Activa o desactiva el bucle
      loopPlay.value = !loopPlay.value;
      autoPlay.value = false;
      randomPlay.value = false;
    };

    const playAuto = () => {
      // Activa o desactiva el bucle
      autoPlay.value = !autoPlay.value;
      loopPlay.value = false;
      randomPlay.value = false;
    };

    const playRandom = () => {
      // Activa o desactiva el bucle
      randomPlay.value = !randomPlay.value;
      autoPlay.value = false;
      loopPlay.value = false;

    };

    const selectSong = async (folder: any, subFolder: any, song: any,
      indexFolder: any, nestedIndex: any, songIndex: any) => {
      try {
        await ApiStoreController.requestSong(folder, subFolder, song);
        if (ApiStoreController.songSelected) {
          selectedSong.value = song;
          indexFolderDt.value = indexFolder;
          nestedIndexDt.value = nestedIndex;
          songIndexDt.value = songIndex;

          playSongMeth();

          console.log(`${indexFolderDt.value}${nestedIndexDt.value}${songIndexDt.value}`);

        };
      }
      catch (error) {

      };
    }

    onMounted(async () => {
      //iniciarWebsocket
      if (songObj != null) {
        songObj.value = document.getElementById("audioSelected") as HTMLAudioElement;
        songObj.value.volume = 0.3;
        // Establecer la fuente del elemento de audio
      }

      await ApiStoreController.getMusic();
      selectedFolder.value = ApiStoreController.allMusic[0].folder;
      indexFolderDt.value = 0;
      selectedSubfolder.value = ApiStoreController.allMusic[0].nestedFolders[0].folder;
      nestedIndexDt.value = 0;

    });

    return {
      ApiStoreController, audioPlayer, selectedFolder, selectedSubfolder,
      selectedSong, indexFolderDt, nestedIndexDt, songIndexDt, loopPlayImg, autoPlayImg, loopPlay,
      autoPlay, randomPlay, randomPlayImg, currentPlay,
      selectSong, showSongList, showSubFolders, checkPlayConfig, playLoop, playAuto, playRandom
    };
  }
});
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.configPlayer {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.configPlayerIcons {
  background-color: rgb(218, 218, 218);
  border-radius: 5px;
  cursor: pointer;
  height: auto;
  padding: 3px;
  width: 30px;
}

.configPlayerIcons:hover {
  background-color: rgb(104, 104, 104);
}

.selectedConfigOption {
  background-color: rgb(49, 255, 226);
}

.titleDJEmotaku {
  color: var(--color-titleMusic-stats);
  padding: 11px 0 11px 0;
}

.listTypes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0 10px 0;
  max-height: 50px;
  overflow: auto;
}

.subFolderGroupContainer {
  max-height: 450px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.titleFolderGroup {
  align-items: center;
  background-color: rgb(17, 17, 17);
  border: 2px solid rgb(255, 255, 255);
  color: rgb(38, 219, 185);
  cursor: pointer;
  display: flex;
  font-size: 18px;
  height: 60px;
  margin: 10px 0 10px 0;
}

.titleFolderGroup b {
  margin: 0 auto;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.titleFolderGroup:hover {
  background-color: rgb(198, 199, 249);
  border: 2px solid aqua;
  color: black;
}

.uniqueList {
  animation: listOpen 0.2s ease-out;
  margin: 0 10px 0 10px;
}

.uniqueType {
  border: 2px solid rgb(184, 118, 250);
  border-radius: 5px;
  cursor: pointer;
  margin: 2px;
  padding: 8px;
  position: relative;
  z-index: 0;
}

.uniqueType:hover {
  background-color: rgb(232, 232, 132);
  color: black;
}

.listSongs {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.uniqueSongs {
  border: 2px solid rgb(145, 11, 42);
  margin: 4px 0 4px 0;
  padding: 5px 0 5px 0;
}

.uniqueSongs:hover {
  background-color: rgb(127, 127, 127);
  cursor: pointer;
}

.selectedOne {
  background-color: rgb(255, 255, 255);
  color: black;
}

#audioSelected {
  border-radius: 10px;
  margin: 20px 0 0 0;
  width: 100%;
}

@keyframes listOpen {
  from {
    margin-left: 100%;
    margin-right: -100%;
  }

  to {
    margin-top: 0;
  }
}
</style>
