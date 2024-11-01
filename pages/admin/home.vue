<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faDirections,
  faDollar,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { faDropbox } from "@fortawesome/free-brands-svg-icons";
definePageMeta({
  layout: "admin",
});
</script>
<template>
  <main>
    <div class="summary mt-3">
      <div class="grid gap-4 grid-cols-3">
        <div class="rounded-lg border bg-card shadow-sm">
          <div
            class="p-6 flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <h3 class="tracking-tight text-sm font-medium">Total Revenue</h3>
            <FontAwesomeIcon :icon="faDollar" class="fa-sm" />
          </div>
          <div class="p-6 pt-0">
            <div class="text-2xl font-bold">$0.00</div>
          </div>
        </div>
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div
            class="p-6 flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <h3 class="tracking-tight text-sm font-medium">Sales</h3>
            <FontAwesomeIcon :icon="faTicket" class="fa-sm" />
          </div>
          <div class="p-6 pt-0"><div class="text-2xl font-bold">+0</div></div>
        </div>
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div
            class="p-6 flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <h3 class="tracking-tight text-sm font-medium">
              Products In Stock
            </h3>
            <FontAwesomeIcon :icon="faDropbox" class="fa-sm" />
          </div>
          <div class="p-6 pt-0"><div class="text-2xl font-bold">0</div></div>
        </div>
      </div>
      <div class="rounded-lg mt-4 border bg-card shadow-sm">
        <h1 class="p-4 text-2xl font-semibold">Overview</h1>
        <AdminChart class="p-4"></AdminChart>
      </div>
      <div class="rounded-lg mt-4 border bg-card shadow-sm">
        <div class="title flex justify-between p-4">
          <h1 class="text-2xl font-semibold">Recent Order</h1>
          <input
            type="text"
            placeholder="Search"
            class="outline-none text-sm border rounded-lg px-3 w-[300px]"
          />
        </div>
        <ClientOnly>
          <AdminRecentOrder class="w-full my-3"></AdminRecentOrder>
        </ClientOnly>
      </div>
    </div>
  </main>
</template>
