<template>
  <div class="warrior">
    <div class="char">
      <img v-bind:class="{youWarrior: isYou && !pokur, youNotReady: pokur && !isReady, youReady: pokur && isReady}" :src="require(`@/assets/${pic}.jpg`)">
      <div class="char-desc">
        <!-- <text>{{ name }}</text> -->
        <text v-bind:class="{roleNotReady: pokur && !isready, roleReady: pokur && isReady}">{{ role }}</text>
      </div>
    </div>
    <div>
      <!-- <text @click="$emit('ready', true)">READY?</text> -->
      <button v-if="isYou && !isReady" @click="isReady = true" :disabled="!pokur">READY?</button>
      <button v-if="isYou && isReady" @click="isReady = false">ZASSAL?</button>
    </div>
  </div>
</template>
<script>
export default{
  props: ['name', 'role', 'isYou', 'pokur', 'pic'],
  data(){
    return{
      isReady: false,
    }
  }
}
</script>
<style scoped>
.warrior{
  width: 19%;
}


/*BINDED CLASSES*/
.youWarrior{
  /* border-bottom: 4px solid darkgreen; */
  box-shadow: 0px 0px 7px 5px rgba(119, 160, 216, 1);
}
.youNotReady{
  box-shadow: 0px 0px 7px 5px rgba(216, 123, 119, 1);
}
.youReady{
  box-shadow: 0px 0px 7px 5px rgba(120, 216, 119, 1);
}
.roleNotReady{
  color: rgb(214, 80, 75);
}
.roleReady{
  color: rgb(78, 214, 76);
}


.char{
  width: 100%;
  height: 90%;
  position: relative;
}
.char img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.char-desc{
  position: absolute;
  bottom: 0;
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  backdrop-filter: blur(3px);
  padding-top: .5vw;
  padding-bottom: .5vw;
}
.char-desc text{
  text-align: center;
  width: 100%;
  font-size: 1.5vw;
}
button{
  width: 100%;
  margin-top: .6vw;
  padding: .2vw;
}
</style>