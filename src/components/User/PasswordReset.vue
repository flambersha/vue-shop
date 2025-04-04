<script setup></script>
<template>
<div class="flex justify-center items-center w-full min-h-screen" >
<form action="" class="flex flex-col gap-6 rounded-[15px] border-2 border-yellow-400 p-8 md:p-13">
    <h1 class="uppercase font-bold text-[30px] text-center">Reset Password</h1>
    
    <div class="relative">
        <label for="" class="text-[14px] px-1 absolute bg-transparent backdrop-blur-sm rounded-md bottom-[30px] left-1">Password</label>
        <input type="password" class="outline-2 outline-yellow-400 rounded-md py-1" name="" >
    </div>
    <div class="relative">
        <label for="" class="text-[14px] px-1 absolute bg-transparent backdrop-blur-sm rounded-md bottom-[30px] left-1">Repeat Password</label>
        <input type="password" class="outline-2 outline-yellow-400 rounded-md py-1" name="">
    </div>
    <button class=" cursor-pointer w-full bg-black text-white p-2 rounded-md shadow-md">Reset</button>
        
</form>
</div>
</template>