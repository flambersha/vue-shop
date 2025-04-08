<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Alert from './components/Alert.vue';
</script>

<template>
  <div class="flex flex-col font-[Inter] ">
    <Navbar />
    <div class="flex-1 w-full px-[16px] md:px-[80px] lg:px-[120px]">
      <div class="max-w-7xl mx-auto min-h-screen">
        <RouterView />
        <Alert/>
      </div>
    </div>
    <Footer />
  </div>
</template>


<style scoped>

</style>
