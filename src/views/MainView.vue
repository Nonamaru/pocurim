<template>
<div class="web">
  <div class="container">
    <div class="header">
      {{ role }}
      {{ whois }}
      {{ isReady }}
    </div>
    <div class="hub">
      <div class="isReady">
        <!-- <WarriorSuki @ready="(i) => isReady = i" :name="whois" :role="role" /> -->
        <WarriorSuki :name="whois" :role="role" :isYou=true />
        <WarriorSuki name="Anton" role="Танчащий палладин" :isYou=false />
        <WarriorSuki name="Danil" role="Длинный убийца" :isYou=false />
        <WarriorSuki name="Ruslan" role="Таинственный маг" :isYou=false />
        <WarriorSuki name="Sanya" role="Агро воин" :isYou=false />
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
      isReady: '',
      characters:[
        {
          id: 'a38f9dd3-263f-4f64-9314-b6e171fe5b75',
          name: 'Felix',
          title: 'Задумчивый шаман',
          picture: 'felix',
        },
        {
          id: 'f786b04d-5388-413c-83c9-dcf8c88b885e',
          name: 'Anton',
          title: 'Танчащий палладин',
          picture: 'antoxa',
        },
        {
          id: '07dd2448-4e50-4d77-acb2-29a0ab9aa2d4',
          name: 'Danil',
          title: 'Длинный убийца',
          picture: 'danil',
        },
        {
          id: '4dfd4089-0d29-43ee-acda-7cee22a59bf8',
          name: 'Ruslan',
          title: 'Таинственный маг',
          picture: 'ruslan',
        },
        {
          id: 'a14ae894-32f0-4be5-9d54-d58333e7f3fc',
          name: 'Sanya',
          title: 'Агро воин',
          picture: 'sanya',
        },
      ]
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
  width: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>