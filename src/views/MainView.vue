<template>
<div class="web">
  <div class="container">
    <div class="header">
      <!-- {{ role }}
      {{ whois }}
      {{ storagePicture }} -->
      <text v-if="!pokurOrganizovan">
        Покур никто не организовал, 
        <text class="create-pokur" @click="pokurOrganizovan = !pokurOrganizovan;" >
          <b>организовать покур?</b>
        </text>
      </text>
      <text v-if="pokurOrganizovan">Организатор покура: <b>{{ role }}</b></text>
      <div class="leave" @click="leave()">СЛИТЬСЯ</div>
    </div>
    <div class="hub">
      <div class="isReady">
        <!-- <WarriorSuki @ready="(i) => isReady = i" :name="whois" :role="role" /> -->
        <WarriorSuki 
          :name="whois" :role="role" pic="felix" 
          :isYou="true"
          :pokur="pokurOrganizovan" 
        />
        <WarriorSuki 
          v-for="char in whoiswho" :key="char" 
          :name="char.name" :role="char.title" :pic="char.picture"
          :isYou="false" 
          :pokur="pokurOrganizovan" 
        />
      </div>
      <div class="chatik">
        <div class="chatik-napisat">
          <input type="text" v-model="pisat" @keydown.enter="Sending()" />
          <button @click="Sending()">send</button>
        </div>
        <div class="chatik-results">
          {{ message }}
        </div>
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
      storagePicture: '',
      pokurOrganizovan: false,
      pisat: '',
      message: '',
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
      ],
      whoiswho:[]
    }
  },
  methods:{
    leave(){
      localStorage.clear();
      this.$router.push({name: 'auth'});
    },
    Sending(){
      this.message = this.pisat;
    }
  },
  mounted(){
    this.whois = localStorage.getItem('whois');
    this.role = localStorage.getItem('role');
    // this.storagePicture = localStorage.getItem('picture');
    for(let i = 0; i < this.characters.length; i++){
      if (this.characters[i].name != this.whois){
        this.whoiswho.push(this.characters[i]);
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
.leave{
  border: 1px solid gray;
  border-radius: .4rem;
  padding: .2vw;
  background-color: lightgray;
}
.leave:hover{
  color: darkred;
  border: 1px solid darkred;
  background-color: gray;
  cursor: pointer;
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


/*CHATIK*/
.chatik{
  width: 100%;
  border: 1px solid black;
  margin-top: 1vw;
}
</style>