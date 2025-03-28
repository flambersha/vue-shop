<script setup>
    import { useItemStore } from '@/stores/items';
    import { ref } from 'vue';
const itemsStore = useItemStore();
const quantity = ref(1);
const isCartOpen = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const closeCart = () => {
  isCartOpen.value = false;
};
</script>
<template>
    <div v-if="isCartOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
    <div class="bg-white w-full max-w-md h-full overflow-y-auto p-6 shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h1 class="font-bold text-[35px]">Cart</h1>
        <button @click="closeCart" class="text-gray-500 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <p>You have {{ itemsStore.cartValues.length }} items in your cart</p>
      
      <div v-if="itemsStore.cartValues.length === 0" class="text-center py-8">
        Your cart is empty
      </div>
      
      <div v-else>
        <div v-for="(cartItem, index) in itemsStore.cartValues" :key="index" 
             class="flex w-full justify-between items-center text-center border-2 border-gray-200 rounded-md p-4 text-[12px] md:text-[14px] cursor-pointer mb-2 gap-2">
          <div class="font-bold"> {{ index + 1 }} </div>
          <img :src="cartItem[0].img[0]" class="h-10 w-10" :alt="'Photo of ' + cartItem[0].name"/>
          <div>{{ cartItem[0].name }}</div>
          <div>${{ cartItem[0].price }}</div>
          <input type="number" v-model="quantity" min="1" class="rounded-md w-15 outline-yellow-400 border-2 border-yellow-400 px-2">
          <button class="bg-black text-white rounded-[7px] px-7 text-center cursor-pointer">Buy</button>
        </div>
      </div>
    </div>
  </div>
    <!-- <div class="flex flex-col">
        <h1 class="font-bold text-[35px]">Cart</h1>
        <p>You have {{ itemsStore.cartValues.length }} items in your cart</p>
        <div v-for="(cartItem, index) in itemsStore.cartValues" :key="index" class="flex w-full justify-between items-center text-center border-2 border-gray-200 rounded-md p-4 text-[12px] md:text-[14px] cursor-pointer mb-2 gap-2">
            <div class="font-bold"> {{ index + 1 }}  </div>
            <img :src="cartItem[0].img[0]" class="h-10 w-10" :alt="'Photo of ' + cartItem[0].name"/>
            <div>{{ cartItem[0].name }}</div>
            <div>${{ cartItem[0].price }}</div>
            <input type="number" :value="quantity" class="rounded-md w-15 outline-yellow-400 border-2 border-yellow-400 px-2">
            <button class="bg-black text-white rounded-[7px] px-7 text-center cursor-pointer">Buy</button>
        </div>
    </div> -->
</template>