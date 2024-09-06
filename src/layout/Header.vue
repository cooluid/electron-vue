<template>
    <div class="header">
        <div class="title-bar">
            <div class="drag-area" />
            <IconItem icon="#icon-guanbi" :size="16" @click="closeApp" class="no-drag close-btn" />
        </div>
        <div class="icon-bar">
            <IconItem icon="#icon-shezhi" :size="20" class="no-drag" />
        </div>
    </div>
</template>

<script setup lang="ts">
import IconItem from '@/components/com/IconItem.vue'

const closeApp = () => {
    window.electronAPI.invoke('close-window');
};
</script>

<style scoped>
.header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title-bar {
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    -webkit-app-region: drag;
    background-color: #000;
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
    padding:10px 0 5px 20px;
}
</style>
