import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("orders", () => {
  const orders = ref([]);
  const orderFilter = ref("");
  const filteredOrders = computed(() => {
    if (!orderFilter.value) return orders.value;
    return orders.value.filter(
      (order) => {
        const input = orderFilter.value.toLowerCase();
        return(
            order.desc.toLowerCase().includes(input) || order.status.toLowerCase().includes(input) || order.date.toLowerCase().includes(input)
        );
      }
    );
  });

  const currentOrderId = ref(1);

  const createOrder = (item, options, quantity = 1) =>{
    const newOrder = reactive({
      id:currentOrderId.value++,
      item: {...item},
      options: {...options},
      quantity: quantity,
      timestamp: new Date().toISOString(),
      status: 'created'
    });
  orders.value.push(newOrder);
  return newOrder.id;
  }

  return {orders, filteredOrders, orderFilter, createOrder};
});
