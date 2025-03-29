<script setup>
import { useOrderStore } from '@/stores/orders';
import OrderTableRow from '../OrderTableRow.vue';
    const orderStore = useOrderStore();

</script>
<template>
    <div class="pl-0 md:pl-5 flex flex-col w-full">
        <form action="">
            <div class="flex mb-4 justify-center md:justify-start">
                <label for="orderFilter"></label>
            <input type="text" name="orderFilter" v-model="orderStore.orderFilter" placeholder="Search orders..." class=" focus:outline-yellow-500 border-1 border-gray-400 w-40 md:w-64 rounded-[10px] px-2 md:py-1 mr-5"/>
            <!-- <button type="submit" class="cursor-pointer text-[13px] md:text-[16px] bg-black text-white rounded-[7px] px-2 py-1 md:px-5 md:py-2 text-center">Search</button> -->
            </div>
        </form>
        <div class="md:h-120 md:overflow-y-auto" role="list">
            <OrderTableRow v-for="(order, index) in orderStore.filteredOrders"
    :key="index"
    :number="index + 1"
    :desc="order.item.name"
    :date="order.timestamp"
    :status="order.status"
    :amount="order.item.price"
    :img="order.item.img"
    :quantity="order.quantity"
    :options="order.options"
    />
        </div>
    </div>
</template>