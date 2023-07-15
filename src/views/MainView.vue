<template>
<div class="web">
  <div class="container">
    <div class="leave-popup" v-if="ochkun">
      <text>Очканул?</text>
      <div class="vibor">
        <div @click="leave()">Да, я очкун</div>
        <div @click="ochkun = false">Случайно нажал</div>
      </div>
    </div>
    <div class="header">
      <!-- {{ role }}
      {{ whois }}
      {{ storagePicture }} -->
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
      <div class="leave" @click="ochkun = true">СЛИТЬСЯ</div>
    </div>
    <div class="hub">
      <div class="isReady">
        <!-- <WarriorSuki @ready="(i) => isReady = i" :name="whois" :role="role" /> -->
        <WarriorSuki 
          :name="whois" :role="role" pic="felix" :isReady="ready"
          :isYou="true"
          :pokur="pokurOrganizovan" 
          @ready="(i) => ready = i"
        />
        <WarriorSuki 
          v-for="char in whoiswho" :key="char" 
          :name="char.name" :role="char.title" :pic="char.picture" :isReady="char.ready"
          :isYou="false" 
          :pokur="pokurOrganizovan"
        />
      </div>
      <div class="bottom">
        <div class="chat">
          <Chat :whois="whois" />
        </div>
        <div class="menu">
          организовать покур, слиться
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import WarriorSuki from '../components/WarriorSuki.vue';
import Chat from '../components/ChatPokur.vue';
export default{
  components:{
    WarriorSuki,
    Chat,
  },
  data(){
    return{
      whois: '',
      role: '',
      storagePicture: '',
      organizator: '',
      pokurOrganizovan: false,
      ready: false,
      characters:[
        {
          id: 'a38f9dd3-263f-4f64-9314-b6e171fe5b75',
          name: 'Felix',
          title: 'Задумчивый шаман',
          picture: 'felix',
          ready: false,
          organizoval: false,
        },
        {
          id: 'f786b04d-5388-413c-83c9-dcf8c88b885e',
          name: 'Anton',
          title: 'Танчащий палладин',
          picture: 'antoxa',
          ready: false,
          organizoval: false,
        },
        {
          id: '07dd2448-4e50-4d77-acb2-29a0ab9aa2d4',
          name: 'Danil',
          title: 'Длинный убийца',
          picture: 'danil',
          ready: false,
          organizoval: false,
        },
        {
          id: '4dfd4089-0d29-43ee-acda-7cee22a59bf8',
          name: 'Ruslan',
          title: 'Таинственный маг',
          picture: 'ruslan',
          ready: false,
          organizoval: false,
        },
        {
          id: 'a14ae894-32f0-4be5-9d54-d58333e7f3fc',
          name: 'Sanya',
          title: 'Агро воин',
          picture: 'sanya',
          ready: false,
          organizoval: false,
        },
      ],
      whoiswho:[],
      ochkun: false,
    }
  },
  methods:{
    leave(){
      localStorage.clear();
      this.$router.push({name: 'auth'});
    },
  },
  mounted(){
    this.whois = localStorage.getItem('whois');
    this.role = localStorage.getItem('role');
    // this.storagePicture = localStorage.getItem('picture');
    for(let i = 0; i < this.characters.length; i++){
      if (this.characters[i].name != this.whois){
        this.whoiswho.push(this.characters[i]);
        if(this.characters[i].organizoval == true){
          this.organizator = this.characters[i].title;
          this.characters[i].ready = true;
          this.pokurOrganizovan = true;
        }
      } else {
        this.storagePicture = this.characters[i].picture;
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
/*LEAVE*/
.leave{
  border: 1px solid black;
  border-radius: .4rem;
  padding: .2vw;
}
.leave:hover{
  color: darkred;
  border: 1px solid darkred;
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

.create-pokur:hover{
  color: gray;
  cursor: pointer;
}


/*HUB*/
.hub{
  width: 100%;
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
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1vw;
}
.chat{
  border: 1px solid black;
  width: 30%;
}
.menu{
  border: 1px solid black;
  width: 30%;
}
</style>