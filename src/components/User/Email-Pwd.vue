<script setup></script>
<template>
<div class="flex justify-center items-center w-full min-h-screen" >
<form action="" class="flex flex-col gap-6 rounded-[15px] border-2 border-yellow-400 p-8 md:p-13 justify-center items-center">
    <h1 class="uppercase font-bold text-[30px] text-center">Password reset</h1>
    
    <div class="relative">
        <label for="" class="text-[14px] px-1 absolute bg-transparent backdrop-blur-sm rounded-md bottom-[30px] left-1">Email</label>
        <input type="email" class="outline-2 outline-yellow-400 rounded-md py-2 px-2" name="" >
    </div>

    <p class="text-[13px] text-center"><RouterLink :to="`/`" class="text-yellow-600 underline underline-yellow-600">Back to home</RouterLink></p>
    <button class=" cursor-pointer w-32 bg-black text-white p-2 rounded-md shadow-md">Send</button>
        
</form>
</div>
</template>