<template>
  <div>
    <b-button
      @click="onClick"
      class="button"
      style="background: tomato; border: none; margin: 3px"
      v-bind:disabled="disabled"
      >{{ title }}</b-button
    >
  </div>
</template>

<script>
  export default {
    name: "custom-button",
    props: {
      title: String,
      onClick: Function,
      disabled: Boolean,
    },
  };
</script>

<style></style>
