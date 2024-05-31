<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { db } from "./data/db";
import { CartItem, GuitarType } from "./types";
import Guitar from "./components/Guitar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const guitars = ref<GuitarType[]>([]);
const guitarPromo = ref<GuitarType>({
  id: 0,
  name: "Default Guitar",
  image: "default_image",
  description: "Default description",
  price: 0,
});

const MAX_ITEMS = 10;
const MIN_ITEMS = 1;
const cart = ref<CartItem[]>([]);

watch(
  cart,
  () => {
    saveLocalStorage();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  guitars.value = db;
  guitarPromo.value = db[3];

  const cartStorage = localStorage.getItem("cart");
  if (cartStorage) {
    cart.value = JSON.parse(cartStorage);
  }
});

const saveLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

const addToCart = (item: CartItem) => {
  const itemExist = cart.value.findIndex((guitar) => guitar.id === item.id);
  if (itemExist >= 0) {
    if (cart.value[itemExist].quantity >= MAX_ITEMS) return;
    cart.value[itemExist].quantity++;
    console.log(cart.value);
  } else {
    item.quantity = 1;
    cart.value.push(item);
  }
};

const increaseQuantity = (id: CartItem["id"]) => {
  const index = cart.value.findIndex((product) => product.id === id);
  if (cart.value[index].quantity >= MAX_ITEMS) return;
  cart.value[index].quantity++;
};

const decreaseQuantity = (id: CartItem["id"]) => {
  const index = cart.value.findIndex((product) => product.id === id);
  if (cart.value[index].quantity <= MIN_ITEMS) return;
  cart.value[index].quantity--;
};

const removeFromCart = (id: CartItem["id"]) => {
  cart.value = cart.value.filter((product) => product.id !== id);
};

const clearCart = () => {
  cart.value = [];
};
</script>

<template>
  <Header
    :cart="cart"
    :guitarPromo="guitarPromo"
    @increase-quantity="increaseQuantity"
    @decrease-quantity="decreaseQuantity"
    @remove-from-cart="removeFromCart"
    @clear-cart="clearCart"
    @add-to-cart="addToCart"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Our Collection</h2>

    <div class="row mt-5">
      <Guitar
        v-for="guitar in guitars"
        v-bind:guitar="guitar"
        @add-to-cart="addToCart"
      />
    </div>
  </main>

  <Footer />
</template>

<style scoped></style>
