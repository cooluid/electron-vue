<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { watch } from "vue";
import Home from "./views/Home.vue";

const isDark = useDark();

watch(
	isDark,
	(dark) => {

		if (dark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	},
	{ immediate: true }
);
</script>

<template>
	<div id="app-container">
		<Home />
	</div>
</template>

<style scoped>
#app-container {
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
}
</style>
