import {defineStore} from "pinia";
import { useStorage } from '@vueuse/core';

export let useChallengesStore = defineStore('pg', {
  state: () => ({
    pg_file: useStorage("pg_object", {
      "name": "Ludith",
      "class": "Archer",
      "race": "Human",
      "attributes": {
        "Strength": 3,
        "Agility": 7,
        "Endurance": 4,
        "Intellect": 6,
        "Charisma": 5,
        "Willpower": 5,
        "Perception": 4,
        "Beyond": 5
      },
      "inventory":[
        {
          "name": "Gambesone",
          "equipped": true,
          "AC_mod": 4,
          "quantity": 1
        },
        {
          "name": "Longbow",
          "equipped": true,
          "quantity": 1
        },
        {
          "name": "Arrow",
          "equipped": true,
          "quantity": 30
        },
        {
          "name": "Lemon tree",
          "equipped": false,
          "quantity": 1
        },
        {
          "name": "Rations",
          "equipped": false,
          "quantity": 20
        }
      ],
      "abilities": [
        {
          "name": "Deadly shot",
          "cost": 30,
          "description": "Who read this are hit by an arrow."
        }
      ]
    })
  }),
  getters: {
    unequippedItems() {
      return this.pg_file.inventory.filter(a => ! a.equipped);
    },
    equippedItems() {
      return this.pg_file.inventory.filter(a => a.equipped);
    },
    maximumHp() {
      return (this.pg_file.attributes.Endurance+this.pg_file.attributes.Strength+this.pg_file.attributes.Agility)*5
    },
    maximumEnergy() {
      return (this.pg_file.attributes.Endurance+this.pg_file.attributes.Strength+this.pg_file.attributes.Willpower+this.pg_file.attributes.Intellect)*5
    },
    AC() {
      return (this.pg_file.attributes.Agility+this.pg_file.attributes.Beyond)/2+this.pg_file.inventory.filter(a => a.equipped && a.AC_mod).reduce((sum, item) => sum +item.AC_mod, 0)
    }
  }
})