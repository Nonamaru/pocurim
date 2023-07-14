<template>
<div class="web">
  <div class="container">
    <div class="header">
      {{ role }}
      {{ whois }}
      {{ suka }}
    </div>
    <div class="hub">
      <div class="isReady">
        <WarriorSuki @ready="(i) => suka = i" name="Felix" role="Задумчивый шаман" />
      </div>
    </div>
  </div>
</div>
</template>
<script>
import WarriorSuki from '../components/WarriorSuki.vue'
export default{
  components:{
    WarriorSuki,
  },
  data(){
    return{
      whois: '',
      role: '',
      suka: ''
    }
  },
  mounted(){
    this.whois = localStorage.getItem('whois');
    this.role = localStorage.getItem('role');
  }
}
</script>
<style scoped>
.web{
  width: 100vw;
}
.container{
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
}
.header{
  width: 100%;
  border: 1px solid black;
  text-align: center;
}
.hub{
  width: 100%;
  border: 1px solid black;
}
.isReady{
  width: 30%;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
}
</style>