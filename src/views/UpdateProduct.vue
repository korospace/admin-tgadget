<template>
  <div
    id="update-product" 
    class="bg-white w-screen h-screen overflow-auto">

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

    <!-- navbar -->
    <div 
      class="bg-tgadgety sticky z-10 top-0 left-0 right-0 h-14 p-1.5 shadow-card box-border">
        <router-link 
          to="/"
          class="block w-max h-full px-4 flex items-center hover:bg-tgadgety-500 active:bg-tgadgety-500 transition-all shadow rounded-md"
          style="">
            <img :src="require('@/assets/img/left-arrow.svg')" class="w-4">
        </router-link>
    </div>

    <!-- form -->
    <FormUpdateProduct
      :apiurl="apiurl"
      :productid="$route.query.id"
      @alert-on="showAlert($event)"
      @expired-on="popUpExpiredOn=true"
      @loading-on="loadingOn=$event"
      @loading-msg="loadingMsg=$event"
      @show-successicon="showSuccessIcon=$event" />
        
  </div>
</template>

<script>
// @ is an alias to /src
import UserSessionCheck     from '@/components/UserSessionCheck'
import Alert                from '@/components/Alert'
import LoadingSpinner       from '@/components/LoadingSpinner'
import PopUpExpired         from '@/components/PopUpExpired'
import FormUpdateProduct    from '@/components/FormUpdateProduct'

export default {
  name: 'UpdateProduct',
  props:['apiurl'],
  components: {
    UserSessionCheck,
    Alert,
    LoadingSpinner,
    PopUpExpired,
    FormUpdateProduct
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
      detailProduct  : '',
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
    };
  },
}
</script>