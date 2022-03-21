<template>
  <div>
    <b-form-group
      id="input-group-1"
      label="신용카드"
      label-cols="4"
      label-cols-lg="2"
    >
      <b-form-input
        id="name"
        placeholder="신용카드"
        v-model="formData.creditNumber"
        required
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object,
    },
    data() {
      return {
        formData: this.data,
      };
    },
  };
</script>

<style></style>
