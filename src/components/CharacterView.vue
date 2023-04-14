// This is the big internal window, i.e. not title or footer.
// fa prima il render delle liste e poi della immagine
<template>
  <div id="container">
    <div id="manage_button" class="manage_button z-50" v-show="button_flag">
      <button
          class="border rounded px-1 py-px text-xs border-orange-500 text-orange-500"
          v-on:click="change"
      >Gestisci distretti</button>
    </div>
    <div id="control_hide_button" class="control_hide_button z-50" v-show="button_flag">
      <button
          class="border rounded px-1 py-px text-xs border-orange-500 text-orange-500"
          v-on:click="hideOrControl"
      > {{control_flag ? "Nascondi sfide" : "Mostra sfide"}} </button>
    </div>
    <div>
      <DistrictView />
    </div>
    <ControlDistrict
        v-if="control_flag"
        v-bind:chosenDistricts="districts"/>
    <DistrictChoice
        v-bind:tags_obj="districts_name_obj"
        v-on:confirm="choices"
        v-on:reset="reset"
        v-show="choice_district_flag"/>
  </div>
</template>

<script>
import ControlDistrict from "@/components/ControlDistrict.vue";
import DistrictView from "@/components/DistrictView.vue";
import DistrictChoice from "@/components/DistrictChoice.vue";
import {useChallengesStore} from "@/stores/ChallengesStore";
import {mapWritableState} from "pinia";
import { useStorage } from '@vueuse/core';

export default {
  components: {
    DistrictChoice,
    ControlDistrict,
    DistrictView
  },
  data() {
    return {
      button_flag: false,
      control_flag: false,
      choice_district_flag: true,
      districts: [],
      districts_name_obj: useStorage("districts_tags", [
        {
          "name": "centro storico",
          "id": "centro storico",
          "complete": false
        },
        {
          "name": "commerciale",
          "id": "commerciale",
          "complete": false
        },
        {
          "name": "industriale",
          "id": "industriale",
          "complete": false
        },
        {
          "name": "residenziale",
          "id": "residenziale",
          "complete": false
        },
        {
          "name": "scolastico",
          "id": "scolastico",
          "complete": false
        },
      ])
    }
  },
  computed: {
    ...mapWritableState(useChallengesStore, {
      allDistricts: "allDistricts",
    }),
  },
  methods: {
    hideOrControl() {
      this.control_flag = ! this.control_flag
    },
    choices(arr) {
      this.districts = arr
      this.control_flag = true
      this.button_flag = true
      this.choice_district_flag = false
    },
    change() {
      this.districts = this.allDistricts
      this.choice_district_flag = true
      this.button_flag = false
    },
    reset() {
      if(confirm("se confermi tutti i dati di gioco verranno azzerati")) {
        this.districts_name_obj.forEach(i => {
          i.complete = false
        })
        let cleanChallenges = useChallengesStore()
        cleanChallenges.fill(this.allDistricts)
      }
    }
  }
}
// header with title and image in the following
</script>

<style scoped>
.manage_button{
  position: absolute;
  top: 4px;
  right: 16px;
}
.control_hide_button {
  position: absolute;
  top: 4px;
  left: 16px;
}
</style>