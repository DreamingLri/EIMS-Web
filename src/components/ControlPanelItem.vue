<template>
    <div @click="handleClick" class="control-item">
        <div v-if="text" style="padding-left: 20px;"></div>
        <p v-if="text" :class="{ text: !clicked, 'text-clicked': clicked }">{{ text }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ControlPanelStore } from '@/stores/sidebar';
import { computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';

const controlPanelStore = ControlPanelStore();

const props = defineProps<{
    id: string; // 控制面板的id
    text?: string; // 内容 可选
    jumpToPath: string; // 跳转路径
}>();

const emit = defineEmits(['updateSelected']);
const router = useRouter();

const clicked = computed(() => controlPanelStore.getSelectedItem() == props.id);

const handleClick = () => {
    controlPanelStore.setSelectedItem(props.id);
    router.push(props.jumpToPath);
};
</script>

<style scoped>
.control-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
    height: 30px;

    color: black;
    text-decoration: none
}

.text {
    line-height: 30px;
    font-size: 18px;
}

.text-clicked {
    line-height: 30px;
    font-size: 18px;
    color: #71B6FF;
    font-weight: bold;
}
</style>
