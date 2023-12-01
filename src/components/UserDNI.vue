<template>
  <div class="userDNIEmotaku">
    <div class="userDNIEmotakuImg">
      <div class="DNIContainer">
        <h1 class="userDNITitle">USER DNI</h1>
        <div class="InsideDNIContainer">
          <div class="DNIContainerImg">
            <img class="imgProfile" :src="imgProfile" alt="userProfile">
          </div>
          <div class="DNIContainerData">
            <input class="nameChosen" type="text" v-model="nameDNI" :placeholder="nameDNI" maxlength="17">
            <div class="userGender">
              <span class="maleUser" :class="{ selected: selectedGender === 'M' }" @click="genderChosen('M')">M
              </span>
              <span class="femaleUser" :class="{ selected: selectedGender === 'F' }" @click="genderChosen('F')">F
              </span>
            </div>
            <span id="buttonSaveDNI" class="buttonSaveDNI" @click="saveDataDNI()">Save</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { ref, onMounted, watch } from 'vue';

import { useApiStore } from '@/stores/apiData';
import useAssets from '@/assets/scripts/composable';

export default defineComponent({
  name: 'UserDNI',
  setup() {

    const nameDNI: any = ref();
    const useApiStoreData = useApiStore();
    const selectedGender = ref();
    const imgProfile = ref();

    const saveDataDNI = () => {
      useApiStoreData.userNameDNI = nameDNI.value;
      localStorage.setItem('genderDNI', `${selectedGender.value}`);
      localStorage.setItem('nameDNI', `${nameDNI.value}`);
      console.log(useApiStoreData.userNameDNI);
      const buttonSaveDNI = document.getElementById('buttonSaveDNI');
      if (buttonSaveDNI) {
        buttonSaveDNI.innerText = 'Saved!';
        buttonSaveDNI.style.width = '62%';

        // Eliminar el texto después de dos segundos
        setTimeout(() => {
          buttonSaveDNI.innerText = 'Save';
          buttonSaveDNI.style.width = '50%';
        }, 1000);
      }
    }

    const checkImgProfile = () => {
      if (selectedGender.value == 'M') imgProfile.value = useAssets('/src/assets/images/userDNI/userMale.webp');
      else if (selectedGender.value == 'F') imgProfile.value = useAssets('/src/assets/images/userDNI/userFemale.webp');
      else imgProfile.value = useAssets('/src/assets/images/userDNI/userUnselected.webp');
    }

    const genderChosen = (gender: string) => {
      if (selectedGender.value == gender) selectedGender.value = '';
      else selectedGender.value = gender;
      checkImgProfile();
    };



    onMounted(() => {
      let nameDNILocal = localStorage.getItem('nameDNI');
      if (nameDNILocal == null) localStorage.setItem('nameDNI', 'Anonymous');
      nameDNILocal = localStorage.getItem('nameDNI');
      nameDNI.value = nameDNILocal;
      useApiStoreData.userNameDNI = nameDNILocal;

      const genderDNILocal = localStorage.getItem('genderDNI');
      selectedGender.value = genderDNILocal;
      checkImgProfile();

    })

    return { selectedGender, nameDNI, imgProfile, saveDataDNI, genderChosen };
  }
});
</script>
 

<style scoped>
.userDNIEmotaku {
  position: relative;
}

.userDNITitle {
  color: black;
  padding: 0 0 0 52px;
  text-align: left;
}

.imgProfile {
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50px;
  filter: brightness(70%);
  height: auto;
  width: 95px;
}

.userDNIEmotakuImg {
  background-color: #ff7ecb2e !important;
  background-image: url('../assets/images/userDNI/windowFolder.png');
  background-size: cover;
  display: flex;
  height: 145px;
  margin: 0 auto;
  padding: 5px 2px 10px 2px;
  width: 255px;
}

.DNIContainer {
  width: 100%;
}

.DNIContainerImg {
  padding: 5px;
  width: 50%;
}

.DNIContainerData {
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  width: 50%;
}

.InsideDNIContainer {
  color: black;
  display: flex;
  margin: 7px 0 0 0;
}

.userGender {
  display: flex;
  gap: 7px;
}

.userGender span {
  background-color: #995f75;
  border: 2px solid black;
  cursor: pointer;
  padding: 1px 4px 1px 4px;
  margin: 1px;
  font-size: 13px;
}

.maleUser:hover {
  background-color: rgb(29, 24, 75);
  color: white;
}

.femaleUser:hover {
  background-color: rgb(98, 13, 77);
  color: white;
}

.buttonSaveDNI {
  background-color: #ff7ecb51;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  width: 50%;
}

.buttonSaveDNI:hover {
  background-color: rgb(65, 49, 79);
}

.userGender span.selected {
  background-color: #9df48a;
  color: #000;
}

span.selected:hover {
  background-color: grey;
}

.nameChosen {
  background-color: #574460;
  font-size: 15px;
  width: 80%;
}
</style>
  