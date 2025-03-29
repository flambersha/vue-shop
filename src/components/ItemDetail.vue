<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useItemStore } from '@/stores/items';
import { useOrderStore } from '@/stores/orders';
import { ref, computed, onMounted } from 'vue';
import BuyNowModal from './BuyNowModal.vue';
const itemsStore = useItemStore();
const orderStore = useOrderStore();
const route = useRoute();
const router = useRouter();
const foundItem = itemsStore.products.find(item => item.id == route.params.id);
if (!foundItem) {
  router.replace("/not-found");
}
const selectedOptions = ref({});//options for order making

const selectOption = (category, value) => {
  selectedOptions.value = {...selectedOptions.value, [category]:value}
}

 //default values for order
onMounted(() => {
  Object.entries(foundItem.categories).forEach(([category, values]) => {
    if(!itemsStore.hiddenCategories.includes(category)){
      if (values && values.length > 0)
          selectOption(category, values[0])
  }
  })
})

const displayableCategories = computed(() => {
  if (!foundItem.categories) return {}
  
  const result = {}
  for (const [category, value] of Object.entries(foundItem.categories)){
    if(!itemsStore.hiddenCategories.includes(category))
      result[category] = value;
  }

  return result;
})

const showBuyNowModal = ref(false)

// This function is called when the "Buy Now" button is clicked
function handleBuyNowClick() {
  showBuyNowModal.value = true
}

// This function is called when the user confirms the order in the modal
function handleConfirmOrder(orderDetails) {
  const { item, options, quantity } = orderDetails
  const orderId = orderStore.createOrder(item, options, quantity)
  
  // Close modal
  showBuyNowModal.value = false
  
  // Navigate to checkout
  router.push({ name: 'checkout', params: { id: orderId } })
}

// This function is called when the user closes the modal
function handleCloseModal() {
  showBuyNowModal.value = false
}

</script>
<template>
       <!-- <div class="bg-green-100 border-1 border-green-500 text-green-700 px-4 py-3 w-64 rounded-xl" role="alert">
  <p class="font-bold">Wishlist modified</p>
</div> -->
    <div class="flex flex-col md:flex-row gap-5 w-full pt-[115px]">
      <div class="w-full md:w-1/2 bg-yellow-100 flex items-center justify-center">
        <img :src="foundItem.img[0]" :alt="foundItem.name" class="h-80 w-70">
      </div>
      <div class="w-full md:w-1/2 flex flex-col gap-5">
        <div class="flex justify-between">
            <h1 class="font-bold text-xl uppercase">{{ foundItem.name }}</h1>
            <button @click="itemsStore.addWish(foundItem.id)" class="rounded-md hover:bg-(--card-hover) cursor-pointer w-8 h-8 flex items-center justify-center">
            <i :class="itemsStore.wishlist.includes(foundItem.id) ? 'fa-solid fa-heart text-red-500 text-lg' : 'fa-regular fa-heart text-(--main-text) text-lg'"></i>
        </button>
      </div>
        
        <p class="font-semibold">${{ foundItem.price }}</p>
        <div>
          <h3 class="font-semibold">Description</h3>
        <p class="text-[15px]">{{ foundItem.desc }}</p>
        <RouterLink :to="`/user/data`" >go to user data</RouterLink>
        </div>
       
        <div v-for="(values, categoryName) in displayableCategories" :key="categoryName" class="flex flex-col mb-4">
          <p class="capitalize text-(--c-name)">
            {{ categoryName }}: 
            <span class="font-semibold text-(--button-bg)">
              {{ selectedOptions[categoryName]
              ? (categoryName === 'color' ? selectedOptions[categoryName].split(':')[0] : selectedOptions[categoryName]) 
              : 'Select an option' }}
            </span>
          </p>
  <div class="flex gap-2">
    <button 
      v-for="value in values" 
      :key="value"
      @click="selectOption(categoryName, value)"
      class="text-[11px] cursor-pointer border-2 h-8 w-14 px-2 rounded-[5px] transition-all"
      :class="selectedOptions[categoryName] === value ? 'border-yellow-400 bg-yellow-100/50' : 'border-gray-300'"
      :style="{ backgroundColor: categoryName == 'color' ? value.split(':')[1] : null }">
      {{ categoryName == 'color'? '' : value }}
    </button>
  </div>
</div>
<div class="flex h-10 gap-3">
  <button @click="itemsStore.addToCart(foundItem, selectedOptions)" class= "border-1 border-(--button-bg) bg-black text-white shadow-lg rounded-[7px] px-7 text-center w-48 cursor-pointer">Add To Cart</button>
  <button @click="handleBuyNowClick" class="bg-white text-black shadow-lg rounded-[7px] text-center w-32 cursor-pointer border-2 border-(--button-bg)">Buy now</button>
</div>

<BuyNowModal
    :showModal="showBuyNowModal"
    :item="foundItem"
    :options="selectedOptions"
    @close="handleCloseModal"
    @confirm="handleConfirmOrder"
  />

      </div>
    </div>
</template>