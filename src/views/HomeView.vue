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
      <div class="col-5 selection-part flex-column pt-4">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle dropdown-btn rounded"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <!-- 搜尋 -->
        <div>
          <div class="search-form rounded mb-2">
            <input
              type="search"
              id="form1"
              class="form-control"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          <button
            type="button"
            class="btn btn-info serch-button d-flex rounded"
          >
            Info
          </button>
        </div>
      </div>
    </div>
  </div>
  <Swiper />
  <h2 class="text-title">近期活動</h2>
  <ActiveCard />
  <h2 class="text-title">熱門打卡景點</h2>
  <HotCard />
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Swiper from "@/components/Swiper.vue";
import ActiveCard from "@/components/ActiveCard.vue";
import HotCard from "@/components/HotCard.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Swiper,
    ActiveCard,
    HotCard,
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/all.scss";
.title {
  font-size: 3rem;
}
.dropdown {
  width: 50%;
  margin-bottom: 1rem;
}
.dropdown-btn {
  width: 100%;
  background-color: #7f977b;
}
.dropdown-menu {
  width: 100%;
}
.serch-button {
  width: 50%;
  background-color: #7f977b;
}
.secontion-one {
  margin: 80px 0;
}
.text-title {
  margin: 2rem 0;
  text-align: left;
}
</style>
