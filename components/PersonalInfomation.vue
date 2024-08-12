<template>
  <form class="bg-white rounded-lg shadow">
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <h3 class="text-xl font-semibold col-span-full">Personal Information</h3>
      <div class="w-full flex flex-col">
        <label for="first-name">First Name</label>
        <input placeholder="John" autocomplete="given-name" 
        class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        type="text" />
      </div>
      <div class="w-full flex flex-col">
        <label for="last-name">Last Name</label>
        <input placeholder="Doe" autocomplete="family-name" 
        class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        type="text" />
      </div>
      <div class="w-full flex flex-col">
        <label for="username">Username (Readonly)</label>
        <input placeholder="johndoe" autocomplete="username" 
        class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        type="text" />
      </div>
      <div class="w-full flex flex-col">
        <label for="email">Email</label>
        <input
          placeholder="johndoe@email.com"
          autocomplete="email"
          
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          type="email"
        />
      </div>
    </div>
    <div
      class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg"
    >
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed bg-primary hover:bg-primary-dark"
      >
        <!----><span>Update Details</span>
      </button>
    </div>
  </form>
</template>
