<template>
    <div
      id="dashboard-testimonies"
      class="pt-8 px-5">

        <PopUpAddTestimonies
          v-if="showPopUpAddTesti"
          :apiurl="apiurl"
          @gettestimonies="$emit('gettestimonies')"
          @popuphide="showPopUpAddTesti=false"
          @alert-on="$emit('alert-on',$event)"
          @loading-on="$emit('loading-on',$event)"
          @loading-msg="$emit('loading-msg',$event)"
          @show-successicon="$emit('show-successicon',$event)"
          @expired-on="$emit('expired-on')" />

        <h1
          id="title" 
          class="pt-5 text-tgadgety text-2xl sm:text-3xl capitalize italic opacity-80"
          style="font-family: 'Rc-bold';border-top: 1.5px solid rgba(237, 125, 44, 0.3);">
            testimonies
        </h1>
        <p
         id="total"
         class="text-tgadgety text-sm sm:tex-md italic opacity-80">
            total: {{(testimonies!='notfound') ? testimonies.length : 0}}
        </p>
        
        <div
          id="testimonie-wraper"
          class="bg-tgadgety-500 h-40 sm-400:h-56 py-4 px-5 mt-2 flex rounded-sm overflow-x-auto"
          :class="{'animate-pulse opacity-70': testimonies.length==0,'shadow-md': testimonies.length>0,'justify-center items-center text-center':testimonies=='notfound'}"
          style="">
            
            <!-- h1 not found -->
            <h1 
              v-if="testimonies=='notfound'"
              class="notfound text-xl sm:text-2xl text-white tracking-wide opacity-80"
              style="font-family: 'Rc-bold';">
                testimonies not found
            </h1>

            <!-- testimonies -->
            <div
              v-for="(data,index) of testimonies"
              :key="data.id"
              class="bg-tgadget min-w-max h-full relative rounded-sm overflow-hidden shadow-md"
              :class="{'hidden':testimonies=='notfound','mr-3':(index != testimonies.length-1) ? true : false}">
                <img
                  :src="data.img"
                  class="w-full h-full opacity-90" >
                <img
                  :src="require('@/assets/img/garbage-w.svg')"
                  class="w-7 p-1.5 absolute bottom-2 left-2 bg-tgadgety hover:bg-tgadgety-500 active:bg-tgadgety-500 rounded-sm cursor-pointer shadow-md" 
                  @click.prevent="showPopUpDelete({
                    id: data.id,
                    name: 'testimoni'
                  });" >
            </div>
        </div>

        <!-- btn add testi -->
        <button 
          class="w-full flex justify-center mt-2 px-3 py-2 rounded-md shadow-card tracking-widest transition-all text-white text-md sm-400:text-xl uppercase bg-tgadgety hover:bg-tgadgety-500"
          style="font-family: 'Quicksand-SemiBold';"
          @click.prevent="showPopUpAddTesti=true">
            add testi
        </button>
    </div>
</template>

<script>
import PopUpAddTestimonies from '@/components/PopUpAddTestimonies'

export default {
    props:['apiurl','testimonies'],
    components: {
      PopUpAddTestimonies,
    },
    data() {
      return{
        showPopUpAddTesti: false,
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