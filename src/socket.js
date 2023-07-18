import { reactive } from "vue";
import * as io from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://5.42.73.140:8234";

export const socket = io(`${URL}`);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

// socket.on("chat", function(data) {
//   console.log(data);
// });


// socket.emit("chat" , {data : "XYI"})
