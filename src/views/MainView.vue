<template>
<div class="web">
  <div class="container">
    <div class="hub">
      <div class="isReady">
        <WarriorSuki 
          :name="whois" :role="role" :pic="link+whoisId+'.jpg'" :isReady="ready"
          :isYou="true"
          :pokur="pokurOrganizovan" 
          @ready="(i) => ready = i"
        />
        <WarriorSuki 
          v-for="char in whoiswho" :key="char" 
          :name="char.name" :role="char.title" :pic="link+char.id+'.jpg'" :isReady="char.ready"
          :isYou="false" 
          :pokur="pokurOrganizovan"
        />
      </div>
      <div class="bottom">
        <div class="users">
          <div v-for="warrior in socketswhoiswho" :key="warrior" class="user">
            <div class="user-pic">
              <img :src="link + warrior.id + '.jpg'" />
            </div>
            <div class="user-name">
              {{ warrior.name }}
            </div>
            <text v-if="warrior.isLogin">TUT</text>
            <div class="user-invite">
              <Icon icon="mdi:invite" />
            </div>
          </div>
        </div>
        <div class="chat">
          <Chat :whois="whois" :uId="whoisId" />
        </div>
        <div class="bottom-menu">
          <Menu 
            :menuPokur = pokurOrganizovan
            :menuRole = role
            :menuOrganizator = organizator
            @menuPokurOrganizovan = "(i) => pokurOrganizovan = i"
            @menuReady = "(i) => ready = i"
            @emitOrganizator = "(i) => organizator = i"
          />
        </div>
      </div>
    </div>
    <pre>{{ socketswhoiswho }}</pre>
  </div>
</div>
</template>
<script>
import { Icon } from '@iconify/vue';
import WarriorSuki from '../components/WarriorSuki.vue';
import Chat from '../components/ChatPokur.vue';
import Menu from '@/components/BottomMenu.vue';
import { socket } from '@/socket';
export default{
  components:{
    Icon,
    WarriorSuki,
    Chat,
    Menu,
  },
  data(){
    return{
      whois: '',
      role: '',
      whoisId: '',
      storagePicture: '',
      organizator: '',
      link: 'http://5.42.73.140/',
      pokurOrganizovan: false,
      ready: false,
      characters:[
        {
          id: 'a38f9dd3-263f-4f64-9314-b6e171fe5b75',
          name: 'Felix',
          title: 'Задумчивый шаман',
          ready: false,
          organizoval: false,
        },
        {
          id: 'f786b04d-5388-413c-83c9-dcf8c88b885e',
          name: 'Anton',
          title: 'Танчащий палладин',
          ready: false,
          organizoval: false,
        },
        {
          id: '07dd2448-4e50-4d77-acb2-29a0ab9aa2d4',
          name: 'Danil',
          title: 'Длинный убийца',
          ready: false,
          organizoval: false,
        },
        {
          id: '4dfd4089-0d29-43ee-acda-7cee22a59bf8',
          name: 'Ruslan',
          title: 'Таинственный маг',
          ready: false,
          organizoval: false,
        },
        {
          id: 'a14ae894-32f0-4be5-9d54-d58333e7f3fc',
          name: 'Sanya',
          title: 'Агро воин',
          ready: false,
          organizoval: false,
        },
      ],
      whoiswho:[],
      socketswhoiswho: [],
    }
  },
  mounted(){
    this.whois = localStorage.getItem('whois');
    this.role = localStorage.getItem('role');
    this.whoisId = localStorage.getItem('id');
    // socket.emit("chatlist")
    
    socket.emit("list");
    socket.on("list", (data) => {
      console.log(data);
      for (let i=0; i<data.length; i++){
        if (data[i].name != this.role){
          this.socketswhoiswho.push(data[i]);
        }
      }
    });

    for(let i = 0; i < this.characters.length; i++){
      if (this.characters[i].name != this.whois){
        this.whoiswho.push(this.characters[i]);
        if(this.characters[i].organizoval == true){
          this.organizator = this.characters[i].title;
          this.characters[i].ready = true;
          this.pokurOrganizovan = true;
        }
      } else {
        this.storagePicture = this.characters[i].id;
      }
    }
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


/*HEADER*/
.header{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 1vw;
  padding-bottom: 1vw;
}

.create-pokur:hover{
  color: gray;
  cursor: pointer;
}


/*HUB*/
.hub{
  width: 100%;
  margin-top: 1vw;
}
.isReady{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


/*BOTTOM*/
.bottom{
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1vw;
}
.users{
  width: 20%;
  border: 1px solid black;
}
.user{
  width: 100%;
  border-radius: 6px;
  margin-bottom: .2vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.user-name{
  width: 70%;
  text-align: left;
  font-size: .8vw;
  display: flex;
  align-items: center;
}
.user-pic{
  width: 10%;
}
.user-pic img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.user-invite{
  width: 15%;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.5vw;
}
.user-invite:hover{
  color: gray;
}
.chat{
  width: 55%;
  border: 1px solid black;
}
.bottom-menu{
  border: 1px solid black;
  width: 20%;
}
</style>