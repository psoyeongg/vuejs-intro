<template>
  <div>
    <b-button
      @click="onClick"
      class="button"
      style="background: tomato; border: none"
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

<style>
  .button {
    width: max-content;
    margin: 3px;
  }
</style>
