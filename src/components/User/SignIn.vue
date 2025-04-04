<script setup></script>
<template>
<div class="flex justify-center items-center w-full min-h-screen" >
<form action="" class="flex flex-col gap-6 rounded-[15px] border-2 border-yellow-400 p-8 md:p-13">
    <h1 class="uppercase font-bold text-[30px] text-center">Sign In</h1>
    
    <div class="relative">
        <label for="" class="text-[14px] px-1 absolute bg-transparent backdrop-blur-sm rounded-md bottom-[30px] left-1">Email</label>
        <input type="email" class="outline-2 outline-yellow-400 rounded-md py-2 px-2" name="" >
    </div>
    <div class="relative">
        <label for="" class="text-[14px] px-1 absolute bg-transparent backdrop-blur-sm rounded-md bottom-[54px] left-1">Password</label>
        <input type="password" class="outline-2 outline-yellow-400 rounded-md py-2 px-2" name=""><br/>
        <RouterLink :to="`/email-confirmation`" class="text-[12px] text-(--link-text) underline underline-(--link-text)">Forgot password?</RouterLink>
    </div>
    <p class="text-[13px] text-center">Don't have an account? <RouterLink :to="`/sign-up`" class="text-(--link-text) underline underline-(--link-text)">Sign up</RouterLink></p>
    <button class=" cursor-pointer w-full bg-black text-white p-2 rounded-md shadow-md">Sign in</button>
        
</form>
</div>
</template>