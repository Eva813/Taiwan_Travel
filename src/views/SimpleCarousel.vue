<template>
  <div>
    <transition-group tag="div" class="container" :name="transitionName">
      <div
        class="page"
        v-for="(img, index) of imgs"
        :key="index"
        v-show="index === show"
      >
        <img :src="img.src" />
      </div>
    </transition-group>
    <button @click="setShow(show - 1)">←</button>
    <span>
      <button
        v-for="num in imgs.length"
        :key="num - 1"
        @click="setShow(num - 1)"
      >
        {{ num }}
      </button>
    </span>
    <button @click="setShow(show + 1)">→</button>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
let timer;
const interval = 5000;
export default {
  data() {
    return {
      transitionName: "slids-right",
      show: 0,
      imgs: [
        { src: require("../assets/image/im1.jpeg") },
        { src: require("../assets/image/im2.jpeg") },
        { src: require("../assets/image/im3.jpeg") },
        { src: require("../assets/image/im4.jpeg") },
        { src: require("../assets/image/im5.jpeg") },
      ],
    };
  },
  mounted() {
    // timer = setInterval(this.nextShow, interval);
  },
  methods: {
    // setShow(index) {
    //   this.show = index;
    // },
    nextShow() {
      this.show++;
    },
    setShow(index) {
      console.log(this.show);
      console.log(index);

      //可以用三元整理
      if (index < 0) {
        this.transitionName = "slids-left";
        this.show = this.imgs.length - 1;
      } else if (index > this.imgs.length - 1) {
        this.transitionName = "slids-right";
        this.show = 0;
      } else {
        this.transitionName = this.show < index ? "slids-right" : "slids-left";
        this.show = index;
      }
    },
  },
  // watch: {
  //   show(nVal, oVal) {
  //     if (nVal < 0) {
  //       this.show = this.imgs.length - 1;
  //     } else if (nVal > this.imgs.length - 1) {
  //       this.show = 0;
  //     } else {
  //       if (oVal < 0) this.transitionName = "slids-left";
  //       else if (oVal > this.imgs.length - 1)
  //         this.transitionName = "slids-right";
  //       else this.transitionName = nVal > oVal ? "slids-right" : "slids-left";
  //     }
  //   },
  // },
};
</script>

<style scoped>
.right-in-enter {
  left: 100%;
}
.right-in-enter-active,
.right-in-leave-active {
  transition: left 0.5s;
}
.right-in-enter-to,
.right-in-leave {
  left: 0%;
}
.right-in-leave-to {
  left: -100%;
}
.left-in-enter {
  left: -100%;
}
.left-in-enter-active,
.left-in-leave-active {
  transition: left 0.5s;
}
.left-in-enter-to,
.left-in-leave {
  left: 0%;
}
.left-in-leave-to {
  left: 100%;
}

.slids-right-enter-active,
.slids-right-leave-active {
  transition: transform 0.3s ease;
}
.slids-right-enter-from {
  transform: translateX(-300px);
}
.slids-right-leave-to {
  transform: translateX(500px);
}
.slids-left-enter-active,
.slids-left-leave-active {
  transition: transform 0.3s ease;
}
.slids-left-enter-from {
  transform: translateX(500px);
}
.slids-left-leave-to {
  transform: translateX(-100px);
}
.container {
  position: relative;
  width: 400px;
  height: 480px;
  margin: 0 auto;
  overflow: hidden;
}
.page {
  position: absolute;
  width: 400px;
  height: 480px;
}
</style>
