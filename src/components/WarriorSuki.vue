<template>
  <div class="warrior">
    <div v-bind:class="{youWarrior: isYou}">
      {{ role }}
      {{ name }}
      {{ isYou }}
    </div>
    <div>
      <!-- <text @click="$emit('ready', true)">READY?</text> -->
      <button @click="isReady = !isReady" :disabled="!isYou">READY?</button>
      <text v-if="isReady">HE IS READY!</text>
    </div>
  </div>
</template>
<script>
export default{
  props: ['name', 'role', 'isYou'],
  data(){
    return{
      isReady: false,
    }
  }
}
</script>
<style scoped>
.warrior{
  width: 18%;
  border: 1px solid black;
}
.youWarrior{
  border: 2px solid green;
}
</style>