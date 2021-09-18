<template>
    <div
      id="login"
      class="w-screen min-h-screen block md:flex overflow-x-hidden overflow-y-auto">

        <Alert
          v-if="alertOn"
          :msg="alertMsg"
          :type="alertType"
          @close="alertOn=false" />

        <LoadingSpinner
          v-if="loadingOn"
          msg="please wait"
          :successicon="false" />
        
        <!-- API ilustration -->
        <div
          id="apiIlustration"
          class="h-screen w-full md:w-3/5 flex flex-col justify-center items-center pr-10 sm:pr-20 pl-10 sm:pl-20 text-center">
            <img :src="apiIlustration" class="w-full">
            <h1 class="uppercase mt-2 opacity-80">
                t-gadgetapi client page
            </h1>
            <a 
              href="#"  
              v-scroll-to="{
                el: '#formWraper',
                container: '#app',
              }"
              class="bg-tgadgety sm:hover:bg-tgadgety-500 active:bg-tgadgety-500 inline-block md:hidden mt-10 px-5 py-1.5 box-border rounded-sm shadow-md uppercase tracking-widest text-white transition-all">login</a>
        </div>

        <!-- Login form -->
        <div 
          id="formWraper" 
          class="min-h-screen md:flex-1 pl-5 md:pl-10 pr-5 md:pr-10 lg:pr-20 py-5 md:py-14 box-border">
            <FormLoginRegister 
              formtype="formLogin"
              :validation="formValidation"
              :isdisabled="formDisabled"
              @form-onsubmit="formOnSubmit($event)"/>
        </div>

    </div>
</template>

<script>
import Alert             from '../components/Alert'
import LoadingSpinner    from '../components/LoadingSpinner'
import FormLoginRegister from '../components/FormLoginRegister'

export default {
    props:['apiurl'],
    components: {
        Alert,
        LoadingSpinner,
        FormLoginRegister,
    },
    data(){
        return{
            alertOn        : false,
            alertMsg       : '',
            alertType      : '',
            loadingOn      : false,
            formDisabled   : false,
            apiIlustration : require('@/assets/img/api-ilustration.webp'),
            formValidation : {
                username : '',
                password : '',
            },
        }
    },
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem('userdata') !== null) {
            next({name: "Dashboard"});
        }
        next();
    },
    methods: {
        showAlert(data){
            this.alertType = data.type;
            this.alertMsg  = data.msg;
            this.alertOn   = true;
        },
        formOnSubmit(form){
            let invalid    = false;
            let formLogin  = new FormData(form);
            this.formValidation.username = '';
            this.formValidation.password = '';

            if(formLogin.get('username') == ''){
                invalid = true;
                this.formValidation.username = 'username is required';
            }
            if(formLogin.get('password') == ''){
                invalid = true;
                this.formValidation.password = 'password is required';
            }

            if(!invalid){
                this.loadingOn = true;

                this.axios
                .post(`${this.$props.apiurl}/user/login`,formLogin)
                .then((response) => {
                    this.loadingOn = false;
                    response.data.data.username = formLogin.get('username');
                    response.data.data.password = formLogin.get('password');
                    localStorage.setItem('userdata',JSON.stringify(response.data.data));

                    setTimeout(() => {
                        this.$router.push({name:'Dashboard'})
                    }, 800);
                })
                .catch((error) => {
                    this.loadingOn = false;

                    if(error.response.status == 401){
                        let message = error.response.data.message;

                        if(message == 'email not verified'){
                            this.showAlert({
                              type: 'warning',
                              msg: '<b>e-mail not verified</b>. please check your email'
                            });
                        }
                        if(/username/g.test(message)){
                            this.formValidation.username = message;
                        }
                        if(/password/g.test(message)){
                            this.formValidation.password = message;
                        }
                    }
                    if(error.response.status == 500){
                        this.showAlert({
                            type: 'danger',
                            msg: '<b>Ups, server error</b>. Please try again!'
                        });
                    }
                })
            }
        }
    },
    mounted(){
        if(!navigator.onLine){
            this.formDisabled = true;
            this.showAlert({
                type: 'danger',
                msg: '<b>Ups, connection lost!</b> Please check your connection.'
            });
        }
        window.onoffline = () => {
            this.formDisabled = true;
            this.showAlert({
                type: 'danger',
                msg: '<b>Ups, connection lost!</b> Please check your connection.'
            });
        };
        window.ononline = () => {
            this.formDisabled = false;
            this.alertOn      = false;
        };
    },
}
</script>

<style scoped>
    #apiIlustration h1{
        font-size: 3.8vw;
        font-family: 'Rc-bold';
        color: #ED7D2C;
    }
    @media (max-width:768px) {
        #apiIlustration h1{
            font-size: 6.5vw;
        }
    }
</style>