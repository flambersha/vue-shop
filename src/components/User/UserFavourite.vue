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
        
        <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 place-items-center md:place-items-start md:h-120 md:overflow-y-auto">
        <div v-for="wish in wishes" :key="wish.id" class="flex flex-col relative w-[240px] max-h-[372px] gap-3 rounded-[18px] bg-(--card-bg) hover:bg-(--card-hover) transition duration-300">
            <RouterLink :to="`/item/${wish.id}`" class="flex flex-col relative gap-2">
                <div v-if="wish.discount && wish.discount > 0" class="absolute font-semibold bg-red-600 text-white px-2 py-1 z-1 -left-3 top-3 text-sm rounded-2xl">-{{wish.discount}}%</div>
                <img class="rounded-t-[18px] h-70 w-full text-center mx-auto" :src="wish.img[0]" :alt="'photo of ' + wish.name">
            <div class="flex justify-between px-3 pb-3">
            <div :class="wish.available === 0 ? 'text-(--stock)' : 'text-(--main-text)'" class="flex flex-col justify-between gap-2">
                <p class="font-bold text-[16px] uppercase h-[48px] w-37 line-clamp-2">{{ wish.name }}</p>
                <div v-if="wish.available !== 0">
            <div v-if="wish.categories.color" class="flex flex-row gap-2">
                    <span v-for="color in wish.categories.color" class="border-1 border-(--color-border) h-4 w-4 rounded-full" :style="{ backgroundColor: color.split(':')[1] }"></span>
                </div>
            </div>
            <div v-else class="text-xs text-(--stock)">Out Of Stock</div>
            </div>
            <div class="flex flex-col" v-if="wish.available !== 0">
                    <p v-if="wish.discount && wish.discount > 0" class="text-sm font-semibold mb-2">${{ itemStore.getNewPrice(wish.price, wish.discount) }}</p>
                    <p :class="wish.discount && wish.discount > 0 ? 'line-through text-xs text-(--stock)' : 'text-sm font-semibold'">${{ wish.price }}</p>
                </div>
                <div v-else>
                    <p class="text-(--stock) text-sm font-semibold">${{ wish.price }}</p>
                </div>
            </div>
        </RouterLink>
        <button @click="itemStore.addWish(wish.id)" class="rounded-md hover:bg-gray-100 absolute right-3 top-3 cursor-pointer w-6 h-6 flex items-center justify-center">
            <i :class="itemStore.wishlist.includes(wish.id) ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart text-gray-700'"></i>
        </button>
        </div>
        </div>
    
    </div>
</template>