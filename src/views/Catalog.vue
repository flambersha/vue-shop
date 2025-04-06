<script setup>
import { ref, computed, watch } from 'vue';
import { useItemStore } from '@/stores/items';
import { useRoute, useRouter } from 'vue-router';
import CategoryCheckBox from '@/components/CategoryCheckBox.vue';
const itemStore = useItemStore();

const route = useRoute();
const router = useRouter();
const searchQuery = ref(route.query.result || null);

//variables for displaying sliced items
const itemsPerPage = 8;
const currentPage = ref(1);

const removeFilter = (filter)=>{
    const index = itemStore.selectedFilters.findIndex(f => f.split(':')[0] == filter.split(":")[0] && f.split(':')[1] == filter.split(":")[1]);
    
    if (index > -1)
    itemStore.selectedFilters.splice(index,1);
}

const filtItems = computed(()=>{
    if(!searchQuery.value) return itemStore.sortedItems;
    return itemStore.sortedItems.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const paginatedItems = computed(()=>{
    const start = (currentPage.value - 1) * itemsPerPage;
    return filtItems.value.slice(start, start + itemsPerPage);
})

const totalPages = computed(()=>Math.ceil(filtItems.value.length / itemsPerPage));

const nextPage = () => {
    if(currentPage.value < totalPages.value)currentPage.value++;
}

const prevPage = () => {
    if(currentPage.value > 1) currentPage.value--;
}


watch(() => route.query.result, (newQuery)=>{
    searchQuery.value = newQuery || "";
    currentPage.value = 1;
})
</script>
<template>
    <div class="flex gap-4 pt-[115px]">
        <div class="hidden lg:flex lg:flex-col border-1 border-gray-200 shadow-sm rounded-md p-4 w-67 gap-3 md:max-h-[650px] md:overflow-y-auto">
            <p class="font-semibold text-[18px] tracking-wide">Filter items</p>
            <!-- <div class="flex flex-col items-center justify-center border-1 border-yellow-500 gap-3 text-[12px]">
                <div class="w-fit">
                    <input type="range" name="" id="">
                </div>
                <div class="flex gap-2">
                    <div class="bg-gray-50 rounded-md px-3">
                        <label for="">From</label>
                        <input type="text" class="w-13 border-1 border-black rounded-sm">
                    </div>
                    <div class="bg-gray-50 rounded-md px-3 ">
                        <label for="">To</label>
                        <input type="text" class="w-13 border-1 border-black rounded-sm">
                    </div>
                </div>
                <div class="w-fit">
                    <button type="submit" class="cursor-pointer px-3 py-1 bg-yellow-400 rounded-[15px]">Apply</button>
                </div>
            </div> -->
            <CategoryCheckBox
                v-for="(values, category) in itemStore.sortedCategories"
                :key="category"
                :category="category"
                :items="values"/>
        </div>
        <div class="flex flex-col w-full md:pl-4">
            <div v-show="searchQuery" class="text-sm mb-3">
                Search results for: <strong>{{ searchQuery }}</strong>
                <button @click="router.push('/catalog')" class="ml-2 px-3 py-1 rounded-md text-red-500 cursor-pointer hover:bg-gray-100/20">Clear Search</button>
            </div>
            <div class="flex flex-col gap-3 md:flex-row justify-between">
                <p>Showing <strong>{{paginatedItems.length}}</strong> results of <strong>{{filtItems.length}}</strong></p>
                <div class="flex gap-3 items-center">
                    <label for="">Sort by:</label>
                    <select class="bg-(--rounded-elements) outline-0 rounded-[15px] px-2 py-1 text-[11px] md:text-[14px]" name="" v-model="itemStore.sortPrice">
                        <option value="" selected>No sort</option>
                        <option value="ascending">Low To High</option>
                        <option value="descending">High to Low</option>
                    </select>
              
                </div>
            </div>
            <div class="flex mt-6 gap-2 items-center mb-3 min-h-[40px]">
                <div class="text-[14px] whitespace-nowrap text-(--secondary-text)">Applied filters:</div> 
                <div v-if="itemStore.selectedFilters.length > 0" class="flex gap-2 flex-wrap">
                    <button v-for="filter in itemStore.selectedFilters" @click="removeFilter(filter)" class="hover:bg-yellow-100/50 rounded-full border-2 border-yellow-400 px-3 py-1 cursor-pointer text-[15px]">{{ filter.replace(':', ' ') }}  <i class="fa-solid fa-xmark text-[11px] pl-[5px]"></i></button>
                </div>
                <div class="text-[14px] text-(--secondary-blurred-text)" v-else>none</div>
            </div>
            <div v-if="paginatedItems.length === 0" class="flex justify-center items-center mt-5">
                <div class="text-center">
                    No items to show.
                    <img src="/Blank canvas-cuate.svg" alt="picture" aria-hidden="true" class="w-90">
                    <a href="https://storyset.com/home">Home illustrations by Storyset</a>
                </div>
                
            </div>
            <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5 place-items-center md:place-items-start ">
    <div v-for="item in paginatedItems" :key="item.id" class="flex flex-col relative w-[230px] max-h-[372px] gap-3 rounded-[18px] bg-(--card-bg) hover:bg-(--card-hover) transition duration-300">
        <div v-if="item.discount && item.discount > 0" class="absolute font-semibold bg-red-600 text-white px-2 py-1 z-1 -left-3 top-3 text-sm rounded-2xl">-{{item.discount}}%</div>
        <RouterLink :to="`/item/${item.id}`" class="flex flex-col relative gap-2">
            <img class="rounded-t-[18px] h-70 w-full text-center mx-auto" :src="item.img[0]" :alt="'photo of ' + item.name">
            <div class="flex justify-between px-3 pb-3">
            <div :class="item.available === 0 ? 'text-(--stock)' : 'text-(--main-text)'" class="flex flex-col justify-between gap-2">
                <p class="font-bold text-[16px] uppercase h-[48px] w-37 line-clamp-2">{{ item.name }}</p>
                <div v-if="item.available !== 0">
            <div v-if="item.categories.color" class="flex flex-row gap-2">
                    <span v-for="color in item.categories.color" class="border-1 border-(--color-border) h-4 w-4 rounded-full" :style="{ backgroundColor: color.split(':')[1] }"></span>
                </div>
            </div>
            <div v-else class="text-xs text-(--stock)">Out Of Stock</div>
            </div>
            <div class="flex flex-col" v-if="item.available !== 0">
                    <p v-if="item.discount && item.discount > 0" class="text-sm font-semibold mb-2">${{ itemStore.getNewPrice(item.price, item.discount) }}</p>
                    <p :class="item.discount && item.discount > 0 ? 'line-through text-xs text-(--stock)' : 'text-sm font-semibold'">${{ item.price }}</p>
                </div>
                <div v-else>
                    <p class="text-(--stock) text-sm font-semibold">${{ item.price }}</p>
                </div>
            </div>
            
        </RouterLink>
        <button @click="itemStore.addWish(item.id)" class="rounded-md hover:bg-yellow-100/50 bg-gray-100/50 absolute right-3 top-3 cursor-pointer w-6 h-6 flex items-center justify-center">
            <i :class="itemStore.wishlist.includes(item.id) ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart text-black'"></i>
        </button>
    </div>
</div>

<div v-show="paginatedItems.length !== 0" class="flex justify-center items-center gap-4 mt-4">
    <button @click="prevPage" class="px-3 py-1 bg-yellow-400 text-black rounded-md cursor-pointer disabled:opacity-50" :disabled="currentPage === 1"><i class="fa-solid fa-backward"></i></button>
   <span>{{ currentPage }} of {{ totalPages }}</span>
   <button @click="nextPage" class="px-3 py-1 bg-yellow-400 text-black rounded-md cursor-pointer disabled:opacity-50" :disabled="currentPage === totalPages"><i class="fa-solid fa-forward"></i></button>
</div>
          
        </div>
    </div>
</template>