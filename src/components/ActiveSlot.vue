<template>
  <div class="active-slot info bg-light">
    <slot>
      <p>活動時間： <slot name="time"> </slot></p>
      <p>服務電話：<slot name="phone"> </slot></p>
      <p>主辦單位：<slot name="org"> </slot></p>
      <p>活動地點：<slot name="location"> </slot></p>
      <p>官方網站：<slot name="site"> </slot></p>
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
