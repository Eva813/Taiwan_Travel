<template>
  <div class="container d-flex flex-wrap justify-content-between">
    <div class="card" v-for="item in activeData" :key="item.ActivityID">
      <img
        :src="item.Picture"
        class="card-img-top"
        alt="activeLocation-image"
      />
      <div class="card-body">
        <h5 class="card-title">{{ item.ActivityName }}</h5>
        <div
          class="content d-flex align-items-center justify-content-xl-between"
        >
          <p class="location">
            <fa icon="map-marker-alt" class="icon" />{{ item.Location }}
          </p>
          <a href="#" class="btn">詳細介紹 ></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from "vue";
import { getActiveData } from "@/apis/index.js";

export default {
  setup() {
    const showData = reactive([]);
    const activeData = ref([
      // {
      //   title: "尖石鄉",
      //   img: require("@/assets/image/mountain.jpg"),
      //   location: "新竹縣",
      // },
      // {
      //   title: "澎湖花火節",
      //   img: require("@/assets/image/central.jpg"),
      //   location: "澎湖縣",
      // },
      // {
      //   title: "南投沙雕節",
      //   img: require("@/assets/image/mountain.jpg"),
      //   location: "南投縣",
      // },
      // {
      //   title: "台中購物節",
      //   img: require("@/assets/image/central.jpg"),
      //   location: "台中市",
      // },
    ]);

    const getData = async () => {
      let data;
      await getActiveData.get().then((response) => {
        data = response.map((item) => {
          //console.log(Object.keys(item.Picture).length !== 0);
          if (Object.keys(item.Picture).length !== 0) {
            return {
              ActivityID: item.ActivityID,
              ActivityName: item.ActivityName,
              Location: item.Location,
              StartTime: item.StartTime,
              Picture: item.Picture.PictureUrl1,
            };
          }
        });
      });

      activeData.value = data.filter((item) => {
        return item !== undefined;
      });
    };

    onMounted(() => {
      getData();
    });
    return {
      activeData,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/all.scss";
.container {
  margin-top: 0px;
}
.card {
  flex-direction: row;
  width: 35rem;
  height: 160px;
  margin-bottom: 1rem;
  border-radius: 15px;
  img {
    width: 160px;
    height: auto;
    border-radius: 15px 0 0 15px;
  }
  .card-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 2rem;
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
