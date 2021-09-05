<template>
  <div id="dashboard" class="w-screen h-screen" :class="{'bg-white':true,'bg-tgadgety-500':loadingOn==false}">

    <Alert
      v-if="alertOn"
      :msg="alertMsg"
      :type="alertType"
      @closealert="alertOn=false" />
    
    <LoadingSpinner
      v-if="loadingOn"
      :successicon="false"/>

    <PopUpExpired
      v-if="popUpExpiredOn" />

    <div
      v-if="loadingOn==false"
      class="w-full h-screen flex overflow-hidden">
        
        <DashboardSideBar
          :apiurl="apiurl"
          @event-on="showEvent(true)"
          @settings-on="showSettings(true)" />

        <DashboardEvent 
          v-if="eventOn"
          :apiurl="apiurl"
          @change-alerttype="alertType = $event"
          @change-alertmsg="alertMsg = $event"
          @alerton="alertOn=true"
          @event-off="showEvent(false)" />

        <DashboardSettings 
          v-if="settingOn"
          :apiurl="apiurl"
          @change-alerttype="alertType = $event"
          @change-alertmsg="alertMsg = $event"
          @alerton="alertOn=true"
          @change-username="userName=$event"
          @settings-off="showSettings(false)" />
        
        <main class="bg-white relative z-10 flex-1 overflow-auto">
          
          <div class="w-full flex flex-col" :class="{'min-h-screen':allProducts.length==0}">
            <DashboardHeader :username="userName" />
            
            <DashboardVisitors
              :apiurl="apiurl"
              @change-alerttype="alertType = $event"
              @change-alertmsg="alertMsg = $event"
              @alerton="alertOn=true"
              @expiredon="popUpExpiredOn=true" />

            <DashboardProductViewer 
              :products="allProducts" />
          </div>

          <DashboardProducts 
              :products="allProducts" />
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
    DashboardEvent,
    DashboardSettings,
  },
  data(){
    return{
      alertType      : '',
      alertMsg       : '',
      alertOn        : false,
      loadingOn      : false,
      popUpExpiredOn : false,
      userName       : '',
      userdata       : JSON.parse(localStorage.getItem('userdata')),
      eventOn        : false,
      settingOn      : false,
      allProducts    : [],
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
      doUserAuth(withSpinner = true){
        (withSpinner) ? this.loadingOn = true : '';
        
        this.axios
          .get(`${this.$props.apiurl}/user/session`, {
            headers: {
              'api-key': this.userdata.api_key,
              "token"  : this.userdata.token,
            }
          })
          .then((response) => {
            if(response.status == 200){
              (withSpinner) ? this.loadingOn = false : '';
              this.getAllProduct();
              this.userName  = this.userdata.username;
            }
          })
          .catch((error) => {
              (withSpinner) ? this.loadingOn = false : '';

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
          })
      },
      getAllProduct(){
        this.axios
          .get(`${this.$props.apiurl}/get/products`, {
            headers: {
              'api-key': this.userdata.api_key,
            }
          })
          .then((response) => {
            if(response.status == 200){
              this.allProducts = response.data.data;
              console.log(this.allProducts);
            }
          })
          .catch((error) => {
            if(error.response.status == 404){
              this.allProducts = "notfound";
            }
            if(error.response.status == 500){
              this.alertType = 'danger';
              this.alertMsg  = '<b>Ups, products not load!</b> Please refresh page.';
              this.alertOn   = true;
            }
          })
      },
      showEvent(status){
        this.doUserAuth(false);
        this.eventOn = status;
      },
      showSettings(status){
        this.doUserAuth(false);
        this.settingOn = status;
      }
  },
  mounted(){
      setTimeout(() => {
        this.doUserAuth();
      }, 600);
      if(!navigator.onLine){
        this.alertType = 'danger';
        this.alertMsg  = '<b>Ups, connection lost!</b> Please check your connection.';
        this.alertOn   = true;
      }
      if(navigator.onLine){
        this.alertOn = false;
        this.doUserAuth();
      }
      window.onoffline = () => {
        this.alertType = 'danger';
        this.alertMsg  = '<b>Ups, connection lost!</b> Please check your connection.';
        this.alertOn   = true;
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