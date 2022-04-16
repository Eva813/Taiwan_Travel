<template>
  <div class="d-flex flex-wrap justify-content-around">
    <div
      class="card"
      v-for="item in activeData"
      :key="item.title"
      style="width: 33rem"
    >
      <img src="@/assets/image/mountain.jpg" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <div
          class="content d-flex align-items-center justify-content-xl-between"
        >
          <p class="location">
            <fa icon="map-marker-alt" class="icon" />{{ item.location }}
          </p>
          <a href="#" class="btn">詳細介紹 ></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  setup() {
    const activeData = reactive([
      {
        title: "尖石鄉",
        img: require("@/assets/image/mountain.jpg"),
        location: "新竹縣",
      },
      {
        title: "澎湖花火節",
        img: require("@/assets/image/mountain.jpg"),
        location: "澎湖縣",
      },
      {
        title: "南投沙雕節",
        img: require("@/assets/image/mountain.jpg"),
        location: "南投縣",
      },
      {
        title: "台中購物節",
        img: require("@/assets/image/mountain.jpg"),
        location: "台中市",
      },
    ]);
    return {
      activeData,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/all.scss";
.card {
  flex-direction: row;
  margin-bottom: 1rem;
  img {
    width: 160px;
    height: auto;
  }
  .location {
    margin-bottom: 0;
  }
  .icon {
    margin-right: 3px;
    vertical-align: -2px;
  }
}
</style>
