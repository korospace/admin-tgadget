<template>
  <div id="dashboard" class="bg-white w-screen h-screen">

    <UserSessionCheck
      :apiurl="apiurl"
      @alert-on="showAlert($event)"
      @alert-off="alertOn=false"
      @expired-on="popUpExpiredOn=true" />

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

    <div
      class="w-full h-screen flex overflow-hidden">
        
        <!-- sidebar -->
        <DashboardSideBar
          :apiurl="apiurl"
          @alert-on="showAlert($event)"
          @expired-on="popUpExpiredOn=true"
          @loading-on="loadingOn=$event"
          @loading-msg="loadingMsg=$event"
          @show-successicon="showSuccessIcon=$event"
          @change-username="userName=$event" />
        
        <main class="bg-white relative z-10 flex-1 overflow-auto pb-20 sm:pb-10">
          
          <!-- header -->
          <div
            class="w-full flex flex-col"
            :class="{'min-h-screen':productViewrs.length==0}">
              <DashboardHeader
                :username="userName" />
              
              <DashboardVisitors
                :apiurl="apiurl"
                :totalproducts="productViewrs == 'notfound' ? 0 : productViewrs.length"
                @alert-on="showAlert($event)"
                @alert-off="alertOn=false"
                @expired-on="popUpExpiredOn=true" />

              <DashboardProductViewer 
                :products="productViewrs" />
          </div>

          <DashboardProducts 
            :apiurl="apiurl"
            @productsviewers="productViewrs=$event"
            @alert-on="showAlert($event)"
            @loading-on="loadingOn=$event"
            @loading-msg="loadingMsg=$event"
            @show-successicon="showSuccessIcon=$event"
            @expired-on="popUpExpiredOn=true" />

          <DashboardTestimonies 
            :apiurl="apiurl"
            @alert-on="showAlert($event)"
            @loading-on="loadingOn=$event"
            @loading-msg="loadingMsg=$event"
            @show-successicon="showSuccessIcon=$event"
            @expired-on="popUpExpiredOn=true" />

          <DashboardBanners 
            :apiurl="apiurl"
            @alert-on="showAlert($event)"
            @loading-on="loadingOn=$event"
            @loading-msg="loadingMsg=$event"
            @show-successicon="showSuccessIcon=$event"
            @expired-on="popUpExpiredOn=true" />
        </main>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import UserSessionCheck       from '../components/UserSessionCheck'
import Alert                  from '../components/Alert'
import LoadingSpinner         from '@/components/LoadingSpinner'
import PopUpExpired           from '@/components/PopUpExpired'
import DashboardSideBar       from '@/components/DashboardSideBar'
import DashboardHeader        from '@/components/DashboardHeader'
import DashboardVisitors      from '@/components/DashboardVisitors'
import DashboardProductViewer from '@/components/DashboardProductViewer'
import DashboardProducts      from '@/components/DashboardProducts'
import DashboardTestimonies   from '@/components/DashboardTestimonies'
import DashboardBanners       from '@/components/DashboardBanners'

export default {
  name: 'Dashboard',
  props:['apiurl'],
  components: {
    UserSessionCheck,
    Alert,
    LoadingSpinner,
    PopUpExpired,
    DashboardSideBar,
    DashboardHeader,
    DashboardVisitors,
    DashboardProductViewer,
    DashboardProducts,
    DashboardTestimonies,
    DashboardBanners,
  },
  data(){
    return{
      alertType      : '',
      alertMsg       : '',
      alertOn        : false,
      loadingOn      : false,
      loadingMsg     : false,
      showSuccessIcon: false,
      popUpExpiredOn : false,
      userdata       : JSON.parse(localStorage.getItem('userdata')),
      userName       : '',
      productViewrs  : [],
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
  },
  mounted(){
    this.userName = this.userdata.username
  },
}
</script>

<style scoped>
</style>