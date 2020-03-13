// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js"

const socket =io();

function setUserId({sID, message}) {
    //debugger;
    vm.socketID = sID;
    
}


    


function runDisconnectMessage(packet){
    //debugger;
    console.log(packet);
}

function appendNewMessage(msg){
    // take the incoming message and push it into the Vue instance 
    // into the messages array
    vm.messages.push(msg);
}

const vm = new Vue({
    data: {
        socketID:"",
        messages: [],
        message:"",
        nickName:""
    },

    methods: {
        dispatchMessage() {
            //emit a message event and send the message to the server
            console.log('handle send message');

            socket.emit('chat_message', {
                content:this.message,
                name:this.nickName || "anonymous"
                //|| called a double pipe operator or ab "or" operator
            })

            this.message = "";
        }

    },

    components: {
        newmessage: ChatMessage

    },

    mounted: function(){
        console.log('mounted');
    }

}).$mount("#app");

//some event handling -> these events are coming 
socket.addEventListener('connected',setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message',appendNewMessage);