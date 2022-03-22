<template>
  <div>
    <b-form-group
      label="이름"
      label-cols="4"
      label-cols-lg="2"
      invalid-feedback="필수 입력값 입니다. 두글자 이상 입력하세요."
    >
      <b-form-input
        placeholder="이름"
        v-model="formData.name"
        :state="nameState"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label="번호"
      label-cols="4"
      label-cols-lg="2"
      invalid-feedback="필수 입력값 입니다. 숫자와 하이픈, 공백 이외의 문자는 허용하지 않습니다."
    >
      <b-form-input
        placeholder="번호"
        v-model="formData.phoneNumber"
        :state="phoneNumberState"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label="이메일"
      label-cols="4"
      label-cols-lg="2"
      invalid-feedback="필수 입력값 입니다. 이메일 형식으로 입력하세요."
    >
      <b-form-input
        placeholder="이메일"
        v-model="formData.email"
        :state="emailState"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
  import { isEmpty } from "../../helpers/validateHelper";

  export default {
    props: {
      data: Object,
    },
    data() {
      const { name, phoneNumber, email } = this.data;
      return {
        formData: {
          name,
          phoneNumber,
          email,
        },
        nameState: null,
        phoneNumberState: null,
        emailState: null,
      };
    },
    methods: {
      validateFields(callback) {
        const { name, phoneNumber, email } = this.formData;

        this.nameState = isEmpty(name);
        this.phoneNumberState = this.validatePhone(phoneNumber);
        this.emailState = this.validateEmail(email);

        const isValid =
          this.nameState && this.phoneNumberState && this.emailState;

        callback({ ...this.formData }, isValid);
      },
      validatePhone(phoneNumber) {
        const regPhone =
          /^01([0|1|6|7|8|9])[-\s]?([0-9]{3,4})[-\s]?([0-9]{4})$/;
        return isEmpty(phoneNumber) && regPhone.test(phoneNumber);
      },
      validateEmail(email) {
        const regEmail =
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return isEmpty(email) && regEmail.test(email);
      },
    },
  };
</script>

<style></style>
