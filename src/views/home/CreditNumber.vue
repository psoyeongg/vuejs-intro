<template>
  <div>
    <b-form-group
      label="신용카드"
      label-cols="4"
      label-cols-lg="2"
      :invalid-feedback="feedbackMsg"
    >
      <b-form-input
        placeholder="신용카드"
        v-model="formData.creditNumber"
        :state="creditNumberState"
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
      return {
        formData: {
          creditNumber: this.data.creditNumber,
        },
        creditNumberState: null,
        feedbackMsg: "",
      };
    },
    methods: {
      validateFields(callback) {
        const { creditNumber } = this.formData;

        const state = this.validate(creditNumber);
        this.creditNumberState = state;
        callback({ ...this.formData }, this.creditNumberState);
      },
      validate(creditNumber) {
        let isValid = true;

        if (!isEmpty(creditNumber)) {
          this.feedbackMsg = "필수 입력값 입니다. 16자리의 숫자를 입력하세요.";
          isValid = false;
        }

        if (isValid && !this.regValidate(creditNumber)) {
          this.feedbackMsg =
            "숫자와 하이픈(-), 공백 이외의 문자는 허용하지 않습니다.";
          isValid = false;
        }

        if (isValid && !this.numberValidate(creditNumber)) {
          this.feedbackMsg = "카드 번호가 유효하지 않습니다.";
          isValid = false;
        }

        return isValid;
      },
      regValidate(creditNumber) {
        // 자리 구분 없이 숫자만 허용
        const reg_only_number = /^[0-9]{16}$/;
        // 네자리씩 하이픈으로만 구분
        const reg_include_hyphen = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
        // 네자리씩 공백으로만 구분
        const reg_include_black = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;

        return (
          reg_only_number.test(creditNumber) ||
          reg_include_hyphen.test(creditNumber) ||
          reg_include_black.test(creditNumber)
        );
      },
      numberValidate(creditNumber) {
        const arrNum = creditNumber
          .replaceAll(" ", "")
          .replaceAll("-", "")
          .split("");

        const reverseArrNum = arrNum.reverse();

        let oddTotal = 0;
        let evenTotal = 0;
        reverseArrNum.forEach((num, index) => {
          const number = parseInt(num);
          if (index % 2 !== 0) {
            evenTotal = this.getEvenTotal(evenTotal, number);
          } else {
            oddTotal = this.getOddTotal(oddTotal, number);
          }
        });

        return (oddTotal + evenTotal) % 10 === 0;
      },
      getOddTotal(total, num) {
        return (total += num);
      },
      getEvenTotal(total, num) {
        const doubleNum = num * 2;
        if (doubleNum.toString().length === 1) {
          return (total += doubleNum);
        }

        const arr = doubleNum
          .toString()
          .split("")
          .map((n) => parseInt(n));

        return (total += arr.reduce((acc, cur) => acc + cur, 0));
      },
    },
  };
</script>

<style></style>
