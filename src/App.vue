<template>
  <div id="app" class="bg-gradient-to-t from-white to-tgadgety-500 w-screen h-screen overflow-x-hidden">
    <transition :name="titleCheck()">
      <router-view :apiurl="apiUrl"/>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return{
      apiUrl: 'https://t-gadgetcors.herokuapp.com/https://t-gadgetapi.herokuapp.com'
    }
  },
  methods: {
    titleCheck(){
      let currentTitlePage = document.title.split('|');
      if(/login|sign up/g.test(currentTitlePage[1])){
        return 'slide-fade';
      }
      if(/dashboard|user auth/g.test(currentTitlePage[1])){
        return 'fade';
      }
    }
  }
}
</script>

<style>
  @font-face {
    font-family: "Rc-bold";
    src: local("Rc-bold"),
         url(./assets/fonts/RobotoCondensed-Bold.ttf) format("truetype");
  }
  @font-face {
    font-family: "Quicksand-Medium";
    src: local("Quicksand-Medium"),
         url(./assets/fonts/Quicksand-Medium.ttf) format("truetype");
  }
  @font-face {
    font-family: "Quicksand-SemiBold";
    src: local("Quicksand-SemiBold"),
         url(./assets/fonts/Quicksand-SemiBold.ttf) format("truetype");
  }
  @font-face {
    font-family: "Quicksand-Bold";
    src: local("Quicksand-Bold"),
         url(./assets/fonts/Quicksand-Bold.ttf) format("truetype");
  }

  .fade-enter-active {
    transition: opacity 1.5s linear;
  }
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    position: absolute;
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all 1.4s;
  }
  .slide-fade-leave-active {
    transition: all .4s;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    position: absolute;
    transform: translateX(10px);
    opacity: 0;
  }

</style>
