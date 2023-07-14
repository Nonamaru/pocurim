<template>
<div class="character">
    <img :src="require(`../assets/${pic}.jpg`)">
    <div class="text">{{ desc }}</div>
</div>
</template>
<script>
export default{
    props: ['pic', 'desc'],
    data(){
        return{
            name: 'antoxa' 
        }
    }
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
    background-color: gray;
}
</style>