<template>
    <transition name="slide">
    <div 
      v-if="alertOn"
      class="fixed z-50 top-0 left-0 right-0 px-5 py-4 flex items-center"
      :class="{'bg-red-200':type=='danger','bg-yellow-200':type=='warning','bg-green-200':type=='success','bg-blue-200':type=='info'}">
        <h1
          v-html="msg"
          class="text-xs sm:text-base opacity-80"
          :class="{'text-red-800':type=='danger','text-yellow-800':type=='warning','text-green-800':type=='success','text-blue-800':type=='info'}"></h1>
        <div class="w-3 sm:w-4 absolute right-5 opacity-50 hover:opacity-80 cursor-pointer" @click="closeAlert()">         
            <svg class="w-full" viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    props: ['msg','type'],
    data() {
        return{
            alertOn : false
        }
    },
    methods: {
        closeAlert(){
            this.alertOn = false;
            this.$emit('closealert');
        }
    },
    mounted(){
        this.alertOn = true;
    }
}
</script>

<style scoped>

    .slide-enter-active{
        animation: slide 0.3s;
    }
    .slide-leave-active{
        animation: slide 0.3s reverse;
    }
    @keyframes slide {
        0% {
            opacity: 0;
            transform: translateY(-14px);
        }
        100% {
            opacity: 1;
            transform: translateY(-0px);
        }
    }

</style>