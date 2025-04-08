import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlert = defineStore("alerts", ()=>{
    const alertMessage = ref("");
const isVisible = ref(false);
const triggerAlert = (message, duration = 3000) => {
  console.log("heeere");
    alertMessage.value = message;
    isVisible.value = true;
    setTimeout(() => {
      isVisible.value = false;
    }, duration);
  };

  return {
    alertMessage,
    isVisible,
    triggerAlert,
  };
})