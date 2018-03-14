<template>
  <div>
      {{current+1}}/{{sum}}
  </div>
</template>
<script>
export default {
  props: {
    sum: {
      type: [Number, String],
      defalut: 0
    },
    current: {
      type: [Number, String],
      defalut: 0
    }
  }
};
</script>
