<script setup>
import { useItemStore } from '@/stores/items';
import { ref, computed } from 'vue';
    const itemStore = useItemStore();

    defineProps({
        category:String,
        items: Array
    });
    const isOpen = ref(true);
    const toggleCategory = () => {isOpen.value = !isOpen.value}

</script>
<template>
    <div class="flex flex-col border-b-1 border-b-gray-300 gap-3 pb-3 flex-wrap">
                <button @click="toggleCategory" class="capitalize cursor-pointer bg-(--rounded-elements) rounded-[15px] px-3 py-1">{{ category }}
                     <i :class="['fa-solid text-[10px]', isOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i></button>
                <div v-if="isOpen" :class="category == 'color' ? `flex flex-wrap`:`grid grid-cols-2 gap-2`">
                    <div v-for="item in items" :key="item" class="flex gap-2">
                        <label v-if="category !== 'color'" class="hover:bg-(--rounded-elements) rounded-[5px] p-[5px] text-[12px] flex gap-1 items-center cursor-pointer">
                            <input type="checkbox" :value="`${category}:${item}`" v-model="itemStore.selectedFilters" class="accent-yellow-500"  />
                            {{ item }}                           
                        </label>
                        <label v-else class="hover:bg-(--rounded-elements) rounded-[5px] p-[5px] text-[12px] flex gap-1 items-center cursor-pointer">
                            <input type="checkbox" :value="`${category}:${item.split(':')[0]}`" v-model="itemStore.selectedFilters" class="appearance-none"  />
                            
                            <span class="border-1 border-(--color-border) h-4 w-4 rounded-full" :style="{backgroundColor: item.split(':')[1] }"></span>
                        </label>
                    </div>
                </div>
            </div>
</template>