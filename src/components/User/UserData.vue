<script setup>
import { ref } from "vue";
const submitForm = () => {
  console.log("Form Data:", formData.value);
};
const formData = ref({
  name: "Alex",
  surname: "Smith",
  email: "alex@gmail.com",
  phone: "",
  street: "34th St.",
  city: "New York",
  building: "20 W 34th St.",
  zip: "12345",
});
</script>
<template>
  <div class="pl-0 md:pl-5 flex">
    <form @submit.prevent="submitForm">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col md:flex-row gap-4">
          <div>
            <label for="name" class="text-(--secondary-text) text-[13px]"> Name </label>

            <div class="relative mb-2">
              <input
                type="text"
                name="name"
                v-model="formData.name"
                class="block mt-1 border-2 rounded-[7px] w-full md:w-50 lg:w-full border-blue-400 py-0.5 px-2 pr-7 text-base text-(--input-text) focus:outline-none"
              />

              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="fa-regular fa-pen-to-square text-blue-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label for="surname" class="text-(--secondary-text) text-[13px]">
              Surname
            </label>
            <div class="relative mb-2">
              <input
                type="text"
                name="surname"
                v-model="formData.surname"
                class="block mt-1 border-2 rounded-[7px] w-full md:w-50 lg:w-full border-blue-400 py-0.5 px-2 pr-7 text-base text-(--input-text) focus:outline-none"
              />

              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="fa-regular fa-pen-to-square text-blue-400"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4">
          <div>
            <label for="email" class="text-(--secondary-text) text-[13px]"> Email </label>

            <div class="relative mb-2">
              <input
                type="email"
                name="email"
                v-model="formData.email"
                class="block mt-1 border-2 rounded-[7px] w-full md:w-50 lg:w-full border-blue-400 py-0.5 px-2 pr-7 text-base text-(--input-text) focus:outline-none"
              />

              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="fa-regular fa-pen-to-square text-blue-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label for="phone" class="text-(--secondary-text) text-[13px]"> Phone </label>

            <div class="relative mb-2">
              <input
                type="tel"
                name="phone"
                v-model="formData.phone"
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                class="block mt-1 border-2 rounded-[7px] w-full md:w-50 lg:w-full border-blue-400 py-0.5 px-2 pr-7 text-base text-(--input-text) focus:outline-none"
              />

              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="fa-regular fa-pen-to-square text-blue-400"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row md:flex-wrap gap-4">
          <div>
            <label for="street" class="text-(--secondary-text) text-[13px]">
              Street
            </label>

            <div class="relative mb-2">
              <input
                type="text"
                name="street"
                v-model="formData.street"
                class="block mt-1 border-2 rounded-[7px] w-full md:w-50 lg:w-full border-blue-400 py-0.5 px-2 pr-7 text-base text-(--input-text) focus:outline-none"
              />

              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="fa-regular fa-pen-to-square text-blue-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label for="city" class="text-(--secondary-text) text-[13px]"> City </label>

            <div class="relative mb-2">
              <input
                type="text"
                name="city"
                v-model="formData.city"
                class="block mt-1 border-2 rounded-[7px] w-full md:w-50 lg:w-full border-blue-400 py-0.5 px-2 pr-7 text-base text-(--input-text) focus:outline-none"
              />

              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="fa-regular fa-pen-to-square text-blue-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label for="bld" class="text-(--secondary-text) text-[13px]"> Address </label>

            <div class="relative mb-2">
              <input
                type="text"
                name="bld"
                v-model="formData.building"
                class="block mt-1 border-2 rounded-[7px] w-full md:w-50 lg:w-full border-blue-400 py-0.5 px-2 pr-7 text-base text-(--input-text) focus:outline-none"
              />

              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="fa-regular fa-pen-to-square text-blue-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label for="zip" class="text-(--secondary-text) text-[13px]">
              Zip code
            </label>

            <div class="relative mb-2">
              <input
                type="number"
                name="zip"
                v-model="formData.zip"
                class="block mt-1 border-2 rounded-[7px] w-full md:w-34 border-blue-400 py-0.5 px-2 pr-7 text-base text-(--input-text) focus:outline-none"
              />

              <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="fa-regular fa-pen-to-square text-blue-400"></i>
              </div>
            </div>
          </div>
        </div>
       
        <div class="flex flex-col items-center md:items-start">
          <RouterLink
            to="/email-confirmation/"
            class="text-sm underline text-(--link-text) underline-yellow-600 w-fit"
            >Change Password</RouterLink>
          <button
            type="submit"
            class="mt-3 border-2 border-(--button-bg) bg-black text-white rounded-[7px] px-7 py-2 text-center w-48 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>

</style>
