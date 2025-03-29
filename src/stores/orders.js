import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("orders", () => {
  const orders = ref([
    // {
    //   date: new Date().toLocaleDateString(),
    //   desc: "Tennis Shorts",
    //   status: "error",
    //   amount: 21.0,
    //   quantity: 2,
    //   img:'https://tommy-europe.scene7.com/is/image/TommyEurope/DW0DW18610_THA_main?$b2c_updp_m_mainImage_1920$',
    // },
    // {
    //   date: new Date().toLocaleDateString(),
    //   desc: "Parka",
    //   status: "shipping",
    //   amount: 21.0,
    //   quantity: 1,
    //   img:'',
    // },
    //   {
    //     date: new Date().toLocaleDateString(),
    //     desc: "Parka",
    //     status: "canceled",
    //     amount: 21.0,
    //     quantity: 1,
    //     img:'',
    //   },
  ]);
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
