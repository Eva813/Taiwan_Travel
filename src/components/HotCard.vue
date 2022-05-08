<template>
  <div class="container row d-flex flex-wrap g-1">
    <div
      class="col-3 hotCard-section"
      v-for="item in hotData"
      :key="item.ScenicSpotID"
    >
      <div class="card hotCard">
        <div class="image">
          <img :src="item.Picture" class="card-img-top" alt="hotPlace-image" />
        </div>

        <div class="card-body">
          <h5 class="card-title">{{ item.ScenicSpotName }}</h5>
          <p class="location">
            <fa icon="map-marker-alt" class="icon" />{{ item.Address }}
          </p>

          <router-link
            :to="{
              name: 'DetailPage',
              params: { ActivityID: item.ScenicSpotID },
              query: { Activity: item.ScenicSpotID },
            }"
            class="btn text-start ps-0"
            >詳細介紹 ></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from "vue";
import { getHotSpot } from "@/apis/index.js";
export default {
  props: {
    hotData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    //const hotData = props.hotData;
    // const getData = async () => {
    //   let data;
    //   await getHotSpot.get().then((response) => {
    //     data = response.map((item) => {
    //       if (Object.keys(item.Picture).length !== 0) {
    //         return {
    //           ScenicSpotID: item.ScenicSpotID,
    //           ScenicSpotName: item.ScenicSpotName,
    //           Picture: item.Picture.PictureUrl1,
    //           Address: item.Address,
    //         };
    //       }
    //     });
    //     hotData.value = data.filter((item) => {
    //       return item !== undefined;
    //     });
    //     //console.log(hotData.value);
    //   });
    // };
    // onMounted(() => {
    //   getData();
    // });
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/all.scss";
.container {
  margin-top: 0px;
}
.hotCard-section {
  padding: 0 12px;
}
.hotCard {
  border: none;
  height: 350px;
  width: 16rem;
  .card-body {
    text-align: left;
  }
  .image {
    height: 200px;
    width: 255px;
    img {
      border-radius: 15px;
      object-fit: cover;
      //width: 100%;
      height: 100%;
    }
  }

  .icon {
    margin-right: 3px;
    vertical-align: -2px;
  }
}
</style>






