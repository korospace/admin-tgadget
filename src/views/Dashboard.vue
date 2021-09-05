<template>
  <div id="dashboard" class="w-screen h-screen" :class="{'bg-white':true,'bg-tgadgety-500':userAuthFinish==true}">

    <Alert
      v-if="alertOn"
      :msg="alertMsg"
      :type="alertType"
      @closealert="alertOn=false" />
    
    <LoadingSpinner
      v-if="loadingOn"
      :msg="loadingMsg"
      :successicon="showSuccessIcon"/>

    <PopUpExpired
      v-if="popUpExpiredOn" />
        
    <PopUpDelete
      v-if="showPopUpDelete"
      @popuphide="showPopUpDelete=false"
      @dodelete="doDeleteProduct()" />

    <div
      v-if="userAuthFinish==true"
      class="w-full h-screen flex overflow-hidden">
        
        <DashboardSideBar
          :apiurl="apiurl"
          @event-on="eventOn = true"
          @settings-on="settingOn = true;" />

        <DashboardEvent 
          v-if="eventOn"
          :apiurl="apiurl"
          @alert-on="showAlert($event)"
          @expired-on="popUpExpiredOn=true"
          @loading-on="loadingOn=$event"
          @show-successicon="showSuccessIcon=$event"
          @loading-msg="loadingMsg=$event"
          @close="eventOn = false" />

        <DashboardSettings 
          v-if="settingOn"
          :apiurl="apiurl"
          @alert-on="showAlert($event)"
          @expired-on="popUpExpiredOn=true"
          @loading-on="loadingOn=$event"
          @show-successicon="showSuccessIcon=$event"
          @loading-msg="loadingMsg=$event"
          @close="settingOn = false"
          @change-username="userName=$event" />
        
        <main class="bg-white relative z-10 flex-1 overflow-auto pb-16 sm:pb-0">
          
          <div class="w-full flex flex-col" :class="{'min-h-screen':allProducts.length==0}">
            <DashboardHeader :username="userName" />
            
            <DashboardVisitors
              :apiurl="apiurl"
              @show-alert="showAlert($event)"
              @expiredon="popUpExpiredOn=true" />

            <DashboardProductViewer 
              :products="allProducts" />
          </div>

          <DashboardProducts 
            :products="allProducts"
            @showpopupdelete="showPopUpDelete=true" 
            @changeprodid="productId=$event" />
        </main>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Alert                  from '../components/Alert'
import LoadingSpinner         from '@/components/LoadingSpinner'
import PopUpExpired           from '@/components/PopUpExpired'
import DashboardSideBar       from '@/components/DashboardSideBar'
import DashboardHeader        from '@/components/DashboardHeader'
import DashboardVisitors      from '@/components/DashboardVisitors'
import DashboardProductViewer from '@/components/DashboardProductViewer'
import DashboardProducts      from '@/components/DashboardProducts'
import PopUpDelete            from '@/components/PopUpDelete'
import DashboardEvent         from '@/components/DashboardEvent'
import DashboardSettings      from '@/components/DashboardSettings'

export default {
  name: 'Dashboard',
  props:['apiurl'],
  components: {
    Alert,
    LoadingSpinner,
    PopUpExpired,
    DashboardSideBar,
    DashboardHeader,
    DashboardVisitors,
    DashboardProductViewer,
    DashboardProducts,
    PopUpDelete,
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
      showPopUpDelete: false,
      productId      : '',
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
              this.allProducts = response.data.data;
            }
          })
          .catch((error) => {
            // Product not found
            if(error.response.status == 404){
              this.allProducts = "notfound";
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
      doDeleteProduct(){
        this.showPopUpDelete = false;

        this.axios
        .delete(`${this.$props.apiurl}/delete/product?product_id=${this.productId}`,{
          headers: {
            'api-key': this.userdata.api_key,
            "token"  : this.userdata.token,
          }
        })
        .then((response) => {
          if(response.status == 201){
            this.showAlert({
              type: 'success',
              msg: '<b>Success!</b> Product deleted successfully.'
            });
            this.doUserAuth();
          }
        })
        .catch((error) => {
          this.showAlert({
            type: 'danger',
            msg: '<b>product failed to delete!</b> Please try again.'
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
      }
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