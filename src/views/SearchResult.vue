<template>
  <div class="container">
    <div class="serchBar d-flex align-items-center justify-content-around">
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
      <div class="input-section">
        <input
          class="rounded-3"
          type="text"
          placeholder="你想去哪裡？請輸入關鍵字"
        />
      </div>
      <button class="btn search-btn rounded-3">搜尋</button>
    </div>
    <div class="section">
      <h2>
        搜尋結果
        <p class="search-sapn">共有{{ listNumber }}筆</p>
      </h2>
      <HotCard v-if="hotData.length > 0" :hotData="hotData" />
      <div v-else class="search-null">目前查無資料，請重新搜尋</div>
    </div>
    <div class="section">
      <div aria-label="Page navigation example">
        <ul
          class="pagination justify-content-center pages"
          @click.prevent="handlePagination($event)"
        >
          <li :class="['page-item', pagination.isFirst ? 'disabled' : '']">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            :class="['page-item', pagination.nowPage == number ? 'active' : '']"
            v-for="number in pagination.totalPages"
          >
            <a class="page-link" href="#" :data-page="number">{{ number }}</a>
          </li>
          <!-- <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li> -->
          <li :class="['page-item', pagination.isLast ? 'disabled' : '']">
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              :data-page="pagination.nowPage + 1"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import HotCard from "@/components/HotCard.vue";
import { CityList } from "@/utility/City";
import { filterCity } from "@/apis/index.js";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    HotCard,
  },
  setup() {
    const route = useRoute();
    const cityList = Object.values(CityList);
    const city = ref("");
    const listNumber = ref(0);
    const hotData = ref([]);
    const allData = ref([]);

    //https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
    const getKeyByValue = (object, value) => {
      return Object.keys(object).find((key) => object[key] === value);
    };
    const pagination = ref({
      totalPages: 0,
      nowPage: 1,
      isFirst: true,
      isLast: false,
    });
    //使用change 來監測變化
    const handleSelect = (city) => {
      console.log("ddd", city);
      getCityData(city);
    };

    const getCityData = async (city) => {
      let data;
      let cityValue = getKeyByValue(CityList, city);

      await filterCity.get(cityValue).then((res) => {
        //取得城市資料
        listNumber.value = res.length;

        data = res.map((item) => {
          //console.log(item.Picture.PictureUrl1);
          return {
            ScenicSpotID: item.ScenicSpotID,
            ScenicSpotName: item.ScenicSpotName,
            Picture: item.Picture.PictureUrl1
              ? item.Picture.PictureUrl1
              : require("@/assets/image/no-image.jpg"),
            Address: item.Address,
          };
        });

        allData.value = data;
        // 初始取得資料渲染第一頁
        renderPage(pagination.value.nowPage);
      });
    };

    const renderPage = (nowPage) => {
      // 假設一頁 20 筆
      let dataPerPage = 20;
      let totalPages = Math.ceil(allData.value.length / dataPerPage); // 需要的頁數（無條件進位）
      let minData = dataPerPage * nowPage - dataPerPage + 1;
      let maxData = dataPerPage * nowPage;
      // console.log('minData', minData, 'maxData', maxData);
      // 取出當前頁數的資料
      let currentData = [];
      allData.value.forEach((item, index) => {
        if (index + 1 >= minData && index + 1 <= maxData) {
          currentData.push(item);
        }
      });

      hotData.value = currentData;
      // 頁數資訊
      pagination.value = {
        totalPages: totalPages, // 總頁數
        nowPage: nowPage, // 當前頁數
        isFirst: nowPage == 1, // 是否為第一頁
        isLast: nowPage == totalPages, // 是否為最後一頁
      };
      console.log("page", pagination.value);
      // 呈現分頁按鈕
      //renderPageBtn(pageInfo);
    };
    // const renderPageBtn = (pageInfo) => {
    //   let str = "";
    //   let totalPages = pageInfo.totalPages;
    // };

    const handlePagination = (event) => {
      console.log("eee", event.target.dataset.page);
      pagination.value.nowPage = event.target.dataset.page;
      renderPage(pagination.value.nowPage);
    };

    watch(
      () => city.value,
      (newVal, oldVal) => {
        //console.log("newVal", newVal, "oldVal", oldVal);
        if (newVal !== oldVal) {
          handleSelect(newVal);
        } else {
          handleSelect(oldVal);
        }
      }
    );
    onMounted(() => {
      //handleSelect(city.value);
      console.log("route:", route.params);
      if (route.params) {
        getCityData(route.params.city);
      }
    });
    return {
      cityList,
      city,
      handleSelect,
      hotData,
      listNumber,
      pagination,
      handlePagination,
    };
  },
};
</script>


<style lang="scss" scoped>
@import "~@/assets/all.scss";

//https://huanyichuang.com/blog/styling-select-dropdown/
select {
  background: #003d79;
  color: #737373;
  border: 1px solid #e6e6e6;
  margin: 15px;
  width: 240px;
  height: 3em;
  padding: 10px;
  position: relative;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(#f9f9f9, #f9f9f9);
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
.search-btn {
  width: 20%;
  padding: 10px;
  background-color: #7f977b;
  height: 3em;
  margin: 15px 15px 15px 0;
  margin-left: 10px;
}

.search-sapn {
  display: inline-block;
}
.search-null {
  height: 57vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
