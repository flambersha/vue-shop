<script setup>
defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'Alert'
    }
}
)
</script>
<template>
    <Transition name="fade">
        <div 
      v-if="visible" 
      class="px-4 py-3 w-64 rounded-xl bg-gray-100 border-1 border-gray-500 text-gray-700
      ]" 
      role="alert"
    >
      <p class="font-bold">{{ message }}</p>
    </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>