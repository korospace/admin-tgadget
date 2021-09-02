<template>
  <div id="dashboard" class="w-screen h-screen" :class="{'bg-tgadgety-500':loadingOn==false}">

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
          
          <DashboardHeader :username="userName" />

          <div id="statistics" class="w-full h-screen">
            <DashboardVisitors
              :apiurl="apiurl"
              @change-alerttype="alertType = $event"
              @change-alertmsg="alertMsg = $event"
              @alerton="alertOn=true"
              @expiredon="popUpExpiredOn=true" />
          </div>
          <div id="products" class="w-full h-screen">
            prdoduk
          </div>
          <div id="banner" class="w-full h-screen">
            banner
          </div>
        </main>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Alert             from '../components/Alert'
import LoadingSpinner    from '@/components/LoadingSpinner'
import PopUpExpired      from '@/components/PopUpExpired'
import DashboardSideBar  from '@/components/DashboardSideBar'
import DashboardHeader   from '@/components/DashboardHeader'
import DashboardVisitors from '@/components/DashboardVisitors'
import DashboardEvent    from '@/components/DashboardEvent'
import DashboardSettings from '@/components/DashboardSettings'

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
    DashboardEvent,
    DashboardSettings,
  },
  data(){
    return{
      alertType   : '',
      alertMsg    : '',
      alertOn     : false,
      loadingOn   : false,
      popUpExpiredOn : false,
      userName  : '',
      eventOn   : false,
      settingOn : false,
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
        let userdata   = JSON.parse(localStorage.getItem('userdata'));
        
        this.axios
          .get(`${this.$props.apiurl}/user/session`, {
            headers: {
              'api-key': userdata.api_key,
              "token"  : userdata.token,
            }
          })
          .then((response) => {
            if(response.status == 200){
              (withSpinner) ? this.loadingOn = false : '';
              this.userName  = userdata.username;
              console.log(response.data);
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
  },
}
</script>

<style scoped>
</style>