<template>
  <div
    id="add-product" 
    class="w-screen h-screen overflow-auto" 
    :class="{'bg-white':true,'bg-tgadgety-500':userAuthFinish==true}">

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
    <FormAddUpdateProduct
      @alert-on="showAlert($event)"
      @senddataform="doAddProduct($event)" />
        
  </div>
</template>

<script>
// @ is an alias to /src
import Alert                from '../components/Alert'
import LoadingSpinner       from '@/components/LoadingSpinner'
import PopUpExpired         from '@/components/PopUpExpired'
import FormAddUpdateProduct from '@/components/FormAddUpdateProduct'

export default {
  name: 'Dashboard',
  props:['apiurl'],
  components: {
    Alert,
    LoadingSpinner,
    PopUpExpired,
    FormAddUpdateProduct
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
      userdata       : JSON.parse(localStorage.getItem('userdata')),
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('userdata') === null) {
      next({name: "Login"});
    }
    else{
      if (from.name == 'Dashboard') {
        try {
            JSON.parse(localStorage.getItem('userdata'))
            next();
        }
        catch (error) {
            next({name: "Login"});
        }
      } 
      else {
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
    doAddProduct(form){
      console.log(form);
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
      this.doUserAuth();
    };
  },
}
</script>