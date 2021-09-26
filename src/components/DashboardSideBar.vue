<template>
    <div
      id="dashboard-sidebar"
      class="bg-tgadgety fixed sm:relative bottom-0 z-20 sm:z-10 w-full sm:w-36 lg-930:w-52 h-auto sm:h-full sm:flex flex-col rounded-t-md sm:rounded-t-none overflow-hidden" 
      :class="{' z-40 sm:z-20':z20active}"
      style="font-family: 'Quicksand-Medium';">

        <DashboardEvent 
          v-if="showEvent"
          :apiurl="apiurl"
          @close="close()"
          @alert-on="$emit('alert-on',$event)"
          @expired-on="$emit('expired-on')"
          @loading-on="$emit('loading-on',$event)"
          @loading-msg="$emit('loading-msg',$event)"
          @show-successicon="$emit('show-successicon',$event)" />

        <DashboardSettings 
          v-if="showSetting"
          :apiurl="apiurl"
          @close="close()"
          @alert-on="$emit('alert-on',$event)"
          @expired-on="$emit('expired-on')"
          @loading-on="$emit('loading-on',$event)"
          @loading-msg="$emit('loading-msg',$event)"
          @show-successicon="$emit('show-successicon',$event)"
          @change-username="$emit('change-username',$event)" />

        <!-- logo t-gadget -->
        <div class="logo-wraper hidden sm:block opacity-80 mb-0 px-10 lg-930:px-16 py-7 border-b border-tgadgety-500">
            <img :src="require('@/assets/img/logo-t-white.svg')">
        </div>

        <!-- href wraper -->
        <div class="href-wraper w-full flex-1 flex flex-row sm:flex-col overflow-auto">
            
            <!-- statistik -->
            <a 
              href="#" 
              v-scroll-to="{
                el: '#dashboard-header',
                container: 'main',
              }"
              @click.prevent="" 
              class="w-full flex justify-center sm:justify-between items-center pl-0 sm:pl-5 py-6 md:py-4 text-white transition-all hover:bg-tgadgety-500 active:bg-tgadgety-500 border-b border-tgadgety-500 opacity-80 hover:opacity-100 active:opacity-100">
                <img class="w-4 lg-930:w-5" :src="require('@/assets/img/stats.svg')">
                <h1 class="hidden sm:block flex-1 text-xs lg-930:text-sm tracking-widest capitalize ml-4">statistics</h1>
            </a>

            <!-- event -->
            <a 
              href=""
              @click.prevent="funcShowEvent()" 
              class="w-full flex justify-center sm:justify-between items-center pl-0 sm:pl-5 py-6 md:py-4 text-white transition-all hover:bg-tgadgety-500 active:bg-tgadgety-500 border-b border-tgadgety-500 opacity-80 hover:opacity-100 active:opacity-100">
                <img class="w-4 lg-930:w-5" :src="require('@/assets/img/event.svg')">
                <h1 class="hidden sm:block flex-1 text-xs lg-930:text-sm tracking-widest capitalize ml-4">event</h1>
            </a>

            <!-- product -->
            <a 
              href="#"
              v-scroll-to="{
                el: '#dashboard-products',
                container: 'main',
              }"
              @click.prevent="" 
              class="w-full flex justify-center sm:justify-between items-center pl-0 sm:pl-5 py-6 md:py-4 text-white transition-all hover:bg-tgadgety-500 active:bg-tgadgety-500 border-b border-tgadgety-500 opacity-80 hover:opacity-100 active:opacity-100">
                <img class="w-4 lg-930:w-5" :src="require('@/assets/img/product.svg')">
                <h1 class="hidden sm:block flex-1 text-xs lg-930:text-sm tracking-widest capitalize ml-4">products</h1>
            </a>

            <!-- testimonies -->
            <a 
              href="#"
              v-scroll-to="{
                el: '#dashboard-testimonies',
                container: 'main',
              }"
              @click.prevent="" 
              class="w-full flex justify-center sm:justify-between items-center pl-0 sm:pl-5 py-6 md:py-4 text-white transition-all hover:bg-tgadgety-500 active:bg-tgadgety-500 border-b border-tgadgety-500 opacity-80 hover:opacity-100 active:opacity-100">
                <img class="w-4 lg-930:w-5" :src="require('@/assets/img/testimonial.svg')">
                <h1 class="hidden sm:block flex-1 text-xs lg-930:text-sm tracking-widest capitalize ml-4">testimonial</h1>
            </a>

            <!-- banners -->
            <a 
              href="#"
              v-scroll-to="{
                el: '#dashboard-banners',
                container: 'main',
              }"
              class="w-full flex justify-center sm:justify-between items-center pl-0 sm:pl-5 py-6 md:py-4 text-white transition-all hover:bg-tgadgety-500 active:bg-tgadgety-500 border-b border-tgadgety-500 opacity-80 hover:opacity-100 active:opacity-100">
                <img class="w-4 lg-930:w-5" :src="require('@/assets/img/banner.svg')">
                <h1 class="hidden sm:block flex-1 text-xs lg-930:text-sm tracking-widest capitalize ml-4">banner</h1>
            </a>

            <!-- settings -->
            <a 
            href=""
            @click.prevent="funcShowSetting()" 
            class="w-full flex justify-center sm:justify-between items-center pl-0 sm:pl-5 py-6 md:py-4 text-white transition-all hover:bg-tgadgety-500 active:bg-tgadgety-500 border-b border-tgadgety-500 opacity-80 hover:opacity-100 active:opacity-100">
                <img class="w-4 lg-930:w-5" :src="require('@/assets/img/setting.svg')">
                <h1 class="hidden sm:block flex-1 text-xs lg-930:text-sm tracking-widest capitalize ml-4">settings</h1>
            </a>

            <!-- logout -->
            <a 
            href=""
            @click.prevent="doLogOut()" 
            class="w-full flex justify-center sm:justify-between items-center pl-0 sm:pl-5 py-6 md:py-4 text-white transition-all hover:bg-tgadgety-500 active:bg-tgadgety-500 border-b border-tgadgety-500 opacity-80 hover:opacity-100 active:opacity-100">
                <img class="w-4 lg-930:w-5" :src="require('@/assets/img/logout.svg')">
                <h1 class="hidden sm:block flex-1 text-xs lg-930:text-sm tracking-widest capitalize ml-4">log out</h1>
            </a>

            <!-- footer -->
            <small class="w-full flex-1 pt-4 pb-4 hidden sm:flex flex-col justify-end items-center text-white opacity-80 text-center">
                <span>
                  build with &hearts; by <a href="https://github.com/korospace" target="_blank" class="font-extrabold underline">korospace</a>
                </span>
            </small>
        </div>
    </div>
