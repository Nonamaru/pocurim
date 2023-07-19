<template>
  <div class="warrior">
    <div class="char">
      <img v-bind:class="{youWarrior: isYou && !pokur, youNotReady: pokur && !isReady, youReady: pokur && isReady}" :src="pic"
      >
      <div class="char-desc">
        <!-- <text>{{ name }}</text> -->
        <text v-bind:class="{roleNotReady: pokur && !isready, roleReady: pokur && isReady}">{{ role }}</text>
      </div>
      <div class="ready-button" v-if="isYou && !isReady && pokur" @click="$emit('ready', true)" :disabled="!pokur">
        <text id="ready">READY?</text>
      </div>
      <div class="ready-button" v-if="isYou && isReady" @click="$emit('ready', false)">
        <text id="zassal">ZASSAL?</text>
      </div>
    </div>
    <div>
      <!-- <text @click="$emit('ready', true)">READY?</text> -->
    </div>
  </div>
</template>
<script>
export default{
  props: ['name', 'role', 'isYou', 'pokur', 'pic', 'isReady'],
  data(){
    return{
      // isReady: false,
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
  height: 100%;
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
.ready-button{
  position: absolute;
  width: 30%;
  backdrop-filter: blur(100px);
  border-radius: .2rem;
  text-align: center;
  border: none;
  top: .4vw;
  right: .4vw;
  padding: .2vw;
  z-index: 5;
}
#ready{color: green; cursor: pointer;}
#zassal{color: red; cursor: pointer;}
</style>