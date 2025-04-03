<script setup>
import { useItemStore } from '@/stores/items';
import { useOrderStore } from '@/stores/orders';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const isOpen=ref(false);
const router = useRouter();
const currentTheme = ref('light');
const itemsStore = useItemStore();
const orderStore = useOrderStore();
const searchQuery = ref("");

const isMenuOpen=ref(false);
const menuDropdown = ref(null);//md menu

//search input
const submit = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/catalog", query: { result: searchQuery.value.trim() } });
  }
};

//theme
const toggleTheme = () => {
    const setTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', setTheme);
    updateTheme(setTheme);
}
const updateTheme = (theme) => {
    currentTheme.value = theme;
    if(theme === 'dark'){
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }else if (theme==='light'){
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }
}
onMounted(()=>{
    const localStorageTheme = localStorage.getItem('theme');
    if(localStorageTheme)
        updateTheme(localStorageTheme)
    else{
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        updateTheme(prefersDark ? 'dark' : 'light')
    }
    document.addEventListener('click', handleClickOutside);
});

//cart
const quantity = ref(1);
const isCartOpen = ref(false);
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

function buyFromCart(item, options, quantity) {
  const orderId = orderStore.createOrder(item, options, quantity)
  isCartOpen.value = false;
  router.push({ name: 'checkout', params: { id: orderId } });
  itemsStore.removeFromCart(item.id);
}

const handleClickOutside = (event) => {
  if (isMenuOpen.value && menuDropdown.value && !menuDropdown.value.contains(event.target) && event.target.id !== 'menu-button') {
    isMenuOpen.value = false;
  }
};

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<template>
<header class="px-[16px] md:px-[80px] lg:px-[120px] py-4 fixed top-0 left-0 bg-(--bg) w-full z-15 h-[65px] backdrop-blur-xl">
    <nav class="max-w-7xl mx-auto">
        <div class="hidden md:flex flex-row justify-between items-center">
        <RouterLink :to="`/`">
            ShopName
        </RouterLink>
        <div class="flex items-center">
    <!-- Visible on all screens except md -->
    <div class="hidden md:hidden lg:flex lg:gap-8 lg:items-center text-[15px]">
        <RouterLink :to="`/catalog`" class="hover:text-yellow-500 transition duration-200 border-b-2 border-b-transparent" active-class="border-b-2 border-b-yellow-400">Catalog</RouterLink>
        <RouterLink :to="`/about`" class="hover:text-yellow-500 transition duration-200 border-b-2 border-b-transparent" active-class="border-b-2 border-b-yellow-400">About</RouterLink>
        <RouterLink :to="`/contacts`" class="hover:text-yellow-500 transition duration-200 border-b-2 border-b-transparent" active-class="border-b-2 border-b-yellow-400">Contacts</RouterLink>
    </div>
    
    <!-- dropdown visible only on md screens -->
    <div class="relative text-left hidden md:block lg:hidden">
        <div>
            <button type="button" @click="isMenuOpen = !isMenuOpen" class="cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm text-(--main-text) ring-1 shadow-xs ring-yellow-500 ring-inset focus:ring-2" id="menu-button" aria-expanded="true" aria-haspopup="true">
                Menu
                <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <div v-show="isMenuOpen" ref="menuDropdown" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-(--cart-bg) shadow-lg focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1 border-2 border-(--color-border) rounded-md" role="none" >
                <RouterLink :to="`/catalog`" @click="isMenuOpen = !isMenuOpen" class="block px-4 py-2 text-sm text-(--main-text)" role="menuitem" tabindex="-1" id="menu-item-0">Catalog</RouterLink>
                <RouterLink :to="`/about`" @click="isMenuOpen = !isMenuOpen" class="block px-4 py-2 text-sm text-(--main-text)" role="menuitem" tabindex="-1" id="menu-item-1">About</RouterLink>
                <RouterLink :to="`/contacts`" @click="isMenuOpen = !isMenuOpen" class="block px-4 py-2 text-sm text-(--main-text)" role="menuitem" tabindex="-1" id="menu-item-2">Contacts</RouterLink>
            </div>
        </div>
    </div>
    <!-- dropdown end -->
