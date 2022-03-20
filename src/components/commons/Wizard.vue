<template>
  <b-modal title="title" id="modal" size="lg">
    <form>
      <slot></slot>
    </form>

    <template #modal-footer="{}">
      <b-button
        size="sm"
        variant="danger"
        @click="prev"
        :disabled="currentStep === 0"
      >
        이전
      </b-button>
      <b-button
        size="sm"
        variant="danger"
        @click="next"
        v-if="currentStep < totalSteps - 1"
      >
        다음
      </b-button>
      <b-button
        size="sm"
        variant="danger"
        @click="next"
        v-if="currentStep === totalSteps - 1"
      >
        전송
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      steps: [],
      currentStep: 0,
      totalSteps: 0,
    };
  },
  mounted() {
    this.steps = this.$children;
    this.totalSteps = this.steps.length;
    this.currentStep = this.steps.findIndex((step) => step.isActive === true);
    if (this.currentStep === -1 && this.totalSteps > 0) {
      this.steps[0].isActive = true;
      this.currentStep = 0;
    }
  },

  methods: {
    prev() {
      this._swtichStep(this.currentStep - 1);
    },
    next() {
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

<style></style>
