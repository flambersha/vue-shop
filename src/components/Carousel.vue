<script setup>
import {ref, computed} from 'vue';
const props = defineProps({
  foundItem: {
    type: Object,
    required: true
  }
});

const currentIndex = ref(0);
const currentImg = computed(() => {
  return props.foundItem.img[currentIndex.value] || "";
});

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.foundItem.img.length;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.foundItem.img.length) % props.foundItem.img.length;
};
</script>
<template>
    <div class="w-full md:w-1/2 flex flex-col items-center p-4 relative">
      
      <div class="relative w-80 max-w-md flex items-center justify-center h-98">
        <img :src="currentImg" :alt="foundItem.name" loading="lazy" class="h-full w-full object-contain rounded-lg" />
  
        <button
          @click="prev"
          class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 text-black py-6 px-3 rounded-4xl shadow cursor-pointer"
        >
        <i class="fa-solid fa-arrow-left"></i>
        </button>
  
        <button
          @click="next"
          class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 text-black py-6 px-3 rounded-4xl shadow cursor-pointer"
        >
        <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
  
      <div class="hidden md:flex md:gap-2 mt-4 overflow-x-auto max-w-md">
        <img
          v-for="(img, index) in foundItem.img"
          :key="index"
          :src="img"
          @click="currentIndex = index"
          class="h-20 w-20 object-cover rounded-lg cursor-pointer border-2 transition"
          :class="{
            'border-yellow-500': index === currentIndex,
            'border-transparent': index !== currentIndex
          }"
        />
      </div>
    </div>
  </template>
  