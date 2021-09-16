<template>
  <div id="dashboard" class="w-screen h-screen" :class="{'bg-white':true,'bg-tgadgety-500':userAuthFinish==true}">

    <Alert
      v-if="alertOn"
      :msg="alertMsg"
      :type="alertType"
      @close="alertOn=false" />
    
    <LoadingSpinner
      v-if="loadingOn"
      :msg="loadingMsg"
      :showsuccessicon="showSuccessIcon" />

    <PopUpExpired
      v-if="popUpExpiredOn"
      @close="popUpExpiredOn=false" />
        
    <PopUpDelete
      v-if="showPopUpDelete"
      @dodelete="doDeleteData()"
      @close="showPopUpDelete=false"
      :targetdelete="dataTargetDelete" />

    <DashboardEvent 
      v-if="eventOn"
      :apiurl="apiurl"
      @close="eventOn = false"
      @alert-on="showAlert($event)"
      @expired-on="popUpExpiredOn=true"
      @loading-on="loadingOn=$event"
      @loading-msg="loadingMsg=$event"
      @show-successicon="showSuccessIcon=$event" />

    <DashboardSettings 
      v-if="settingOn"
      :apiurl="apiurl"
      @close="settingOn = false"
      @alert-on="showAlert($event)"
      @expired-on="popUpExpiredOn=true"
      @loading-on="loadingOn=$event"
      @loading-msg="loadingMsg=$event"
      @show-successicon="showSuccessIcon=$event"
      @showpopupdelete="showPopUpDelete=true" 
      @changetargetdelete="dataTargetDelete=$event"
      @change-username="userName=$event" />

    <div
      v-if="userAuthFinish"
      class="w-full h-screen flex overflow-hidden">
        
        <!-- sidebar -->
        <DashboardSideBar
          @logout="doLogOut()"
          @event-on="eventOn = true"
          @settings-on="settingOn = true" />
        
        <main class="bg-white relative z-10 sm:z-20 flex-1 overflow-auto pb-20 sm:pb-10">
          
          <!-- header -->
          <div
            class="w-full flex flex-col"
            :class="{'min-h-screen':allProducts.length==0}">
              <DashboardHeader
                :username="userName" />
              
              <DashboardVisitors
                :apiurl="apiurl"
                :totalproducts="totalProducts"
                @alert-on="showAlert($event)"
                @loading-on="loadingOn=$event"
                @loading-msg="loadingMsg=$event"
                @show-successicon="showSuccessIcon=$event"
                @expiredon="popUpExpiredOn=true" />

              <DashboardProductViewer 
                :products="productViewrs" />
          </div>

          <DashboardProducts 
            :products="allProducts"
            @search-product="filterProducts($event)"
            @showpopupdelete="showPopUpDelete=true" 
            @changetargetdelete="dataTargetDelete=$event" />

          <DashboardTestimonies 
            :apiurl="apiurl"
            :testimonies="testimonies"
            @gettestimonies="getTestimonies()"
            @alert-on="showAlert($event)"
            @loading-on="loadingOn=$event"
            @loading-msg="loadingMsg=$event"
            @show-successicon="showSuccessIcon=$event"
            @expired-on="popUpExpiredOn=true"
            @showpopupdelete="showPopUpDelete=true" 
            @changetargetdelete="dataTargetDelete=$event" />

          <DashboardBanners 
            :apiurl="apiurl"
            :banners="banners"
            @getbanners="getBanners()"
            @alert-on="showAlert($event)"
            @loading-on="loadingOn=$event"
            @loading-msg="loadingMsg=$event"
            @show-successicon="showSuccessIcon=$event"
            @expired-on="popUpExpiredOn=true"
            @showpopupdelete="showPopUpDelete=true" 
            @changetargetdelete="dataTargetDelete=$event" />
        </main>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Alert                  from '../components/Alert'
