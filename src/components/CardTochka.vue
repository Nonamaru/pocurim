<template>
<div class="character">
    <img :src="pic">
    <div class="text" v-html="desc"></div>
</div>
</template>
<script>
export default{
    props: ['pic', 'desc'],
}
</script>
<style scoped>
.character{
    width: 96%;
    height: 15vw;
    margin-bottom: 1vw;
    margin-right: 1vw;
    border: 2px solid gray;
    position: relative;
    border-radius: 1.2rem;
}
.character:hover{
    border: 2px solid darkgray;
    cursor: pointer;
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1.2rem;
}
.text{
    position: absolute;
    bottom: 1vh;
    text-align: center;
    width: 100%;
    color: white;
    backdrop-filter: blur(10px);
    border-radius: 0px 0px 6px 6px;
}
</style>