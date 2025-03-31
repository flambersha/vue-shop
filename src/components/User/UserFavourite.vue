<script setup>
import { ref } from 'vue';
import { useItemStore } from '@/stores/items';
const itemStore = useItemStore();

const wishes = ref([]);
wishes.value = itemStore.products.filter(product => itemStore.wishlist.includes(product.id));

</script>
<template>
    <div class="pl-0 md:pl-5 flex flex-col w-full">
        <!-- <form action="">
            <div class="flex mb-4 justify-center md:justify-start">
                <label for="wishFilter"></label>
            <input type="text" name="wishFilter" placeholder="Search wishes..." class=" focus:outline-yellow-500 border-1 border-gray-400 w-40 md:w-64 rounded-[10px] px-2 md:py-1 mr-5"/>
            </div>
        </form> -->
        
        <div class="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5 items-start justify-center">
        <div v-for="wish in wishes" :key="wish.id" class="flex flex-col relative w-[230px] p-3 gap-3 rounded-[18px] bg-(--card-bg) hover:bg-(--card-hover) transition duration-300">
            <RouterLink :to="`/item/${wish.id}`" class="flex flex-col relative gap-2">
            <img class="rounded-[18px] h-50 w-fit mx-auto mb-3" :src="wish.img[0]" :alt="wish.name">
            <div class="flex justify-between items-center">
                <p class="font-bold text-[16px] uppercase">{{ wish.name }}</p>
                <p class="text-sm font-semibold">${{ wish.price }}</p>
            </div>
            <div v-if="wish.categories.color" class="flex flex-row gap-2">
                <span v-for="color in wish.categories.color" class="border-1 border-gray-300 h-4 w-4 rounded-full" :style="{ backgroundColor: color.split(':')[1] }"></span>
            </div>
        </RouterLink>
        <button @click="itemStore.addWish(wish.id)" class="rounded-md hover:bg-gray-100 absolute right-3 top-3 cursor-pointer w-6 h-6 flex items-center justify-center">
            <i :class="itemStore.wishlist.includes(wish.id) ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart text-gray-700'"></i>
        </button>
        </div>
        </div>
    
    </div>
</template>