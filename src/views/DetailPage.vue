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
        <!-- <div class="col-6">
          <template>
            <h2 class="text-center text-secondary pb-2">景點地圖顯示</h2>
            <div class="map-container border rounded">
            
            </div>
          </template>
        </div> -->
      </div>
      <!-- <div class="google-map" id="map"></div> -->
        <div class="mapContainer" ref="mapContainer"></div>

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
            .get(`${route.params["ActivityID"]}`)
            .then((res) => {
              console.log("res", res);
              console.log("res333", res[0].Position.PositionLat);
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
              location.lat = res[0].Position.PositionLat
              location.lng = res[0].Position.PositionLon


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

    const categoryPage = async() => {
    
      if (!route.params) return;
      category.value = route.params["ActivityID"].slice(0, 2);
      console.log("category", category.value);
      await getDetailInfo(category.value);
      console.log('location',location)
      setMap()
    };

    //地圖
    const mapContainer = ref(null);

    // const location = reactive([51.505, -0.09]);
    
    // //https://ithelp.ithome.com.tw/articles/10238282
    // const initMap = () => {
    //   map.value = new google.maps.Map(document.getElementById("map"), {
    //     // 設定地圖的中心點經緯度位置
    //     center: { lat: location.lat, lng: location.lng },
    //     // 設定地圖縮放比例 0-20
    //     zoom: 16,
    //     // 限制使用者能縮放地圖的最大比例
    //     maxZoom: 20,
    //     // 限制使用者能縮放地圖的最小比例
    //     minZoom: 3,
    //     // 設定是否呈現右下角街景小人
    //     streetViewControl: false,
    //     // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
    //     mapTypeControl: false,
    //   });
    // };
    // const setMap = () => {
    //   // 建立一個新地標
    //   const marker = new google.maps.Marker({
    //     // 設定地標的座標
    //     position: { lat: location.lat, lng: location.lng },
    //     // 設定地標要放在哪一個地圖
    //     map: map.value,
    //   });
    // };

    const setMap = ()=>{
     const map = L.map(mapContainer.value, {
            center: [location.lat, location.lng ],
            zoom: 16,
          });

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);
    }


    onMounted(() => {
      categoryPage();
      console.log(location)

 
      // initMap();
      // console.log("router", route.params["ActivityID"]);
    });
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
