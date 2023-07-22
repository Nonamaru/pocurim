<template>
<div class="back"></div>
<div class="web">
  <div class="container">
    <div class="hub">
      <div class="isReady">
        <WarriorSuki 
          v-for="char in socketswhoiswho" :key="char" 
          :role="char.name" :pic="link+char.id+'.jpg'" :isReady="char.isReady"
          :loggined="char.isLogin" 
          :pokur="pokurOrganizovan"
        />
      </div>
      <div class="bottom">
        <div class="users">
          <div v-for="warrior in socketswhoiswho" :key="warrior" class="user">
            <div class="user-pic">
              <img :src="link + warrior.id + '.jpg'" />
            </div>
            <div class="user-name" :class="{userLoggined: warrior.isLogin}">
              {{ warrior.name }}
            </div>
            <div class="user-invite">
              <Icon icon="mdi:invite" />
            </div>
          </div>
        </div>
        <div class="chat">
          <Chat :whois="whois" :name="names" />
        </div>
        <div class="bottom-menu">
          <BottomMenu 
            :menuPokur = pokurOrganizovan
            :menuRole = role
            :menuOrganizator = organizator
            @slil = "(i) => pokurOrganizovan = (i)"
          />
        </div>
      </div>
    </div>
    <div class="vseGotovy-shadow" v-if="vseReady">
      <div class="vseGotovy">
        <text
          style="
            text-align: center;
            font-size: 2vw;
            font-weight: bold;
          "
        >
          Войны, пора курить!
        </text>
        <text>
          Да здравствуют войны покура! И незассавший организатор 
        </text>
        <text>
          <u>{{role}}</u>
        </text>
        <text>
          с достойной командой:
        </text>
        <text
          v-for="man in socketswhoiswho" :key="man">
          <text v-if="man.name != role">&#8226;&nbsp;<u>{{man.name}}</u></text>
        </text>
        <button :disabled="organizator != role" @click="endOfPokur()">В путь!</button>
        <text style="font-size: .8vw;">
          <b>*Боги прощают прошлых крыс и дают им новый шанс!</b>
        </text>
      </div>
    </div>
    <!-- <pre>{{ socketswhoiswho }}</pre> -->
  </div>
</div>
</template>
<script>
import { Icon } from '@iconify/vue';
import WarriorSuki from '../components/WarriorSuki.vue';
import Chat from '../components/ChatPokur.vue';
import BottomMenu from '@/components/BottomMenu.vue';
import { socket } from '@/socket';
export default{
  components:{
    Icon,
    WarriorSuki,
    Chat,
    BottomMenu,
  },
  data(){
    return{
      whois: '',
      role: '',
      organizator: '',
      link: 'http://5.42.73.140/',
      pokurOrganizovan: false,
      ready: false,
      vseReady: false,
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
      socketswhoiswho: [],
      names: {},
    }
  },
  methods:{
    endOfPokur(){
      socket.emit("endOfPokur");
      socket.on("endOfPokur", (data) => {
        if (data.status == 'ok') {
          this.vseReady = false;
          this.pokurOrganizovan = false;
          socket.emit("list");
        }
      });
    }
  },
  mounted(){
    this.whois = localStorage.getItem('whois');
    this.role = localStorage.getItem('role');
    socket.emit("chatlist");
    socket.emit("list");

    socket.on("list", (data) => {
      if (this.socketswhoiswho.length == 0){
        for (let i=0; i<data.length; i++){
          this.socketswhoiswho.push(data[i]);
          if(data[i].make){
            this.organizator = data[i].name;
            this.pokurOrganizovan = true;
          }
        }
      } else {
        for (let i=0; i<this.socketswhoiswho.length; i++){
          this.socketswhoiswho[i].isReady = data[i].isReady;
          this.socketswhoiswho[i].isLogin = data[i].isLogin;
          this.socketswhoiswho[i].make = data[i].make;
          if(data[i].make){
            this.organizator = data[i].name;
            this.pokurOrganizovan = true;
          }
        }
      }
    });

    socket.on("smoke", (data) => {
      if (data.command == 'goToSmoke'){
        this.vseReady = true;
      }
    })
  }
}
</script>
<style scoped>
.back{
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(128, 128, 128, 0.418);
  background-attachment: fixed;
}
.web{
  width: 100vw;
  position: relative;
  z-index: 2;
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
}
.user{
  width: 100%;
  border-radius: 6px;
  margin-bottom: .2vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.userLoggined{color: rgba(119, 160, 216, 1);}
.user-name{
  width: 70%;
  text-align: left;
  font-size: .8vw;
  display: flex;
  align-items: center;
}
.user-pic{width: 10%;}
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
.chat{width: 55%;}
.bottom-menu{width: 20%;}

/*ПОКУР ГОТОВ*/
.vseGotovy-shadow{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.vseGotovy{
  border: 4px solid black;
  border-radius: 1.2rem;
  width: 20%;
  display: flex;
  font-size: 1.2rem;
  flex-direction: column;
  color: white;
  background-color: rgba(128, 128, 128, 0.938);
  padding: 1rem;
  font-size: 1.2vw;
}
.vseGotovy button{
  padding: .5vw;
  width: 100%;
}
</style>