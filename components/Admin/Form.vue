<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
interface Props {
  isUpdate: boolean;
  initialData: Object;
  page: string
}
const props = withDefaults(defineProps<Props>(), {
  isUpdate: false,
  initialData: () => ({ name: "", file: null }),
  page: ''
});
const emit = defineEmits(['submit']);
const formData = ref<object>({ ...props.initialData }); 
const isSubmit = ref<boolean>(false);
const onFileChange = (event: any) => {
  formData.value.file = event.target.files[0];
};
const handleSubmit = () => {
  isSubmit.value = true;
  if (formData.value.name && formData.value.file) {
    emit("submit", formData.value);
  }
};
watch(formData, (newVal: any) => {
  formData.value = newVal;
});
</script>
<template>
  <section class="mt-4">
    <div class="title mb-4 font-semibold text-2xl text-blue-500">
      {{ isUpdate ? "Update" : "Add" }} {{ page }}
    </div>
    <div class="rounded-lg border bg-card shadow-sm">
      <form @submit.prevent="handleSubmit" class="p-4">
        <div
          class="form-control my-4 flex flex-col md:flex-row md:align-center"
        >
          <label for="name" class="font-semibold p-0 md:pr-20 text-xl mb-3"
            >Category Name</label
          >
          <input
            class="outline-none flex-grow m-0 md:ml-20 px-4 py-2 rounded-md border"
            :placeholder="`${page} name`"
            tabindex="0"
            aria-required="true"
            type="text"
            name="text"
            v-model="formData.name"
          />
        </div>
        <span
          v-if="isSubmit && !(formData.name.length > 0)"
          class="text-red-500 text-sm m-0 md: ml-40 pl-40 my-2"
          >Please choose an image</span
        >
        <div
          class="form-control my-10 flex flex-col md:flex-row md:align-center"
        >
          <label for="name" class="font-semibold p-0 md:pr-20 mb-3 text-xl"
            >Upload Images</label
          >
          <div class="upload-image m-0 md:ml-20 flex-grow">
            <div class="item up-load">
              <div
                class="px-4 py-10 border-2 border-dashed border-blue-500 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-600"
              >
                <label for="file-upload" class="flex flex-col cursor-pointer">
                  <FontAwesomeIcon
                    :icon="faUpload"
                    class="fa-2xl text-blue-500"
                  />
                  <p class="text-gray-500">Drop your images here or select</p>
                  <span class="text-blue-500 underline">click to browse</span>
                  <input
                    @change="onFileChange"
                    id="file-upload"
                    type="file"
                    class="mt-4"
                    accept=".jpeg, .png, .jpg"
                  />
                </label>
                <span
                  v-if="isSubmit && !formData.file"
                  class="text-red-500 text-sm mt-2"
                  >Please choose an image</span
                >
              </div>
            </div>
          </div>
        </div>
        <button
          class="px-20 bg-blue-500 text-white font-semibold mt-8 text-xl py-3 rounded-lg outline-none"
        >
          Save
        </button>
      </form>
    </div>
  </section>
</template>

function withDefaults(arg0: any, arg1: { isUpdate: boolean; initialData: () => { name: string; file: null; }; page: string; }) {
  throw new Error("Function not implemented.");
}
