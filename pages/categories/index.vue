<template>
  <main class="main-content py-10 bg-gray-100">
    <div class="container w-full mx-auto xl:w-9/12">
        <div class="title text-3xl font-bold">Categories</div>
      <section
        class="grid grid-cols-2 gap-6 my-8 md:grid-cols-3 lg:gap-8 xl:grid-cols-4"
      >
        <HomeCategories v-for="n in 8" :key="n"></HomeCategories>
    </section>
    </div>
  </main>
</template>
