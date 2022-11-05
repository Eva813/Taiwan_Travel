<template>
  <div class="container">
    <swiper :navigation="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(img, i) in bannerImages" :key="i">
        <img :src=img.imgSrc alt="" srcset="" />
      </swiper-slide>
      <!-- <swiper-slide>
        <img src="@/assets/image/central.jpg" alt="" srcset="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/image/taipei.jpg" alt="" srcset="" />
      </swiper-slide> -->
    </swiper>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

//import "./style.css";

// import required modules
import { Navigation } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props:{
    bannerImages:{
      type: Array,
      default: () => ([])
    }
  },
  setup(props) {
    console.log('props',props.bannerImages)
    // const bannerImages = reactive([
    //   {id:1, imgSrc: require('../assets/image/central.jpg')},
    //   {id:2, imgSrc: require('../assets/image/mountain.jpg')},
    //   {id:3, imgSrc: require('../assets/image/taipei.jpg')},
    // ])
    return {
      modules: [Navigation],
      
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 450px;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 40px;
  background: #fff;
  width: 100%;
  height: 100%;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  //display: block;
  width: 100%;
  height: 100%;
  margin: auto;
  vertical-align: middle;
  object-fit: cover;
  border-radius: 24px;
  object-position: 65% 58%;
}
</style>
