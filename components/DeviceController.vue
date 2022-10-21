<script setup lang="ts">
const props = defineProps<{
  name: string;
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function toggleValue() {
  computedValue.value = !computedValue.value;
}
</script>

<template>
  <div
    class="switch-button"
    :class="{ active: computedValue }"
    @click="toggleValue"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="bi bi-lightbulb"
      viewBox="0 0 16 16"
    >
      <path
        d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"
      />
    </svg>
    <span>{{ name }}</span>
  </div>
</template>

<style scoped lang="scss">
.switch-button {
  display: inline-block;
  border-radius: 1rem;
  border: 2px solid $gray-500;
  display: inline-flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  margin: 1rem 1rem 0 0;
  padding: 0.5rem;
  cursor: pointer;

  .bi-lightbulb {
    fill: $gray-500;
  }

  span {
    text-align: center;
  }

  &.active {
    border-color: $primary;
    background-color: $primary;

    .bi-lightbulb {
      fill: $white;
    }

    span {
      color: $white;
    }
  }
}
</style>
