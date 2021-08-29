<template>
  <div id="dashboard">
    
    <LoadingSpinner 
      :successicon="false" 
      :loadingon="loadingOn" />
    <PopUpExpired
      v-if="popUpExpiredOn"
      :popupon="popUpExpiredOn" 
      @do-redirect="redirectToLogin()" />

    <div 
      class="relative z-10 container opacity-0" 
      :class="{'opacity-100':loadingOn==false}">
      <h1>Dashboard</h1>
      <button @click="popUpExpiredOn = true">popup on</button>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import LoadingSpinner from '@/components/LoadingSpinner'
import PopUpExpired from '@/components/PopUpExpired'

export default {
  name: 'Dashboard',
  components: {
    LoadingSpinner,
    PopUpExpired,
  },
  data(){
    return{
      loadingOn : false,
      popUpExpiredOn : false,
    }
  },
  props:['apiurl'],
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('userdata') === null) {
      next({name: "Login"});
    }
    else{
      next();
    }
  },
  methods: {
      doUserAuth(){
        this.loadingOn = true;
        let userdata   = JSON.parse(localStorage.getItem('userdata'));
        
        if(userdata == null){
          this.loadingOn = false;
          setTimeout(() => {
            this.$router.push({name: 'Login'});
          }, 500);
        }
        else{
          this.axios
            .get(`${this.$props.apiurl}/user/session`, {
              headers: {
                'api-key': userdata['api_key'],
                "token": userdata.token,
              }
            })
            .then((response) => {
              if(response.status == 200){
                this.loadingOn = false;
                console.log(response.data);
              }
            })
            .catch((error) => {
                if(error.response.status == 401){
                  this.loadingOn = false;
                  setTimeout(() => {
                    this.popUpExpiredOn = true;
                  }, 600);
                }
            })
        }
      },
  },
  mounted(){
      setTimeout(() => {
        this.doUserAuth();
      }, 600);
  },
}
</script>
