<template>
  <div>
    <Form
      ref="formRef"
      @onNextStep="onNextStep"
      :isValid="isValid"
      :formData="formData"
    >
      <form-group :selected="true" :isValid="isValid">
        <UserInfo ref="userInfo" :data="formData" />
      </form-group>
      <form-group :isValid="isValid">
        <Address ref="address" :data="formData" />
      </form-group>
      <form-group :isValid="isValid">
        <CreditNumber ref="creditNumber" :data="formData" />
      </form-group>
    </Form>
  </div>
</template>

<script>
  import FormGroup from "@/components/form/FormGroup.vue";
  import Form from "@/components/form/Form.vue";

  import UserInfo from "../../views/home/UserInfo.vue";
  import Address from "../../views/home/Address.vue";
  import CreditNumber from "../../views/home/CreditNumber.vue";

  export default {
    name: "Home",
    components: {
      Form,
      FormGroup,
      UserInfo,
      Address,
      CreditNumber,
    },
    data() {
      return {
        formData: {
          name: "",
          phoneNumber: "",
          email: "",
          address: {
            postal: "",
            addr1: "",
            addr2: "",
          },
          creditNumber: "",
        },
        isValid: false,
      };
    },
    methods: {
      onNextStep({ element }) {
        const ref = element.data.ref;
        this.$refs[ref].validateFields((values, isValid) => {
          this.isValid = isValid;
          if (isValid) {
            this.formData = {
              ...this.formData,
              ...values,
            };
          }
        });
      },
    },
  };
</script>

<style></style>
