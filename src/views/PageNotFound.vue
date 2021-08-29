<template>
    <div id="notfound" :class="{'w-full':true,'h-screen':true,'flex':true,'flex-col':true,'justify-center':true,'items-center':true,'box-border':true}">
        <img :src="require('@/assets/img/notfound.webp')" :class="{'w-32':true}">
        <h1 :class="{'mt-8':true,'text-3xl':true,'opacity-70':true}">
            404 Page Not Found
        </h1>
        <p :class="{'mt-2':true,'text-md':true,'opacity-70':true}">
            back to 
            <router-link class="font-extrabold underline hover:text-tgadgety" to="/">
                dashboard
            </router-link>
        </p>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    h1{
        font-family: 'Rc-bold';
    }
    p{
        font-family: 'Quicksand-Medium';
    }
</style>