<template>
  <div class="warrior">
    <div>{{ name }} {{ role }}</div>
    <div>
      <text @click="$emit('ready', true)">READY?</text>
    </div>
  </div>
</template>
<script>
export default{
  props: ['name', 'role']
}
</script>