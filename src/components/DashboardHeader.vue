<template>
    <div
      id="dashboard-header" 
      class="bg-gradient-to-r from-tgadgety to-tgadgety-500 w-full h-12 pr-5 flex justify-end items-end">
        <h1
          class="mr-3 mb-1.5 text-white opacity-80 text-3xl"
          style="font-family: 'Rc-bold';">
            {{ username }}
        </h1>
        <div class="bg-tgadgety-500 w-16 h-16 p-1.5 border-4 border-white rounded-full transform translate-y-7">
            <img :src="require('@/assets/img/user.svg')" class="w-full">
        </div>
    </div>
</template>

<script>
export default {
    props: ['username'],
}
</script>

<style scoped>
    
</style>