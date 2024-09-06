<template>
	<div class="header">
		<div class="title-bar">
			<div class="drag-area" />
			<IconItem icon="#icon-guanbi" :size="16" @click="closeApp" class="no-drag close-btn" />
		</div>
		<div class="icon-bar">
			<IconItem icon="#icon-shezhi" :size="20" />
			<IconItem :icon="themeIcon" :size="18" @click="setTheme" />
		</div>
	</div>
</template>

<script setup lang="ts">
import IconItem from "@/components/com/IconItem.vue";
import { useDark, useToggle } from "@vueuse/core";
import { computed } from "vue";
const closeApp = () => {
	window.electronAPI.invoke("close-window");
};

const isDark = useDark();
const toggleDark = useToggle(isDark);
const themeIcon = computed(() => (isDark.value ? "#icon-a-zu4" : "#icon-icon_qingtian"));
const setTheme = () => {
	toggleDark();
	console.log(isDark.value);
};
</script>

<style scoped>
.header {
	width: 100%;
	height: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
}

.title-bar {
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	-webkit-app-region: drag;
}

.close-btn {
	margin-right: 10px;
}

.drag-area {
	flex-grow: 1;
	height: 100%;
}

.no-drag {
	-webkit-app-region: no-drag;
}

.icon-bar {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
	padding: 5px 0 5px 10px;
}
</style>