</div>
        
        <div class="flex items-center gap-5 text-[19px]">
            <input @keyup.enter="submit" v-model="searchQuery" class="text-[15px] outline-1 rounded-2xl py-1 px-3 outline-yellow-500 w-35 lg:w-57" type="text" placeholder="Search...">
            <button @click="toggleTheme" class="mx-4 cursor-pointer"><i class="fa-regular fa-moon"></i></button>
            <RouterLink to="notif"><i class="fa-regular fa-bell"></i><span class="sr-only">Notifications</span></RouterLink>
            <div class="relative cursor-pointer" @click="toggleCart">
                <i class="fa-solid fa-cart-shopping"></i>
            <span class="sr-only">Cart</span>
            <div v-show=" itemsStore.cartValues && itemsStore.cartValues.length > 0" class="absolute inline-flex items-center justify-center w-[16px] h-[16px] text-[9px] font-bold text-white bg-red-500 border-1 border-black rounded-full -top-2 -end-2">{{ itemsStore.cartValues.length }}</div>
        
            </div>
           
            <RouterLink to="account"><i class="fa-regular fa-user"></i> <span class="sr-only">Account</span></RouterLink>
        </div>
        </div>

        <!-- toggle btn -->
        <div class="md:hidden flex justify-between text-[15px]">
            <div class="flex items-center">
                <RouterLink :to="`/`">
            Logo
        </RouterLink>
        </div>
        <div class="flex items-center gap-5">
            <input @keyup.enter="submit" class="text-[15px] border-1 w-35 border-gray-300 rounded-2xl py-1 px-3 outline-purple-500" type="text" placeholder="Search...">
            <button class="cursor-pointer" @click="toggleTheme"><i class="fa-regular fa-moon"></i></button>
            <RouterLink to="notif"><i class="fa-regular fa-bell"></i></RouterLink>
        <button @click="isOpen = !isOpen"><i class="fa-solid fa-bars"></i></button>
        </div>
        </div>
        <!-- dropdown -->
         <div v-show="isOpen" class="md:hidden flex flex-col right-0 bg-(--cart-bg) w-60 absolute z-13 p-3 gap-4">
            <RouterLink class=" text-center py-2 px-4 border-1 border-(--color-border) rounded-2xl" @click="isOpen = !isOpen" :to="`/catalog`">Catalog</RouterLink>
            <div @click="toggleCart">Cart {{ itemsStore.cartValues.length }}</div>
            <RouterLink :to="`/account`"  @click="isOpen = !isOpen" >Account</RouterLink>
            <RouterLink :to="`/about`"  @click="isOpen = !isOpen">About</RouterLink>
            <RouterLink :to="`/contacts`" @click="isOpen = !isOpen">Contacts</RouterLink>
         </div>
    </nav>
</header>

<!-- !CART -->
<div v-show="isCartOpen" class="fixed inset-0 bg-black/30 z-40 flex justify-end ">
    <div class="text-(--main-text) bg-(--cart-bg) w-full max-w-md h-full overflow-y-auto p-6 shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h1 class="font-bold text-[35px]">Cart</h1>
        <button @click="toggleCart" class="text-gray-400 hover:text-(--main-text) cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div v-if="itemsStore.cartValues.length === 0" class="text-center py-8">
        Your cart is empty
      </div>
      
      <div v-else>
        <!-- <div v-for="(cartItem, index) in itemsStore.cartValues" :key="index">
          <RouterLink :to="`/item/${cartItem[0].id}`" @click="toggleCart" class="flex flex-wrap w-full justify-between items-center text-center border-2 border-gray-200 rounded-md p-4 text-[12px] md:text-[14px] cursor-pointer mb-2 gap-2">
             <div> {{ index + 1 }} </div>
          <img :src="cartItem[0].img[0]" class="h-10 w-10" :alt="'Photo of ' + cartItem[0].name"/>
          <div class="font-bold">{{ cartItem[0].name }}</div>
          <div>${{ cartItem[0].price }}</div>
          
          <input type="number" min="1" v-model="cartItem[2]" :max="cartItem[0].available" class="rounded-md w-15 outline-yellow-400 border-1 border-yellow-400 px-2 py-1">
          <button @click="buyFromCart(cartItem[0], cartItem[1], cartItem[2])" class="bg-black text-white border-1 border-amber-400 rounded-[7px] px-2 py-1 text-center cursor-pointer">Buy</button>
          <div v-if="cartItem[1]" class="flex gap-3 ml-5">
            <div class="px-2 rounded-xl bg-amber-100" v-for="(value, option) in cartItem[1]">{{ option }} {{ option === 'color' ? value.split(':')[0] : value }}</div>
          </div>
        </RouterLink>
        </div> -->
        <div v-for="(cartItem, index) in itemsStore.cartValues" :key="index" 
     class="flex flex-wrap w-full justify-between items-center text-center border-2 border-gray-200 rounded-md p-4 text-[12px] md:text-[14px] cursor-pointer mb-2 gap-2">

    <div @click="toggleCart">
        <RouterLink :to="`/item/${cartItem[0].id}`" class="flex gap-2 items-center">
            <div> {{ index + 1 }} </div>
            <img :src="cartItem[0].img[0]" class="h-10 w-10" :alt="'Photo of ' + cartItem[0].name"/>
            <div class="font-bold">{{ cartItem[0].name }}</div>
        </RouterLink>
    </div>

    <div>${{ cartItem[0].price }}</div>

    <input type="number" min="1" v-model="cartItem[2]" :max="cartItem[0].available" 
           class="rounded-md w-15 outline-yellow-400 border-1 border-yellow-400 px-2 py-1">

    <!-- Move "Buy" button outside RouterLink -->
    <button @click="buyFromCart(cartItem[0], cartItem[1], cartItem[2])" 
            class="bg-black text-white border-1 border-amber-400 rounded-[7px] px-2 py-1 text-center cursor-pointer">
        Buy
    </button>
    <button @click="itemsStore.removeFromCart(cartItem[0].id)" 
            class="bg-red-300 text-black rounded-[7px] px-2 py-1 text-center cursor-pointer">
        <i class="fa-solid fa-trash"></i>
    </button>

    <div v-if="cartItem[1]" class="flex gap-3 ml-5">
        <div class="px-2 rounded-xl bg-amber-100" v-for="(value, option) in cartItem[1]">
            {{ option }} {{ option === 'color' ? value.split(':')[0] : value }}
        </div>
    </div>

</div>

      </div>
    </div>
  </div>
</template>