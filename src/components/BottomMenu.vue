<template>
<div class="menu">
    <div class="alert">
        <text v-if="!menuPokur">Никто не организовал покур</text>
        <text v-if="menuPokur">Организатор покура: <b>{{ menuOrganizator }}</b></text>
    </div>
    
    <div 
        class="start-smoke hover"
        v-if="!menuPokur"
        @click="makePokur()"
    >
        <text>Организовать покур</text>
    </div>
    <div 
        class="start-smoke hover"
        v-if="menuPokur && menuOrganizator == menuRole"
        @click="slitPokur()"
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
import { socket } from '@/socket'
export default{
    props:['menuPokur', 'menuRole', 'menuOrganizator'],
    data(){
        return{
            ochkun: false,
        }
    },
    methods:{
      leave(){
        socket.emit("logout" , {userId: `${localStorage.getItem('id')}`, isLogin: false})
        socket.on("logout", (data) => {
          socket.emit('make', {userId: `${localStorage.getItem('id')}`, make: false});
          socket.emit('ready', {userId: `${localStorage.getItem('id')}`, isReady: false})
          socket.emit("list");
          if(data.isLogin == false){
            localStorage.clear();
            this.$router.push({name: 'auth'});
          }
        })
      },
      makePokur(){
        socket.emit('make', {userId: `${localStorage.getItem('id')}`, make: true});
        socket.on('make', () => {
          socket.emit('list');
        })
      },
      slitPokur(){
        socket.emit('make', {userId: `${localStorage.getItem('id')}`, make: false});
        socket.on('make', () => {
          socket.emit('list');
          this.$emit('slil', false);
        })
      },
    }
}
</script>
<style scoped>
.menu{
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