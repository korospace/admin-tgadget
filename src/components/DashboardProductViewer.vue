<template>
    <div
      id="products-viewer"
      class="w-full mt-5 px-5">
        <div
          class="bg-tgadgety-500 w-full pt-4 pl-4 pb-3 rounded-md overflow-auto"
          :class="{'h-52': true,'animate-pulse': products==false,'shadow-card': products!=false,'opacity-70':products==false,}">
            <column-chart
              v-if="products"
              :width="chartWidth+'px'" height="100%"
              ytitle="Viewers" 
              :min="0" :max="maxViewer" 
              :data="arrayMaker">
            </column-chart>
        </div>
    </div>    
</template>

<script>
export default {
    props: ['products'],
    data() {
      return{

      }
    },
    computed: {
      arrayMaker(){
        let arrayViwers = [];
        this.$props.products.forEach(p => {
          arrayViwers.push([p.name,p.viewers]);
        });
        return arrayViwers;
      },
      maxViewer(){
        let maxValue = 0;
        this.$props.products.forEach(p => {
          if(p.viewers > maxValue){
            maxValue = parseInt(p.viewers); 
          }
        });

        if(maxValue%2==0){
          return maxValue + 4;
        }
        else{
          return maxValue + 3;
        }
      },
      chartWidth(){
        return this.$props.products.length*150;
      }
    }
}
</script>

<style scoped>
  /* #products-viewer{
    
  } */
</style>