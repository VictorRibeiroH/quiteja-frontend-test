<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { provide } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
provide('store', store)
</script>