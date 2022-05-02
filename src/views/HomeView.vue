<template>
  <div class="container secontion-one">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="row justify-content-center">
      <div class="col-5">
        <div class="topic lh-lg">
          <h2 class="title text-start lh-base">
            探索台灣之美 <br />
            讓我們更親近這片土地
          </h2>
          <div class="text-start">
            icon 台灣旅遊景點導覽 Taiwan Travel Guide
          </div>
        </div>
      </div>
      <div class="col-5 selection-part flex-column pt-4 justify-content-start">
        <div class="dropdown-section">
          <select
            class="select-items rounded-3"
            v-model="city"
            @change="handleSelect(city)"
          >
            <option disabled value="">請選擇縣市</option>
            <option v-for="(item, index) in cityList" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
        <!-- 搜尋 -->
        <div>
          <!-- <div class="search-form rounded mb-2">
            <input
              type="search"
              id="form1"
              class="form-control"
              placeholder="Search"
              aria-label="Search"
            />
          </div> -->
          <button
            type="button"
            class="btn serch-button d-flex rounded"
            @click="$router.push({ name: 'SearchResult', params: { city } })"
          >
            搜尋
          </button>
        </div>
      </div>
    </div>
  </div>
  <Swiper />
  <h2 class="text-title">近期活動</h2>
  <ActiveCard :activeData="activeData" />
  <h2 class="text-title">熱門打卡景點</h2>
  <HotCard :hotData="hotData" />
</template>

<script>
// @ is an alias to /src
import { reactive, onMounted, ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Swiper from "@/components/Swiper.vue";
import ActiveCard from "@/components/ActiveCard.vue";
import HotCard from "@/components/HotCard.vue";
import { getHotSpot, getActiveData } from "@/apis/index.js";
import { CityList } from "@/utility/City";

export default {
  name: "Home",
  components: {
    Navbar,
    Swiper,
    ActiveCard,
    HotCard,
  },
  setup() {
    const hotData = ref([]);
    const activeData = ref([]);
    const cityList = Object.values(CityList);
    const city = ref("");

    const handleSelect = (city) => {
      console.log("ddd", city);
    };

    const getData = async () => {
      let data;
      let data2;
      await getHotSpot.get().then((response) => {
        data = response.map((item) => {
          if (Object.keys(item.Picture).length !== 0) {
            return {
              ScenicSpotID: item.ScenicSpotID,
              ScenicSpotName: item.ScenicSpotName,
              Picture: item.Picture.PictureUrl1,
              Address: item.Address,
            };
          }
        });

        hotData.value = data.filter((item) => {
          return item !== undefined;
        });
        //console.log(hotData.value);
      });

      await getActiveData.get().then((response) => {
        //console.log(response);
        data2 = response.map((item) => {
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
        activeData.value = data2.filter((item) => {
          return item !== undefined;
        });
      });
    };
    onMounted(() => {
      getData();
      //console.log(city.value);
    });
    return {
      hotData,
      activeData,
      cityList,
      handleSelect,
      city,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/all.scss";
.title {
  font-size: 3rem;
}
.dropdown-section {
  text-align: left;
}
select {
  background: #003d79;
  color: #fff;
  border: 1px solid #e6e6e6;
  margin-bottom: 1rem;
  width: 50%;
  height: 3em;
  padding: 10px;
  position: relative;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(#7f977b, #7f977b);
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E"),
    -webkit-linear-gradient(#003d79, #003d);
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E"),
    -moz-linear-gradient(#003d79, #003d79);
  background-position: right 0.5em top 50%, 0 0;
  background-size: contain, cover;
  background-repeat: no-repeat, repeat;
}

option {
  appearance: none;
  background: #fff;
  position: absolute;
}

.input-section {
  width: 50%;

  > input {
    border: 1px solid #e6e6e6;
    background-color: #f9f9f9;
    margin: 15px 15px 15px 0;
    height: 3em;
    width: 100%;
    &::placeholder {
      padding: 10px;
    }
  }
}

// .dropdown-menu {
//   width: 100%;
// }
.serch-button {
  width: 50%;
  background-color: #7f977b;
  color: #fff;
  text-align: center;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #fff;
    background-color: #515e4f;
  }
}
.secontion-one {
  margin: 80px 0;
}
.text-title {
  margin: 2rem 0;
  text-align: left;
}
</style>