import LoadingSpinner         from '@/components/LoadingSpinner'
import PopUpExpired           from '@/components/PopUpExpired'
import PopUpDelete            from '@/components/PopUpDelete'
import DashboardSideBar       from '@/components/DashboardSideBar'
import DashboardHeader        from '@/components/DashboardHeader'
import DashboardVisitors      from '@/components/DashboardVisitors'
import DashboardProductViewer from '@/components/DashboardProductViewer'
import DashboardProducts      from '@/components/DashboardProducts'
import DashboardTestimonies   from '@/components/DashboardTestimonies'
import DashboardBanners       from '@/components/DashboardBanners'
import DashboardEvent         from '@/components/DashboardEvent'
import DashboardSettings      from '@/components/DashboardSettings'

export default {
  name: 'Dashboard',
  props:['apiurl'],
  components: {
    Alert,
    LoadingSpinner,
    PopUpExpired,
    PopUpDelete,
    DashboardSideBar,
    DashboardHeader,
    DashboardVisitors,
    DashboardProductViewer,
    DashboardProducts,
    DashboardTestimonies,
    DashboardBanners,
    DashboardEvent,
    DashboardSettings,
  },
  data(){
    return{
      userAuthFinish : false,
      alertType      : '',
      alertMsg       : '',
      alertOn        : false,
      loadingOn      : false,
      loadingMsg     : false,
      showSuccessIcon: false,
      popUpExpiredOn : false,
      userName       : '',
      userdata       : JSON.parse(localStorage.getItem('userdata')),
      eventOn        : false,
      settingOn      : false,
      allProducts    : [],
      totalProducts  : 0,
      productViewrs  : [],
      testimonies    : [],
      banners        : [],
      showPopUpDelete  : false,
      dataTargetDelete : '',
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('userdata') === null) {
      next({name: "Login"});
    }
    else{
      try {
        JSON.parse(localStorage.getItem('userdata'))
        next();
      }
      catch (error) {
        next({name: "Login"});
      }
    }
  },
  methods: {
    showAlert(data){
      this.alertType = data.type;
      this.alertMsg  = data.msg;
      this.alertOn   = true;
    },
    doUserAuth(){
      this.userAuthFinish = false;
      this.loadingOn      = true;

      this.axios
        .get(`${this.$props.apiurl}/user/session`, {
          headers: {
            'api-key': this.userdata.api_key,
            "token"  : this.userdata.token,
          }
        })
        .then((response) => {
          if(response.status == 200){
            this.userAuthFinish = true;
            this.loadingOn      = false;
            this.userName       = this.userdata.username;
            this.getAllProduct();
            this.getTestimonies();
            this.getBanners();
          }
        })
        .catch((error) => {
          this.userAuthFinish = true;
          this.loadingOn      = false;

          // Expired token & Unauthorized
          if(error.response.status == 401){
            if(error.response.data.message == 'expired token'){
              setTimeout(() => {
                this.popUpExpiredOn = true;
              }, 600);
            }
            if(error.response.data.message == 'Unauthorized'){
              setTimeout(() => {
                localStorage.removeItem('userdata');
                this.$router.push({name: 'Login'});
              }, 600);
            }
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
    getAllProduct(){
      this.allProducts = [];

      this.axios
        .get(`${this.$props.apiurl}/get/products`, {
          headers: {
            'api-key': this.userdata.api_key,
          }
        })
        .then((response) => {
          if(response.status == 200){
            this.updateAllDataProduct(response.data.data);
          }
        })
        .catch((error) => {
          // Product not found
          if(error.response.status == 404){
            this.allProducts   = "notfound";
            this.totalProducts = 0;
            this.productViewrs = 'notfound';
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
    updateAllDataProduct(data = null){
      if (data == null) {
        this.allProducts = this.userdata.products.filter(e => e.id != this.dataTargetDelete.id); 
      } else {
        this.allProducts = data;
      }
      this.totalProducts     = this.allProducts.length;
      this.productViewrs     = this.allProducts;
      this.userdata.products = this.allProducts;
      localStorage.setItem('userdata',JSON.stringify(this.userdata));
    },
    filterProducts(data){
      let arrProducts  = this.userdata.products;
      this.allProducts = arrProducts.filter(e => e.name.includes(data));
      
      if(this.allProducts.length==0){
        this.allProducts = "notfound";
      }
      if(data==""){
        this.allProducts = this.userdata.products;
      }

    },
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
      this.testimonies = this.testimonies.filter(e => e.id != this.dataTargetDelete.id); 
    },
    getBanners(){
      this.banners = [];

      this.axios
        .get(`${this.$props.apiurl}/get/banners`, {
          headers: {
            'api-key': this.userdata.api_key,
          }
        })
        .then((response) => {
          if(response.status == 200){
            this.banners = response.data.data;
          }
        })
        .catch((error) => {
          // Product not found
          if(error.response.status == 404){
            this.banners = "notfound";
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
    updateBanners(){
      this.banners = this.banners.filter(e => e.id != this.dataTargetDelete.id); 
    },
    doDeleteData(){
      this.showPopUpDelete = false;

      setTimeout(() => {
        this.loadingOn  = true;
        this.loadingMsg = 'please wait!';

        this.axios
        .delete(`${this.$props.apiurl}/delete/${this.dataTargetDelete.name}?id=${this.dataTargetDelete.id}`,{
          headers: {
            'api-key': this.userdata.api_key,
            "token"  : this.userdata.token,
          }
        })
        .then((response) => {
            if(response.status == 201){
              this.showSuccessIcon = true;
              this.loadingMsg      = 'delete success!';
                  
              setTimeout(() => {
                this.loadingOn       = false;
                this.showSuccessIcon = false;
                this.loadingMsg      = 'please wait!';

                if (this.dataTargetDelete.name == 'account') {
                  localStorage.removeItem('userdata');
                  this.$router.push({name: 'Login'});
                }
                else {
                  this.updateAllDataProduct();
                  this.updateTestimonies();
                  this.updateBanners();
                }
              }, 1000);
            }
        })
        .catch((error) => {
          // loading off 
          this.loadingOn = false;
          // show alert
          this.showAlert({
            type: 'danger',
            msg: `<b>${this.dataTargetDelete.name} failed to delete!</b> Please try again.`
          });

          if(error.response.status == 401){
            // Expired token & Unauthorized
            if(error.response.data.message == 'expired token'){
              setTimeout(() => {
                this.popUpExpiredOn = true;
              }, 600);
            }
            if(error.response.data.message == 'Unauthorized'){
              setTimeout(() => {
                localStorage.removeItem('userdata');
                this.$router.push({name: 'Login'});
              }, 600);
            }
          }
        })
      }, 400);
    },
    doLogOut(){
      this.loadingOn = true;

      this.axios
      .delete(`${this.$props.apiurl}/user/logout`, {
        headers: {
          'api-key': this.userdata.api_key,
          "token"  : this.userdata.token,
        }
      })
      .then((response) => {
        if(response.status == 202){
          this.loadingOn = false;
          localStorage.removeItem('userdata');
          setTimeout(() => {
            this.$router.push({name: 'Login'});
          }, 600);
        }
      })
      .catch((error) => {
        if(error.response.status == 401){
          this.loadingOn = false;
          localStorage.removeItem('userdata');
          setTimeout(() => {
            this.$router.push({name: 'Login'});
          }, 600);
        }
      })
    },
  },
  mounted(){
    this.doUserAuth();

    if(!navigator.onLine){
      this.showAlert({
        type: 'danger',
        msg: '<b>Ups, connection lost!</b> Please check your connection.'
      });
    }
    window.onoffline = () => {
      this.showAlert({
        type: 'danger',
        msg: '<b>Ups, connection lost!</b> Please check your connection.'
      });
    };
    window.ononline = () => {
      this.alertOn  = false;
      this.doUserAuth();
    };
  },
}
</script>

<style scoped>
</style>