<script setup>
const links = [
  { path: "/user/data", label: "Personal Data" },
  { path: "/user/orders", label: "Orders" },
  { path: "/user/favourite", label: "Wishes" },
];
</script>
<template>
    
            <h2 class="font-bold text-2xl md:text-3xl mb-10 pt-[115px]">Your profile</h2>
            <div class="flex flex-col md:flex-row">
                
                <div class="self-center md:self-auto flex flex-row md:flex-col gap-2 md:gap-8 mb-6 text-[11px] md:text-[16px] font-medium md:border-r-2 md:border-gray-300 pr-0 md:pr-3 lg:pr-10">
                    <RouterLink v-for="link in links"
                    :key="link.path"
                    :to="link.path"
                    class="flex items-center text-center px-3 py-1 md:text-left w-fit md:w-35 lg:w-40"
                    active-class="border-1 border-(--secondary-text) rounded-[20px]">{{ link.label }}</RouterLink>
                    <button class="p-0 md:p-2 text-left">Sign out <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
                </div>
               
                <div class="w-full flex items-start justify-center md:justify-start md:pl-6 ">
                    <RouterView />
                </div>
            </div>
</template>
