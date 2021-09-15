<template>
    <form 
      @submit.prevent="$emit('form-onsubmit',$event.target)" 
      class="bg-tgadgety w-full h-full flex flex-col justify-center items-center box-border rounded-md shadow-lg py-6">
        <div class="header w-5/6 sm:w-4/6 lg:w-3/5 mb-10 py-4 text-center text-white text-4xl opacity-80">
            {{ (formtype == 'formLogin')? 'Login' : 'Sign up' }}
        </div>
        <div
          v-if="formtype == 'formRegister'" 
          class="formGroup relative w-full mb-6 px-4 sm:px-8 lg:px-12">
            <label 
              for="email" 
              class="block mb-1 text-white text-xl tracking-wide font-bold opacity-80">
             email</label>
            <input 
              id="email" 
              type="text" 
              name="email"
              autocomplete="off"
              class="w-full px-3 py-2 box-border text-tgadgety font-extrabold tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm opacity-80 focus:opacity-100 focus:shadow-md"
              :class="{'ring-2 ':validation.email,'ring-red-600':validation.email}">
            <small 
              v-if="validation.email"
              class="absolute left-8 lg:left-12 -bottom-6 text-red-700 tracking-wide">
                * {{ validation.email }}
            </small>
        </div>
        <div class="formGroup relative w-full px-4 sm:px-8 lg:px-12">
            <label 
              for="username" 
              class="block mb-1 text-white text-xl tracking-wide font-bold opacity-80">
              username</label>
            <input 
              id="username" 
              type="text" 
              name="username"
              autocomplete="off"
              class="w-full px-3 py-2 box-border text-tgadgety font-extrabold tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm opacity-80 focus:opacity-100 focus:shadow-md"
              :class="{'ring-2 ':validation.username,'ring-red-600':validation.username}">
            <small 
              v-if="validation.username"
              class="absolute left-8 lg:left-12 -bottom-6 text-red-700 tracking-wide">
                * {{ validation.username }}
            </small>
        </div>
        <div class="formGroup relative w-full mt-6 px-4 sm:px-8 lg:px-12">
            <label 
              for="password" 
              class="block mb-1 text-white text-xl tracking-wide font-bold opacity-80">
              password</label>
            <input 
              id="password" 
              type="password" 
              name="password" 
              autocomplete="off"
              class="w-full px-3 py-2 box-border text-tgadgety font-extrabold tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm opacity-80 focus:opacity-100 focus:shadow-md"
              :class="{'ring-2 ':validation.password,'ring-red-600':validation.password}">
            <small 
              v-if="validation.password"
              class="absolute left-8 lg:left-12 -bottom-6 text-red-700 tracking-wide">
                * {{ validation.password }}
            </small>
        </div>
        <div class="formGroup w-full mt-10 px-4 sm:px-8 lg:px-12">
            <button
              :disabled="isdisabled"
              class="w-full py-3 rounded-md box-border shadow-md text-white sm:hover:bg-tgadgety-500 active:bg-tgadgety-500 transition-all">
                <span class="uppercase tracking-widest font-extrabold">
                    {{ (formtype == 'formLogin')? 'login' : 'sign up' }}
                </span>
            </button>
        </div>
        <div class="footer w-5/6 sm:w-4/6 lg:w-3/5 flex flex-col items-center mt-10 py-4 opacity-80 text-white text-center">
            {{(formtype == 'formLogin')? "have't an account?" : 'already have an account?'}}
            <router-link 
              :to="(formtype == 'formLogin')? '/register' : '/login'"
              class="w-max block font-extrabold underline hover:text-yellow-200 active:text-yellow-200">
                {{ (formtype == 'formLogin')? 'sign up' : 'login' }}
            </router-link>
        </div>
    </form>
</template>

<script>
export default {
    props:['formtype','validation','isdisabled']
}
</script>

<style scoped>
    #formWraper .header{
        font-family: 'Rc-bold';
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
    }
    #formWraper .formGroup{
        font-family: 'Quicksand-medium';
    }
    #formWraper .footer{
        font-family: 'Quicksand-medium';
        border-top: 0.5px solid rgba(255, 255, 255, 0.3);
    }

    .formGroup button{
        font-family: 'Quicksand-SemiBold';
        border: 2px solid rgba(255, 255, 255, 0.6);
    }
    .formGroup small{
        font-family: 'Rc-bold';
    }
</style>