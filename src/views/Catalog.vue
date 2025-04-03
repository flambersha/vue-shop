<script setup>
import { ref, computed } from 'vue';
import { useItemStore } from '@/stores/items';
import { useRoute } from 'vue-router';
import CategoryCheckBox from '@/components/CategoryCheckBox.vue';
const itemStore = useItemStore();

const route = useRoute();
const searchTerm = ref(route.query.result || null);

const removeFilter = (filter)=>{
    const index = itemStore.selectedFilters.findIndex(f => f.category == filter.category && f.item == filter.item);
    if (index > -1)
    itemStore.selectedFilters.splice(index,1);
}
</script>
<template>
    <div class="flex gap-4 pt-[115px]">
        <div class="hidden lg:flex lg:flex-col border-1 border-gray-200 shadow-sm rounded-md p-4 w-67 gap-3 h-[600px] overflow-y-auto">
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
        <div class="flex flex-col w-full pt-4 pl-4">
            <div v-show="searchTerm">lalalalal</div>
            <div class="flex flex-col gap-3 md:flex-row justify-between">
                <p>Showing <strong>{{itemStore.filteredItems.length}}</strong> results of <strong>{{itemStore.products.length}}</strong></p>
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
            <div class="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
    <div v-for="item in itemStore.sortedItems" :key="item.id" class="flex flex-col relative w-[230px] p-3 gap-3 rounded-[18px] bg-(--card-bg) hover:bg-(--card-hover) transition duration-300">
        <div v-if="item.discount && item.discount > 0" class="absolute bg-red-600 text-white px-2 py-1 z-1 -left-3 top-3 text-sm rounded-2xl">-{{item.discount}}%</div>
        <RouterLink :to="`/item/${item.id}`" class="flex flex-col relative gap-2">
            <img class="rounded-[18px] h-50 w-fit mx-auto mb-3" :src="item.img[0]" :alt="item.name">
            <div class="flex justify-between">
            <div :class="item.available === 0 ? 'text-(--stock)' : 'text-(--main-text)'" class="flex flex-col gap-1">
                <p class="font-bold text-[16px] uppercase">{{ item.name }}</p>
                <div v-if="item.available !== 0">
            <div v-if="item.categories.color" class="flex flex-row gap-2">
                    <span v-for="color in item.categories.color" class="border-1 border-(--color-border) h-4 w-4 rounded-full" :style="{ backgroundColor: color.split(':')[1] }"></span>
                </div>
            </div>
            <div v-else class="text-xs text-(--stock)">Out Of Stock</div>
            </div>
            <div class="flex flex-col justify-between">
                    <p v-if="item.discount && item.discount > 0" :class="item.available !== 0 ? 'text-(--main-text)':'text-(--stock)'" class="text-sm font-semibold inline-flex">${{ itemStore.getNewPrice(item.price, item.discount) }}</p>
                    <p class="inline-flex" :class="item.discount && item.discount > 0 ? 'line-through text-xs text-(--stock)' : 'text-sm font-semibold'">${{ item.price }}</p>
                </div>
            </div>
            
        </RouterLink>
        <button @click="itemStore.addWish(item.id)" class="rounded-md hover:bg-gray-100 absolute right-3 top-3 cursor-pointer w-6 h-6 flex items-center justify-center">
            <i :class="itemStore.wishlist.includes(item.id) ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart text-gray-700'"></i>
        </button>
    </div>
</div>
          
        </div>
    </div>
</template>