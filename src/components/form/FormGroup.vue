<template>
  <div v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "form-group",
    props: {
      selected: {
        default: false,
      },
      isValid: Boolean,
    },
    data() {
      return {
        isActive: false,
      };
    },
    created() {
      this.isActive = this.selected;
    },
  };
</script>

<style></style>
