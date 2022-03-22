<template>
  <div>
    <b-form-group invalid-feedback="필수 입력값 입니다.">
      <div style="display: flex; align-items: center">
        <b-form-input
          placeholder="우편번호"
          v-model="formData.address.postal"
          readonly
          :state="postalState"
        ></b-form-input>
        <custom-button title="우편번호 찾기" :onClick="showApi" />
      </div>
    </b-form-group>
    <b-form-group invalid-feedback="필수 입력값 입니다.">
      <b-form-input
        placeholder="주소"
        v-model="formData.address.addr1"
        readonly
        :state="addr1State"
      ></b-form-input>
    </b-form-group>
    <b-form-group invalid-feedback="필수 입력값 입니다.">
      <b-form-input
        placeholder="상세주소"
        v-model="formData.address.addr2"
        :state="addr2State"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
  import CustomButton from "@/components/commons/CustomButton.vue";
  import { isEmpty } from "../../helpers/validateHelper";

  export default {
    components: {
      CustomButton,
    },
    props: {
      data: Object,
    },
    data() {
      const { postal, addr1, addr2 } = this.data.address;
      return {
        formData: {
          address: {
            postal,
            addr1,
            addr2,
          },
        },
        postalState: null,
        addr1State: null,
        addr2State: null,
      };
    },
    methods: {
      showApi() {
        new window.daum.Postcode({
          oncomplete: (data) => {
            let fullRoadAddr = data.roadAddress;
            let extraRoadAddr = "";
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraRoadAddr += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraRoadAddr +=
                extraRoadAddr !== ""
                  ? ", " + data.buildingName
                  : data.buildingName;
            }
            if (extraRoadAddr !== "") {
              extraRoadAddr = " (" + extraRoadAddr + ")";
            }
            if (fullRoadAddr !== "") {
              fullRoadAddr += extraRoadAddr;
            }
            this.formData.address.postal = data.zonecode;
            this.formData.address.addr1 = fullRoadAddr;
          },
        }).open();
      },
      validateFields(callback) {
        const { postal, addr1, addr2 } = this.formData.address;

        this.postalState = isEmpty(postal);
        this.addr1State = isEmpty(addr1);
        this.addr2State = isEmpty(addr2);

        const isValid = this.postalState && this.addr1State && this.addr2State;

        callback({ ...this.formData }, isValid);
      },
    },
  };
</script>

<style></style>
