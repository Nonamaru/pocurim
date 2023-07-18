<template>
    <!-- <div class="header">
      <text v-if="!pokurOrganizovan">
        Покур никто не организовал, 
        <text class="create-pokur" @click="pokurOrganizovan = !pokurOrganizovan; organizator = role; ready = true" >
          <b>организовать покур?</b>
        </text>
      </text>
      <text v-if="pokurOrganizovan">Организатор покура: <b>{{ organizator }}</b></text>
      <text 
        v-if="pokurOrganizovan && organizator == role"
        @click="organizator = ''; pokurOrganizovan = false; ready = false"
      >
        Слить покур?
      </text>
    </div> -->
<div class="menu">
    <div class="alert">
        <text v-if="!menuPokur">Никто не организовал покур</text>
        <text v-if="menuPokur">Организатор покура: <b>{{ menuOrganizator }}</b></text>
    </div>
    
    <div 
        class="start-smoke hover"
        v-if="!menuPokur"
        @click="$emit('menuPokurOrganizovan', true); $emit('emitOrganizator', menuRole); $emit('menuReady', true)"
    >
        <text>Организовать покур</text>
    </div>
    <div 
        class="start-smoke hover"
        v-if="menuPokur && menuOrganizator == menuRole"
        @click="$emit('emitOrganizator', ''); $emit('menuPokurOrganizovan', false); $emit('menuReady', false)"
    >
        Слить покур?
    </div>
    
    <div class="leave" @click="ochkun = true">СЛИТЬСЯ</div>
    <div class="leave-popup" v-if="ochkun">
      <text>Очканул?</text>
      <div class="vibor">
        <div @click="leave()">Да, я очкун</div>
        <div @click="ochkun = false">Случайно нажал</div>
      </div>
    </div>
</div>
</template>
<script>
export default{
    props:['menuPokur', 'menuRole', 'menuOrganizator'],
    data(){
        return{
            ochkun: false,
        }
    },
    methods:{
        leave(){
            localStorage.clear();
            this.$router.push({name: 'auth'});
        }
    }
}
</script>
<style scoped>
.menu{
    border: 1px solid black;
    text-align: center;
}
.hover:hover{
    background-color: gray;
    cursor: pointer;
}


.alert{
    width: 98%;
    border: 1px solid black;
    padding: 1%;
}
.start-smoke{
    width: 98%;
    border: 1px solid black;
    padding: 1%;
}


/*LEAVE*/
.leave{
    width: 98%;
    border: 1px solid black;
    padding: 1%;
    
}
.leave:hover{
  background-color: darkred;
  cursor: pointer;
}
.leave-popup{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border: 2px solid black;
  padding: 1vw;
  border-radius: 1.2rem;
  background-color: white;
  width: 20vw;
  text-align: center;
  font-size: 1vw;
}
.vibor{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 1vw;
}
.vibor div{
  width: 40%;
  border: 1px solid black;
  padding: 1%;
  border-radius: .7rem;
  cursor: pointer;
}
.vibor div:hover{
  border-color: gray;
  color: gray;
}
</style>