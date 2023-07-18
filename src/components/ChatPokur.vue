<template>
<div class="chatik">
  <div class="chatik-results">
    <text v-if="messages == ''">Никто ниче не написал еще</text>
    <div class="chatik-message" v-for="mes in messages" :key="mes">
        <text v-if="messages != ''" style="margin-right: .2vw;"><b>{{ whois }}: </b></text>
        <text v-if="messages != ''">{{ mes }}</text>
    </div>
  </div>
  <div class="chatik-napisat">
    <div class="name">{{ whois }}</div>
    <input type="text" v-model="pisat" @keydown.enter="Sending()" />
    <div class="send-icon"><Icon @click="Sending()" icon="bxs:send" /></div>
  </div>
</div>
</template>
<script>
import { Icon } from '@iconify/vue';
import { socket } from '@/socket'
export default{
    props:['whois', 'uId'],
    components:{
        Icon,
    },
    data(){
        return{
            pisat: '',
            message: '',
            // uID: uId,
            messages: []
        }
    },
    methods:{
        async Sending(){
            if (this.pisat != ''){
                // this.message = this.pisat;
                // this.messages.push(this.message);
                await socket.on("chat", function(data) {
                  // console.log(data);
                  console.log(data.text);
                  
                });
                socket.emit("chat" , {userId : `a38f9dd3-263f-4f64-9314-b6e171fe5b75`, text: `${this.pisat}`})
                await socket.on("chat", (data) => {
                  this.uID = data.userId;
                  this.messages.push(data.text);
                });
                this.pisat = '';
            }
        }
    },
    // async mounted(){
    //   await socket.on("chat", function(data) {
    //     // console.log(data);
    //     console.log(data.text);
    //     this.messages.push(data.text);
    //   });
    // }
}
</script>
<style scoped>
/*CHATIK*/
.chatik{
  width: 100%;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  height: 16.93vw;
}
.chatik-results{
  border: 1px solid black;
  border-radius: 0px 0px 6px 6px;
  padding: .5% 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  max-height: 16.93vw;
  overflow: scroll;
}
.chatik-message{
  font-size: 1vw;
  display: flex;
  flex-direction: row;
  margin-bottom: .1vw;
  width: 100%;
  align-items: center;
}
.chatik-napisat{
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  margin-top: .5vw;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.name{font-size: 1vw;}
.chatik-napisat input{
  border: none;
  background-color: lightgray;
  padding: .5% 1%;
  width: 85%;
  font-size: 1vw;
  border-radius: 6px 6px 0px 0px;
}
.send-icon{
  top: 0;
  height: 100%;
  font-size: 1.5vw;
  display: flex;
  align-items: center;
}
</style>