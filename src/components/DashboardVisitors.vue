<template>
    <form
      id="dashboard-visitors"
      class="w-full mt-10 px-5 grid grid-cols-2 sm:grid-cols-3 gap-5">

        <div
          v-for="(data,name) in allData" :key="data.id"
          :id="name"
          class="bg-tgadgety-500 h-24 sm-400:h-32 lg-930:h-40 px-4 pt-2 pb-2 sm-400:pb-4 rounded-sm"
          :class="{'animate-pulse opacity-70':finishGet==false,'shadow-card':finishGet}">
            <div
              v-if="finishGet" 
              class="logo-wraper w-full h-3/5 lg-930:h-4/6 flex justify-between">
                <div
                  class="logo h-full mr-0.5 sm-400:mr-2 pb-1 pr-1 box-border">
                    <img :src="data.svg" class="h-full opacity-20">
                </div>
                <div
                  class="h-full flex flex-col items-end">
                    <h1 class="text-white text-xxs sm-400:text-xs lg-930:text-sm text-right capitalize tracking-wide opacity-90">
                      {{data.name}}
                    </h1>
                    <p class="mt-1 text-white text-lg sm-400:text-2xl sm:text-3xl lg-930:text-5xl opacity-90">{{data.value}}</p>
                </div>
            </div>
            <div
              v-if="finishGet" 
              class="url-wraper w-full h-2/5 lg-930:h-2/6 flex items-end">
                <a
                  v-if="data.url"
                  :href="(data.url=='not available') ? '#/'+data.url : data.url" target="_blank"
                  class="w-full text-white text-xxs sm-400:text-xs lg-930:text-sm underline opacity-80 hover:opacity-100 active:opacity-100"
                  style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">
                  {{data.url}}
                </a>
                <a
                  v-if="data.url==false"
                  href="#" 
                  v-scroll-to="{
                    el: '#products',
                    container: 'main',
                  }"
                  class="w-full text-white text-xxs sm-400:text-xs lg-930:text-sm opacity-80 hover:opacity-100 active:opacity-100"
                  style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">
                  go to <b class="underline">products table</b>
                </a>
                <input
                  v-if="data.url"
                  :value="data.url"
                  :name="'link_'+name" 
                  type="text"
                  @keyup.enter="editSosmed($event)"
                  class="input_link_sosmed bg-tgadgety-500 w-full pb-0.5 box-border border-b border-white text-white text-xxs sm-400:text-xs lg-930:text-sm opacity-80 outline-none hidden" autofocus>
                <img
                  v-if="data.url"
                  :src="editIcon"
                  @click="showInput($event)"
                  class="edit_logo bg-tgadgety-500 hover:bg-tgadgety active:bg-tgadgety w-4 sm:w-6 p-0.5 sm:p-1.5 rounded-sm cursor-pointer opacity-80 hover:opacity-100 active:opacity-100 shadow-sm sm:shadow-md transition-all"
                  style="border: 0.2px solid rgba(255,255,255,0.3);">
            </div>
        </div>
    </form>
</template>

<script>

