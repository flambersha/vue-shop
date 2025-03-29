<script setup>
  import { ref} from 'vue';
  
  const props = defineProps({
    showModal: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  });
  
  const emit = defineEmits(['close', 'confirm']);
  
  const quantity = ref(1);
  
  function closeModal() {
    emit('close');
  }
  
  function confirmOrder() {
    emit('confirm', {
      item: props.item,
      options: props.options,
      quantity: quantity.value
    });
  }
  
  function updateQuantity(change) {
    const newValue = quantity.value + change;
    if (newValue >= 1 && newValue <= 99) {
      quantity.value = newValue;
    }
  }
  
  function getTotalPrice() {
    return props.item?.price ? props.item.price * quantity.value : 0;
  }
  
  function formatPrice(price) {
    return price ? `$${price.toFixed(2)}` : '$0.00';
  }
  </script>
<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
     
      <div @click="closeModal" class="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      <!-- Modal content -->
      <div class="relative z-10 w-full max-w-md bg-(--cart-bg) rounded-lg shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="p-4 border-b">
          <h3 class="text-lg font-medium text-(--main-text)">Confirm Your Order</h3>
          <button @click="closeModal" class="absolute top-4 right-4 cursor-pointer text-(--color-border) hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Product info -->
        <div class="p-4 border-b">
          <div class="flex items-start">
            <div class="h-16 w-16 flex-shrink-0 bg-(--rounded-elements) rounded-md overflow-hidden">
              <img v-if="item?.img" :src="item.img[0]" :alt="item.name" class="h-full w-full object-cover" />
              <div v-else class="h-full w-full flex items-center justify-center text-(--secondary-text)">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <h4 class="text-base font-medium">{{ item?.name }}</h4>
              <p class="mt-1 text-sm text-(--secondary-text)">{{ formatPrice(item?.price) }}</p>
              
              <!-- Selected options -->
              <div v-if="options && Object.keys(options).length" class="mt-2">
                <p class="text-xs font-medium">Selected options:</p>
                <ul class="mt-1 space-y-1">
                  <li v-for="(value, key) in options" :key="key" class="text-xs text-(--secondary-blurred-text)">
                    {{ key }}: {{ key === 'color' ? value.split(':')[0] : value }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Quantity selector -->
        <div class="p-4">
          <label for="quantity" class="block text-sm font-medium text-(--secondary-text)">Quantity</label>
          <div class="mt-1 flex items-center">
            <button 
              @click="updateQuantity(-1)" 
              class="p-2 rounded-l border border-r-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
              :disabled="quantity <= 1"
              :class="{'opacity-50 cursor-not-allowed': quantity <= 1}"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
            </button>
            <input 
              type="number" 
              id="quantity" 
              v-model="quantity" 
              min="1" 
              max="99"
              class="p-2 w-16 text-center border-y border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" 
            />
            <button 
              @click="updateQuantity(1)" 
              class="p-2 rounded-r border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Total price -->
        <div class="p-4 bg-(--cart-bg)">
          <div class="flex justify-between">
            <span class="text-base font-medium text-(--secondary-text)">Total:</span>
            <span class="text-base font-medium text-(--secondary-text)">{{ formatPrice(getTotalPrice()) }}</span>
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="p-4 flex space-x-3 border-t">
          <button 
            @click="confirmOrder" 
            class="cursor-pointer flex-1 bg-white text-gray-700 rounded-md py-2 text-sm font-medium shadow-sm focus:outline-none"
          >
            Proceed to Checkout
          </button>
          <button 
            @click="closeModal" 
            class="cursor-pointer flex-1 bg-black text-white rounded-md py-2 text-sm font-medium border border-gray-300 shadow-sm focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </template>