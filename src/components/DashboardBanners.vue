<template>
    <div
      id="dashboard-banners"
      class="pt-8 px-5">

        <PopUpAddBanners
          v-if="showPopUpAddBanners"
          :apiurl="apiurl"
          @getbanners="$emit('getbanners')"
          @popuphide="showPopUpAddBanners=false"
          @alert-on="$emit('alert-on',$event)"
          @loading-on="$emit('loading-on',$event)"
          @loading-msg="$emit('loading-msg',$event)"
          @show-successicon="$emit('show-successicon',$event)"
          @expired-on="$emit('expired-on')" />

        <h1
          id="title" 
          class="pt-5 text-tgadgety text-2xl sm:text-3xl capitalize italic opacity-80"
          style="font-family: 'Rc-bold';border-top: 1.5px solid rgba(237, 125, 44, 0.3);">
            banners 
            <span
              v-if="banners!='notfound'"
              class="text-lg"
              style="font-family: 'Quicksand-Regular';">
              ({{mode}})
            </span>
        </h1>
        <p
         id="total"
         class="text-tgadgety text-sm sm:tex-md italic opacity-80">
            total: {{(banners!='notfound') ? banners.length : 0}}
        </p>
        
        <div
          id="testimonie-wraper"
          class="bg-tgadgety-500 h-48 sm-400:h-72 py-4 px-5 mt-2 flex rounded-sm overflow-x-auto"
          :class="{'animate-pulse opacity-70': banners.length==0,'shadow-md': banners.length>0,'justify-center items-center text-center':banners=='notfound'}"
          style="">
            
            <!-- h1 not found -->
            <h1 
              v-if="banners=='notfound'"
              class="notfound text-xl sm:text-2xl text-white tracking-wide opacity-80"
              style="font-family: 'Rc-bold';">
                banner not found
            </h1>

            <!-- testimonies -->
            <div
              v-for="(data,index) of banners"
              :key="data.id"
              class="bg-tgadget min-w-max h-full relative rounded-sm overflow-hidden shadow-md"
              :class="{'hidden':banners=='notfound','mr-3':(index != banners.length-1) ? true : false}">
                <img
                  v-if="mode == 'desktop'"
                  :src="data.img_desktop"
                  class="w-full h-full opacity-90" >
                <img
                  v-if="mode == 'mobile'"
                  :src="data.img_mobile"
                  class="w-full h-full opacity-90" >
                <img
                  v-if="mode == 'desktop'"
                  :src="require('@/assets/img/mobile.svg')"
                  class="w-7 p-1.5 absolute bottom-2 left-12 bg-tgadgety hover:bg-tgadgety-500 active:bg-tgadgety-500 rounded-sm cursor-pointer shadow-md" 
                  @click="mode = 'mobile'" >
                <img
                  v-if="mode == 'mobile'"
                  :src="require('@/assets/img/desktop.svg')"
                  class="w-7 p-1.5 absolute bottom-2 left-12 bg-tgadgety hover:bg-tgadgety-500 active:bg-tgadgety-500 rounded-sm cursor-pointer shadow-md" 
                  @click="mode = 'desktop'" >
                <img
                  :src="require('@/assets/img/garbage-w.svg')"
                  class="w-7 p-1.5 absolute bottom-2 left-2 bg-tgadgety hover:bg-tgadgety-500 active:bg-tgadgety-500 rounded-sm cursor-pointer shadow-md" 
                  @click="showPopUpDelete({
                    id: data.id,
                    name: 'banner'
                  });" >
            </div>
        </div>

        <!-- btn add testi -->
        <button 
          class="w-full flex justify-center mt-2 px-3 py-2 rounded-md shadow-card tracking-widest transition-all text-white text-md sm-400:text-xl uppercase bg-tgadgety hover:bg-tgadgety-500"
          style="font-family: 'Quicksand-SemiBold';"
          @click.prevent="showPopUpAddBanners=true">
            add banner
        </button>
    </div>
</template>

<script>
import PopUpAddBanners from '@/components/PopUpAddBanners'

export default {
    props:['apiurl','banners'],
    components: {
      PopUpAddBanners,
    },
    data() {
      return{
        mode   : 'desktop',
        showPopUpAddBanners: false,
      }
    },
    methods: {
      showPopUpDelete(data){
        this.$emit('showpopupdelete');
        this.$emit('changetargetdelete',data);
      }
    },
}
</script>

<style scoped>

</style>