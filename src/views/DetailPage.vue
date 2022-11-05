<template>
  <div>
    <Swiper v-if="pageData.images" :bannerImages=pageData.images></Swiper>
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
      </div>
        <div class="mapContainer mt-3" ref="mapContainer"></div>
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
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "Detail",
  components: {
    Swiper,
    ActiveSlot,
    HotspotsSlot,
  },
  setup() {
    const route = useRoute();
    const activityID = route.params
    const activityName = ref('')
    const category = ref("");
    const pageData = ref({});

    // // 預設經緯度在信義區附近
    const location = reactive({
      lat: 51.505,
      lng  :  -0.09,
    });

    const getDetailInfo = async (category) => {
      switch (category) {
        case "C2": //觀光活動
          await filterActivity
            .get(`${route.query["Activity"]}`)
            .then((res) => {
              console.log("res", res);
              // console.log("res333", res[0].Position.PositionLat);
              let data = res.map((item,i) => {
                return {
                  ActivityName: item.ActivityName,
                  ActivityID: item.ActivityID,
                  Description: item.Description,
                  activeTime: item.StartTime,
                  image1: item.Picture.PictureUrl1,
                  image2: item.Picture.PictureUrl2,
                  image3: item.Picture.PictureUrl3,
                  images:[{
                    id: i+1,
                    imgSrc: item['Picture'].PictureUrl1
                  }],
                  org: item.Organizer,
                  Address: item.Address,
                  lat: item.PositionLat,
                  lng:item.PositionLon,
                  
                };
              });

              location.lat = res[0].Position.PositionLat
              location.lng = res[0].Position.PositionLon
              activityName.value = res[0].ActivityName


              pageData.value = data[0];
              console.log(pageData.value);
          
            });
          break;
        case "C1": //熱門景點
          await filterHotScenicSpot
            .get(`${route.query["Activity"]}`)
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
                  lat: item.PositionLat,
                  lng:item.PositionLon,
                };
              });
              location.lat = res[0].Position.PositionLat
              location.lng = res[0].Position.PositionLon
              activityName.value = res[0].ActivityName
              pageData.value = data[0];
              console.log('page:',pageData.value);
            });
          break;
        default:
          alert("沒有符合的條件");
      }
    };

    const categoryPage = async() => {
      console.log('rrr',route.query)
      if (!route.params) return;
      category.value = route.query["Activity"].slice(0, 2);
      console.log("category", category.value);
      await getDetailInfo(category.value);
      setMap()
    };

    //地圖
    const mapContainer = ref(null);

    const setMap = ()=>{
    const map = L.map(mapContainer.value, {
            center: [location.lat, location.lng ],
            zoom: 16,
          });

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);
          L.marker([location.lat, location.lng ]).addTo(map)
            .bindPopup(`${pageData.value.ActivityName}`)
            .openPopup();
    }
    categoryPage();
    // onMounted(() => {
    //   categoryPage();
    //   // console.log(location)
    // });
    return {
      pageData,
      category,
      mapContainer,

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

.mapContainer {
  width: 100%;
  height: 300px;
}
</style>
