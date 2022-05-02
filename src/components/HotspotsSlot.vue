<template>
  <div class="active-slot info bg-light">
    <slot>
      <p>開放時間： <slot name="time"> </slot></p>
      <p>服務電話：<slot name="phone"> </slot></p>
      <p>景點地址：<slot name="location"> </slot></p>
      <p>官方網站：<slot name="site"> </slot></p>
      <p>票價資訊：<slot name="ticket"> </slot></p>
    </slot>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/assets/all.scss";
.info {
  padding: 10px;
  text-align: left;
}
</style>
