<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orders'

const route = useRoute()
const orderStore = useOrderStore()
const order = ref(null)

onMounted(() => {
  const orderId = parseInt(route.params.id)
  order.value = orderStore.orders.find(o => o.id === orderId)
})
</script>

<template>
  <div class="pt-[115px] text-(--main-text)">
    <div v-if="order">
    <h1 class="font-bold text-[35px]">Checkout</h1>
    <div class="flex flex-col gap-6">Order ID: {{ order.id }}
      <p>Payment processing</p>
      <RouterLink :to="`/catalog`" class="text-(--link-text)">Go back to catalog</RouterLink>
    </div>
    
  </div>
  <div v-else>
    <p>Order not found</p>
  </div>
  </div>
 
</template>