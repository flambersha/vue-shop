import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useAlert } from "./alerts";

export const useOrderStore = defineStore("orders", () => {
  const alertStore = useAlert();
  const orders = ref([]);

  //filtering orders
  const orderFilter = ref("");
  const filteredOrders = computed(() => {
    if (!orderFilter.value) return orders.value;
    return orders.value.filter(
      (order) => {
        const input = orderFilter.value.toLowerCase();
        return(
            order.item.name.toLowerCase().includes(input) || order.status.toLowerCase().includes(input) || order.timestamp.toLowerCase().includes(input)
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
      timestamp: new Date().toUTCString().split(' ').slice(0, 4).join(" "),
      status: 'created'
    });
  orders.value.push(newOrder);
  alertStore.triggerAlert("Order is created");
  return newOrder.id;
  }

  return {orders, filteredOrders, orderFilter, createOrder};
});
