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

<style></style>
