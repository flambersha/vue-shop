<script setup>
import { useItemStore } from '@/stores/items';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isOpen=ref(false);
const isMenuOpen=ref(false)
const router = useRouter();
const currentTheme = ref('light')
const itemsStore = useItemStore();
const searchQuery = ref("");

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
})

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
        <RouterLink :to="`/catalog`" class="hover:text-yellow-500 transition duration-200" active-class="border-b-2 border-b-yellow-400">Catalog</RouterLink>
        <RouterLink :to="`/about`" class="hover:text-yellow-500 transition duration-200" active-class="border-b-2 border-b-yellow-400">About</RouterLink>
        <RouterLink :to="`/contacts`" class="hover:text-yellow-500 transition duration-200" active-class="border-b-2 border-b-yellow-400">Contacts</RouterLink>
    </div>
    
    <!-- Dropdown visible only on md screens -->
    <div class="relative text-left hidden md:block lg:hidden">
        <div>
            <button type="button" @click="isMenuOpen = !isMenuOpen" class="cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                Menu
                <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <div v-show="isMenuOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none" >
                <RouterLink :to="`/catalog`" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Catalog</RouterLink>
                <RouterLink :to="`/about`" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">About</RouterLink>
                <RouterLink :to="`/contacts`" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">Contacts</RouterLink>
            </div>
        </div>
    </div>
</div>
        
        <div class="flex items-center gap-5 text-[19px]">
            <input @keyup.enter="submit" v-model="searchQuery" class="text-[15px] outline-1 rounded-2xl py-1 px-3 outline-yellow-500 w-35 lg:w-57" type="text" placeholder="Search...">
            <button @click="toggleTheme" class="mx-4 cursor-pointer"><i class="fa-regular fa-moon"></i></button>
            <RouterLink to="notif"><i class="fa-regular fa-bell"></i><span class="sr-only">Notifications</span></RouterLink>
            <div class="relative">
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
            Logo
        </div>
        <div class="flex items-center gap-5">
            <input @keyup.enter="submit" class="text-[15px] border-1 w-35 border-gray-300 rounded-2xl py-1 px-3 outline-purple-500" type="text" placeholder="Search...">
            <button class="cursor-pointer"><i class="fa-regular fa-moon"></i></button>
            <RouterLink to="notif"><i class="fa-regular fa-bell"></i></RouterLink>
        <button @click="isOpen = !isOpen"><i class="fa-solid fa-bars"></i></button>
        </div>
        </div>
        <!-- dropdown -->
         <div v-show="isOpen" class="md:hidden flex flex-col right-0 bg-gray-200 w-60 absolute z-13 p-3 gap-4">
            <RouterLink class=" text-center py-2 px-4 border-1 border-black rounded-2xl" to="catalog">Catalog</RouterLink>
            <RouterLink to="cart">Cart {{ itemsStore.cartCounter }}</RouterLink>
            <RouterLink to="account">Account</RouterLink>
            <RouterLink to="about">About</RouterLink>
            <RouterLink to="contacts">Contacts</RouterLink>
         </div>
    </nav>
</header>
   
</template>