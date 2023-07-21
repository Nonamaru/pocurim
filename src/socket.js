import { reactive } from "vue";
import * as io from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://5.42.73.140:8234";
const URL = "http://5.42.73.140:8234";

export const socket = io(`${URL}`);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.emit("list");
socket.emit("chatlist");
// FELIX socket.emit('logout', {userId: 'a38f9dd3-263f-4f64-9314-b6e171fe5b75', isLogin: false})
// ANTOXA socket.emit('logout', {userId: 'f786b04d-5388-413c-83c9-dcf8c88b885e', isLogin: false})
// DANIL socket.emit('logout', {userId: '07dd2448-4e50-4d77-acb2-29a0ab9aa2d4', isLogin: false})
// SANYA socket.emit('logout', {userId: 'a14ae894-32f0-4be5-9d54-d58333e7f3fc', isLogin: false})
// RUSLAN socket.emit('logout', {userId: '4dfd4089-0d29-43ee-acda-7cee22a59bf8', isLogin: false})

// socket.on("chat", function(data) {
//   console.log(data);
// });


// socket.emit("chat" , {data : "XYI"})
