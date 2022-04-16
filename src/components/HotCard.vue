<template>
  <div class="container d-flex flex-wrap justify-content-between">
    <div class="card hotCard" v-for="item in hotData" :key="item.title">
      <img :src="item.img" class="card-img-top" alt="hotPlace-image" />
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="location">
          <fa icon="map-marker-alt" class="icon" />{{ item.location }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  setup() {
    const hotData = reactive([
      {
        title: "尖石鄉",
        img: require("@/assets/image/central.jpg"),
        location: "新竹縣",
      },
      {
        title: "澎湖花火節",
        img: require("@/assets/image/mountain.jpg"),
        location: "澎湖縣",
      },
      {
        title: "南投沙雕節",
        img: require("@/assets/image/central.jpg"),
        location: "南投縣",
      },
      {
        title: "台中購物節",
        img: require("@/assets/image/mountain.jpg"),
        location: "台中市",
      },
    ]);
    return {
      hotData,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/all.scss";
.container {
  margin-top: 0px;
}
.hotCard {
  border: none;
  height: 200px;
  max-width: 16rem;
  .card-body {
    text-align: left;
  }
  img {
    border-radius: 15px;
  }
  .icon {
    margin-right: 3px;
    vertical-align: -2px;
  }
}
</style>






