<template>
    <div
      id="dashboard-testimonies"
      class="pt-8 px-5">
        
        <PopUpDelete
          v-if="showPopUpDelete"
          :apiurl="apiurl"
          :targetdelete="targetDelete"
          @updatedata="updateTestimonies()"
          @popuphide="showPopUpDelete=false"
          @alert-on="$emit('alert-on',$event)"
          @expired-on="$emit('expired-on')"
          @loading-on="$emit('loading-on',$event)"
          @loading-msg="$emit('loading-msg',$event)"
          @show-successicon="$emit('show-successicon',$event)" />

        <PopUpAddTestimonies
          v-if="showPopUpAddTesti"
          :apiurl="apiurl"
          @gettestimonies="getTestimonies()"
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
          class="bg-tgadgety-500 py-4 px-5 mt-2 flex rounded-sm overflow-x-auto"
          :class="{'min-h-40 sm-400:min-h-56': testimonies.length==0 || testimonies=='notfound','animate-pulse opacity-70': testimonies.length==0,'shadow-md': testimonies.length>0,'justify-center items-center text-center':testimonies=='notfound'}"
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
              class="bg-tgadget min-w-max relative rounded-sm overflow-hidden shadow-md"
              :class="{'hidden':testimonies=='notfound','mr-3':(index != testimonies.length-1) ? true : false}">
                <img
                  :src="data.img"
                  class="opacity-90" 
                  style="width: 344px; height: 180px;">
                <img
                  :src="require('@/assets/img/garbage-w.svg')"
                  class="w-7 p-1.5 absolute bottom-2 left-2 bg-tgadgety hover:bg-tgadgety-500 active:bg-tgadgety-500 rounded-sm cursor-pointer shadow-md" 
                  @click.prevent="funcShowPopUpDelete({
                    id: data.id,
                    name: 'testimony'
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
import PopUpDelete         from '@/components/PopUpDelete'

export default {
  props:['apiurl'],
  components: {
    PopUpAddTestimonies,
    PopUpDelete,
  },
  data() {
    return{
      testimonies: [],
      showPopUpAddTesti: false,
      showPopUpDelete  : false,
      targetDelete     : '',
      userdata         : JSON.parse(localStorage.getItem('userdata')),
    }
  },
  methods: {
    getTestimonies(){
      this.testimonies = [];

      this.axios
          .get(`${this.$props.apiurl}/get/testimonies`, {
            headers: {
              'api-key': this.userdata.api_key,
          }
          })
          .then((response) => {
              if(response.status == 200){
                this.testimonies = response.data.data;
              }
          })
          .catch((error) => {
              // Product not found
              if(error.response.status == 404){
                this.testimonies = "notfound";
              }
              // Server error
              if(error.response.status == 500){
                this.showAlert({
                  type: 'danger',
                  msg: '<b>Ups, server bussy!</b> Please refresh page.'
                });
              }
          })
    },
    updateTestimonies(){
      this.testimonies = this.testimonies.filter(e => e.id != this.targetDelete.id); 
      if (this.testimonies.length == 0) {
        this.testimonies = 'notfound';
      }
    },
    funcShowPopUpDelete(data){
      this.showPopUpDelete = true;
      this.targetDelete    = data;
    }
  },
  mounted(){
    this.getTestimonies();
  },
}
</script>

<style scoped>

</style>