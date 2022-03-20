<template>
  <div>
    <div class="center">
      <b-button v-b-modal.modal>{{ title }}</b-button>
    </div>
    <Wizard :title="title">
      <Step :selected="true">
        <div class="form-group">hello 1</div>
      </Step>
      <Step>
        <div class="form-group">hello 2</div>
      </Step>
      <Step>
        <div class="form-group">hello 2</div>
      </Step>
    </Wizard>
  </div>
</template>

<script>
import Wizard from "../components/commons/Wizard.vue";
import Step from "../components/commons/Step.vue";

export default {
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
  components: {
    Wizard,
    Step,
  },
};
</script>

<style>
.center {
  text-align: center;
  margin: 20px;
}
</style>
