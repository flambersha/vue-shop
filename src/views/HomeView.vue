<script setup>

</script>
<template>
    <section class="flex flex-col md:flex-row gap-3 min-h-[clamp(600px,100vh,900px)] items-center text-center md:text-left pt-[115px] md:pt-0">
    <div class="flex flex-col gap-6 items-center md:items-start justify-center flex-1 px-4">
      <p class="text-4xl md:text-6xl font-bold">
        Feel <span class="text-yellow-500">comfortable</span> <br /> in your everyday outfits
      </p>
      <p class="text-(--link-text)">
        Go and choose your best look<br />
        People, online illustrations by <a class="underline underline-(--link-text)" href="https://storyset.com/people">Storyset</a>
      </p>
      <RouterLink to="/catalog" class="text-[16px] border-2 border-(--button-bg) bg-black text-white rounded-[7px] px-4 py-2 md:px-5 md:py-3 text-center">
        Explore now
      </RouterLink>
    </div>
    <div class="flex justify-center items-center flex-1">
      <img src="/Shopping bag-bro.svg" alt="picture" aria-hidden="true" class="max-w-full h-auto w-[80%] md:w-[90%]">
    </div>
  </section>

  <section class="w-full min-h-[clamp(600px,100vh,900px)] flex justify-center items-center pt-16">
    <div class="grid grid-cols-10 grid-rows-4 gap-4 w-full font-bold">
      <div class="col-span-10 row-span-4 md:col-span-5 md:row-span-3 bg-(--bento-bg) flex justify-center items-center rounded-2xl">
        <img src="/Ecommerce checkout laptop-bro.svg" alt="picture" aria-hidden="true" >
      </div>
      <div class="p-10 col-span-10 row-span-4 md:col-span-2 md:row-span-1 bg-(--bento-bg) flex justify-center items-center rounded-2xl text-3xl text-center">Top quality</div>
      <div class="p-10 col-span-10 row-span-4 md:col-span-3 md:row-span-1 bg-(--bento-bg) flex justify-center items-center rounded-2xl text-3xl text-center">500+ items</div>
      <div class="p-10 col-span-10 row-span-4 md:col-span-5 md:row-span-1 bg-(--bento-bg) flex justify-center items-center rounded-2xl text-3xl text-center">Reuse & recycle with us</div>
      <div class="col-span-10 row-span-4 md:col-span-5 md:row-span-4 bg-(--bento-bg) flex justify-center items-center rounded-2xl">
        <img src="/Discount-pana.svg" alt="picture" aria-hidden="true" class="w-90">
      </div>
      <div class="p-10 col-span-10 row-span-4 md:col-span-2 md:row-span-3 bg-(--bento-bg) flex justify-center items-center rounded-2xl text-3xl text-center"><p>97% <span class="text-sm"><br/>of items is recycled</span></p></div>
      <div class="p-10 col-span-10 row-span-4 md:col-span-3 md:row-span-3 bg-(--bento-bg) flex justify-center items-center rounded-2xl text-3xl text-center">Regular discounts</div>
    </div>
  </section>
</template>