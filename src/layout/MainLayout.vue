<template>
    <div class="main-layout">
        <Header />
        <slot />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>
<style scoped>
.main-layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>