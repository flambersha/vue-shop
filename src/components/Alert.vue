<script setup>
import { useAlert } from '@/stores/alerts';

const alertStore = useAlert();
</script>
<template>
    <Transition name="slide-up">
      <!-- ALERT -->
        <div 
      v-if="alertStore.isVisible" 
      class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 w-64 rounded-xl bg-gray-100 border-1 border-gray-500 text-gray-700" 
      role="alert">
      <p class="font-bold">{{ alertStore.alertMessage }}</p>
    </div>
    </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>