export default {
  props: ['apiurl'],
  data() {
    return{
      finishGet : false,
      editIcon  : require('@/assets/img/edit.svg'),
      userdata  : JSON.parse(localStorage.getItem('userdata')),
      allData   : {
        'ourwebsite': {
          name: 'ourwebsite visitor',
          svg: require('@/assets/img/ourwebsite.svg'),
          value: '',
          url: ''
        },
        'tokopedia': {
          name: 'tokopedia visitor',
          svg: require('@/assets/img/tokopedia.svg'),
          value: '',
          url: ''
        },
        'shopee': {
          name: 'shopee visitor',
          svg: require('@/assets/img/shopee.svg'),
          value: '',
          url: ''
        },
        'lazada': {
          name: 'lazada visitor',
          svg: require('@/assets/img/lazada.svg'),
          value: '',
          url: ''
        },
        'whatsapp': {
          name: 'whatsApp visitor',
          svg: require('@/assets/img/whatsapp.svg'),
          value: '',
          url: ''
        },
        'all_product': {
          name: 'total products',
          svg: require('@/assets/img/all_product.svg'),
          value: '',
          url: ''
        }
      }
    }
  },
  methods: {
    getDataStatistics(){
      this.finishGet = false;

      // Get data visitors
      this.axios
      .get(`${this.$props.apiurl}/get/statistics`, {
        headers: {
          'api-key': this.userdata.api_key,
        }
      })
      .then((response) => {
        this.allData.ourwebsite.value  = response.data.data.ourwebsite;
        this.allData.tokopedia.value   = response.data.data.tokopedia;
        this.allData.shopee.value      = response.data.data.shopee;
        this.allData.lazada.value      = response.data.data.lazada;
        this.allData.whatsapp.value    = response.data.data.whatsapp;
        this.allData.all_product.value = response.data.data.all_product;

        // Get data socialmedia url
        this.axios
        .get(`${this.$props.apiurl}/get/socialmedia`, {
          headers: {
            'api-key': this.userdata.api_key,
          }
        })
        .then((response) => {
          this.allData.ourwebsite.url  = response.data.data.ourwebsite;
          this.allData.tokopedia.url   = response.data.data.tokopedia;
          this.allData.shopee.url      = response.data.data.shopee;
          this.allData.lazada.url      = response.data.data.lazada;
          this.allData.whatsapp.url    = response.data.data.whatsapp;
          
          this.finishGet  = true;
        })
        .catch((error) => {
          // Unauthorized
          if(error.response.status == 401){
            this.$emit('show-alert',{
              type:'danger',
              msg: '<b>failed to get social media url!</b> Please check your api-key.'
            });
          }
          // Server error
          if(error.response.status == 500){
            this.$emit('show-alert',{
              type:'danger',
              msg: '<b>failed to get social media url!</b> Please refresh page.'
            });
          }
        })
      })
      .catch((error) => {
        // Server error
        if(error.response.status == 500){
          this.$emit('show-alert',{
            type:'danger',
            msg: '<b>failed to get data of visitors!</b> Please refresh page.'
          });
        }
      })
    },
    showInput(event){
      setTimeout(() => {
        this.windowOnClick(event.target.previousElementSibling);
      }, 0);

      // Has the information been displayed?
      if(this.userdata.alertSosmedHasBeenShown == undefined){
        this.userdata.alertSosmedHasBeenShown = true;
        localStorage.setItem('userdata',JSON.stringify(this.userdata));

        this.$emit('show-alert',{
          type:'info',
          msg: 'press <b>enter</b> for save change!'
        });
      }

      event.target.classList.add('hidden');
      event.target.previousElementSibling.classList.remove('hidden');
      event.target.previousElementSibling.select();
      event.target.previousElementSibling.previousElementSibling.style.display = 'none';
    },
    windowOnClick(inputEl){
      window.addEventListener('click',(e) => {
        if(!e.target.classList.contains('input_link_sosmed')&&!e.target.classList.contains('edit_logo')){
          inputEl.previousElementSibling.style.display = '-webkit-box';
          inputEl.classList.add('hidden');
          inputEl.nextElementSibling.classList.remove('hidden');
        }
      })
    },
    editSosmed(event){
      // if the number of letters exceeds 255
      if(event.target.value.length > 255){
        this.$emit('show-alert',{
          type:'danger',
          msg: '<b>failed to update url!</b> max 255 character.'
        });

        event.target.value = event.target.value.slice(0,255);
        return 0;
      }

      event.target.previousElementSibling.style.display = '-webkit-box';
      event.target.classList.add('hidden');
      event.target.nextElementSibling.classList.remove('hidden');

      let formStatistics = event.target.parentElement.parentElement.parentElement;
      formStatistics     = new FormData(formStatistics);
      for(var pair of formStatistics.entries()) {
        // If input value is empty
        if(pair[1] == ""){
          formStatistics.set(pair[0], 'not available');
        }
      }

      this.axios
      .put(`${this.$props.apiurl}/update/socialmedia`,formStatistics, {
        headers: {
          'api-key': this.userdata.api_key,
          "token"  : this.userdata.token,
        }
      })
      .then((response) => {
        if(response.status == 201){
          this.getDataStatistics();
        }
      })
      .catch((error) => {
        if(error.response.status == 401){
          // Expired token
          if(error.response.data.message == 'expired token'){
            this.$emit('show-alert',{
              type:'danger',
              msg: '<b>failed to update url!</b> Your session was expired.'
            });

            setTimeout(() => {
              this.$emit('expiredon');
            }, 600);
          }
          // Unauthorized
          if(error.response.data.message == 'Unauthorized'){
            localStorage.removeItem('userdata');
            this.$router.push({name: 'Login'});
          }
        }
        // Server error
        if(error.response.status == 500){
          this.$emit('show-alert',{
            type:'danger',
            msg: '<b>Ups, server error!</b> Please try again.'
          });
        }
      })
    }
  },
  mounted(){
    this.getDataStatistics();
  }
}
</script>

<style scoped>
  h1{
    font-family: 'Quicksand-Regular';
  }
  p{
    font-family: 'Rc-bold';
  }
</style>