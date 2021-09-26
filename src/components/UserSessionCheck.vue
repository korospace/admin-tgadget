<template>
    <div></div>
</template>

<script>
export default {
    props: ['apiurl'],
    data() {
        return{
            userdata  : JSON.parse(localStorage.getItem('userdata')),
        }
    },
    methods: {     
        doUserAuth(){
            this.axios
            .get(`${this.$props.apiurl}/user/session`, {
                headers: {
                    'api-key': this.userdata.api_key,
                    "token"  : this.userdata.token,
                }
            })
            .then(() => {
            })
            .catch((error) => {
                // Expired token & Unauthorized
                if(error.response.status == 401){
                    if(error.response.data.message == 'expired token'){
                        setTimeout(() => {
                            this.$emit('expired-on');
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
                    this.$emit('alert-on',{
                        type:'danger',
                        msg: '<b>Ups, something wrong!</b> Please refresh page'
                    });
                }
            })
        },
    },
    mounted(){
        this.doUserAuth();

        if(!navigator.onLine){
            this.$emit('alert-on',{
                type:'danger',
                msg: '<b>Ups, connection lost!</b> Please check your connection.'
            });
        }
        window.onoffline = () => {
            this.$emit('alert-on',{
                type:'danger',
                msg: '<b>Ups, connection lost!</b> Please check your connection.'
            });
        };
        window.ononline = () => {
            this.$emit('alert-off');
        };
    }
}
</script>