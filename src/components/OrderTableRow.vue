<script setup>
import StatusSpan from './StatusSpan.vue';
import { ref } from 'vue';
    const props = defineProps(['number','desc', 'date', 'status', 'amount', 'quantity', 'img', 'options']);

    const orderDetails = ref(false);
</script>

<template>
    <div @click="orderDetails = !orderDetails" class="flex w-full justify-between items-center text-center border-1 border-(--color-border) rounded-md p-4 text-[13px] md:text-[15px] cursor-pointer mt-2 gap-2">
                <div class="w-8">
                {{ props.number }}
                </div>
                <img :src="props.img[0]" class="w-12 h-12" :alt="'photo of order:' + props.desc">
                <div class="w-23 md:w-40 truncate">
                   {{  props.desc }}
                </div>
                <div class="w-19 hidden md:block">
                    {{ props.date }}
                </div> 
                <div class="w-20">
                   <StatusSpan :status="props.status"/>
                </div>
                <div class="hidden md:block">
                    ${{ props.amount * props.quantity }}
                </div>
                <div>
                    <i :class=" !orderDetails ? `fa-solid fa-chevron-down` :`fa-solid fa-chevron-up` "></i>
                </div>
    </div>
    <div v-show="orderDetails" class="flex flex-wrap justify-between items-center p-4 text-[13px] md:text-[15px] mt-3 gap-8">
            <div class="flex gap-5 items-center">
                <img :src="props.img[0]" class="w-18 h-22" :alt="'photo of order:' + props.desc">
            <div class="flex flex-col gap-1">
                <p class="font-bold">{{ props.desc }}</p> 
           
           <p>ordered on <span class="font-semibold">{{ props.date }}</span></p>
            </div>
            <div>
                <p class="text-sm font-medium pb-1">Selected options:</p>
                <ul>
                    <li v-for="(value, key) in props.options" :key="key">
                        <span class="italic">{{ key }}:</span> {{ key === 'color' ? value.split(':')[0] : value }}
                    </li>
                </ul>
            </div>
            </div>

        <p>{{ props.quantity }} × ${{ props.amount }} </p>
           <p>total of ${{ props.quantity * props.amount }}</p>
           <p class="font-bold">status: {{ props.status }}</p>
           
        
        <div class="flex flex-col gap-2"><button v-if="props.status !== 'canceled'" class="px-3 py-1 rounded-md cursor-pointer bg-red-300 text-black">Cancel</button>
            <button v-if="props.status !== 'canceled'" class="px-3 py-1 rounded-md cursor-pointer bg-green-300 text-black">Repeat</button></div>
    </div>
</template>