</template>

<script>
import DashboardEvent    from '@/components/DashboardEvent'
import DashboardSettings from '@/components/DashboardSettings'

export default {
  props:['apiurl'],
  components: {
    DashboardEvent,
    DashboardSettings,
  },
  data(){
    return{
      showEvent      : false,
      showSetting    : false,
      z20active      : false,
      userdata       : JSON.parse(localStorage.getItem('userdata')),
    }
  },
  methods:{
    funcShowEvent(){
      this.z20active  = true;
      this.showEvent  = true;
    }, 
    funcShowSetting(){
      this.z20active  = true;
      this.showSetting= true;
    }, 
    close(){
      this.showEvent  = false;
      this.showSetting= false;

      setTimeout(() => {
        this.z20active  = false;
      }, 400);
    }, 
    doLogOut(){
      this.$emit('loading-on',true);
      this.$emit('loading-msg',"please wait!");

      this.axios
      .delete(`${this.$props.apiurl}/user/logout`, {
        headers: {
          'api-key': this.userdata.api_key,
          "token"  : this.userdata.token,
        }
      })
      .then((response) => {
        if(response.status == 202){
          this.$emit('loading-on',false);
          this.$emit('loading-msg',"");
          
          setTimeout(() => {
            localStorage.removeItem('userdata');
            this.$router.push({name: 'Login'});
          }, 600);
        }
      })
      .catch((error) => {
        this.$emit('loading-on',false);
        this.$emit('loading-msg',"");
        
        // if Unauthorized OR Token expired
        if(error.response.status == 401){
          setTimeout(() => {
            localStorage.removeItem('userdata');
            this.$router.push({name: 'Login'});
          }, 600);
        }
        // if Server error
        if(error.response.status == 500){
          this.$emit('alert-on',{
              type:'danger',
              msg: '<b>Ups, something wrong</b> Please try again'
          });
        }
      })
    },
  },
}
</script>

<style scoped>

</style>