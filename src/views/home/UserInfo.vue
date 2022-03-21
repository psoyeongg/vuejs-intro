<template>
  <div>
    <b-form-group
      id="input-group-1"
      label="이름"
      label-cols="4"
      label-cols-lg="2"
    >
      <b-form-input
        id="name"
        placeholder="이름"
        v-model="formData.name"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-2"
      label="번호"
      label-cols="4"
      label-cols-lg="2"
    >
      <b-form-input
        id="phoneNumber"
        placeholder="번호"
        v-model="formData.phoneNumber"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-3"
      label="이메일"
      label-cols="4"
      label-cols-lg="2"
    >
      <b-form-input
        id="email"
        placeholder="이메일"
        v-model="formData.email"
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
