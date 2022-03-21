<template>
  <div>
    <Form>
      <form-group :selected="true">
        <UserInfo :data="formData" />
      </form-group>
      <form-group>
        <Address :data="formData" />
      </form-group>
      <form-group>
        <CreditNumber :data="formData" />
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
            addr1: "",
            addr2: "",
            postal: "",
          },
          creditNumber: "",
        },
        title: "사용자 정보 입력",
      };
    },
  };
</script>

<style></style>
