<script setup lang="ts">
import { GuitarType } from "../types/index.ts";
defineProps<{
  guitar: GuitarType;
}>();

defineEmits(["add-to-cart"]);
</script>
<template>
  <div class="col-md-6 col-lg-4 my-4 row align-items-center">
    <div class="col-4">
      <img
        class="img-fluid"
        :src="`/img/${guitar.image}.jpg`"
        alt="imagen guitarra"
      />
    </div>
    <div class="col-8">
      <h3 class="text-black fs-4 fw-bold text-uppercase">{{ guitar.name }}</h3>
      <p>
        {{ guitar.description }}
      </p>
      <p class="fw-black text-primary fs-3">${{ guitar.price }}</p>
      <button
        type="button"
        class="btn btn-dark w-100"
        @click="$emit('add-to-cart', guitar)"
      >
        Add to Cart
      </button>
    </div>
  </div>
  <!-- FIN GUITARRA -->
</template>

<style scoped></style>
