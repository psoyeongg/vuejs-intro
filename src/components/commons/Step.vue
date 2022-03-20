<template>
  <div v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
      isValidated: false,
    };
  },
  created() {
    this.isActive = this.selected;
  },
};
</script>
