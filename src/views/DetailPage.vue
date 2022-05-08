<template>
  <div>
    <Swiper />
    <h2 class="mt-3">{{ pageData.ActivityName }}</h2>
    <section class="active-content">
      <!-- <span>{{ pageData.subTitle }}</span> -->
      <p class="m-3 text-start">{{ pageData.Description }}</p>
    </section>
    <section class="active-info">
      <!-- 要判斷活動、景點 是否拆成component,然後判斷3種情境-->
      <div class="row g-2">
        <div class="col-6">
          <ActiveSlot v-if="category == 'C2'">
            <template v-slot:time>{{ pageData.activeTime }}</template>
            <!-- <template v-slot:phone>{{ pageData.聯絡電話 }}</template> -->
            <template v-slot:org>{{ pageData.org }}</template>
            <template v-slot:location>{{ pageData.Address }}</template>
            <!-- <template v-slot:site>{{ pageData.官方網站 }}</template> -->
          </ActiveSlot>
          <HotspotsSlot v-if="category == 'C1'">
            <template v-slot:time>{{ pageData.Time }}</template>
            <template v-slot:phone>{{ pageData.Phone }}</template>
            <template v-slot:location>{{ pageData.Address }}</template>
            <template v-slot:ticket>{{ pageData.TicketInfo }}</template>
          </HotspotsSlot>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import Swiper from "@/components/Swiper.vue";
import ActiveSlot from "@/components/ActiveSlot.vue";
import HotspotsSlot from "@/components/HotspotsSlot.vue";
import { useRoute } from "vue-router";
import { filterActivity, filterHotScenicSpot } from "@/apis/index.js";

export default {
  name: "Detail",
  components: {
    Swiper,
    ActiveSlot,
    HotspotsSlot,
  },
  setup() {
    const route = useRoute();
    const category = ref("");
    const pageData = ref({});
    const getDetailInfo = async (category) => {
      switch (category) {
        case "C2": //觀光活動
          await filterActivity
            .get(`${route.params["ActivityID"]}`)
            .then((res) => {
              console.log("res", res);
              let data = res.map((item) => {
                return {
                  ActivityName: item.ActivityName,
                  ActivityID: item.ActivityID,
                  Description: item.Description,
                  activeTime: item.StartTime,
                  image1: item.Picture.PictureUrl1,
                  image2: item.Picture.PictureUrl2,
                  image3: item.Picture.PictureUrl3,
                  org: item.Organizer,
                  Address: item.Address,
                };
              });
              pageData.value = data[0];
              console.log(pageData.value);
            });
          break;
        case "C1": //熱門景點
          await filterHotScenicSpot
            .get(`${route.params["ActivityID"]}`)
            .then((res) => {
              console.log("res", res);
              let data = res.map((item) => {
                return {
                  ActivityName: item.ScenicSpotName,
                  ActivityID: item.ScenicSpotID,
                  Description: item.Description,
                  image1: item.Picture.PictureUrl1,
                  Phone: item.Phone,
                  Address: item.Address,
                  TicketInfo: item.TicketInfo,
                  Time: item.OpenTime,
                };
              });
              pageData.value = data[0];
              console.log(pageData.value);
            });
          break;
        default:
          alert("沒有符合的條件");
      }
    };

    const categoryPage = () => {
      if (!route.params) return;
      category.value = route.params["ActivityID"].slice(0, 2);
      console.log("category", category.value);
      getDetailInfo(category.value);
    };

    onMounted(() => {
      categoryPage();
      console.log("router", route.params["ActivityID"]);
    });
    return {
      pageData,
      category,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/all.scss";
.info {
  padding: 10px;
  text-align: left;
  & > span {
    display: block;
  }
}
</style>
