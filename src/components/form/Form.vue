<template>
  <div>
    <div class="title">
      <h1>사용자 정보 입력</h1>
    </div>
    <div class="content">
      <b-form @submit="onSubmit">
        <slot></slot>
      </b-form>
    </div>
    <div class="footer">
      <custom-button
        title="이전"
        :onClick="prev"
        :disabled="currentStep === 0"
      />
      <custom-button
        title="다음"
        :onClick="next"
        v-if="currentStep < totalSteps - 1"
      />
      <custom-button
        title="전송"
        :onClick="onSubmit"
        v-if="currentStep === totalSteps - 1"
      />
    </div>
  </div>
</template>

<script>
  import CustomButton from "../commons/CustomButton.vue";
  export default {
    components: {
      CustomButton,
    },
    data() {
      return {
        steps: [],
        currentStep: 0,
        totalSteps: 0,
      };
    },
    mounted() {
      this.steps = this.$children.filter(
        (child) => child.isActive !== undefined
      );
      this.totalSteps = this.steps.length;
      this.currentStep = this.steps.findIndex((step) => step.isActive === true);
      if (this.currentStep === -1 && this.totalSteps > 0) {
        this.steps[0].isActive = true;
        this.currentStep = 0;
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
      },
      prev() {
        console.log("prev");
        this._swtichStep(this.currentStep - 1);
      },
      next() {
        console.log("next");
        this._swtichStep(this.currentStep + 1);
      },
      _swtichStep(index) {
        this.steps.forEach((step) => {
          step.isActive = false;
        });
        this.currentStep = index;
        this.steps[index].isActive = true;
      },
    },
  };
</script>

<style>
  .title {
    padding: 10px;
    text-align: center;
  }
  .content {
    border: 1px solid gray;
    margin: 20px 100px 100px 20px;
    padding: 50px;
  }
  .footer {
    padding: 10px;
    display: flex;
    justify-content: center;
  }
</style>
