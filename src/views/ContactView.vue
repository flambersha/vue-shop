<script setup></script>
<template>
    <section
    class="flex flex-col md:flex-row gap-3 min-h-[clamp(600px,100vh,900px)] items-center text-center md:text-left pt-[115px] md:pt-0"
  >
    <div
      class="flex flex-col gap-6 items-center md:items-start justify-center flex-1 px-4"
    >
      <p class="text-4xl font-bold">Contact us</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, maiores
        qui. Ex accusamus repudiandae, expedita cum molestiae eaque laudantium
        dolor deserunt quis ratione.
      </p>
      <p>Business illustrations by <a class="underline underline-(--link-text)" href="https://storyset.com/business">Storyset</a></p>

      <!-- <RouterLink
        to="/catalog"
        class="text-[16px] border-2 border-(--button-bg) bg-black text-white rounded-[7px] px-4 py-2 md:px-5 md:py-3 text-center"
      >
        Explore now
      </RouterLink> -->
    </div>
    <div class="flex justify-center items-center flex-1">
      <img
        src="/Contact us-bro.svg"
        alt="picture"
        aria-hidden="true"
        class="max-w-full h-auto w-[80%] md:w-[90%]"
      />
    </div>
  </section>
</template>