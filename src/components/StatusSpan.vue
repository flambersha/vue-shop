<script setup>
import { computed } from 'vue';

const props = defineProps({
    status:String
})
const statusClasses = computed(()=>{
    const statusMap = {
        finished: "bg-green-100 text-green-800",
        shipped:"bg-emerald-100 text-emerald-800",
        shipping: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
        canceled: "bg-gray-200 text-gray-800",
    }
    return statusMap[props.status?.toLowerCase()] || "bg-blue-100 text-blue-800";
})
</script>
<template>
 <span :class="`text-xs text-center font-medium px-2.5 py-0.5 rounded-sm ${statusClasses}`">
    {{ props.status }}
  </span>
</template>