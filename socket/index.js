import { Server } from "socket.io";

const io = new Server(9000, {
    cors: {
        origin: "http://localhost:3000",
    },
})

let users = [{},{}];

const signup = (userData, socketId) => {
    !users.some(user => user.email === userData.email) && users.push({ ...userData, socketId });
}

const getUser = (userEmail) => {
    return users.find(user => user.email === userEmail);
}

io.on("connection", (socket) => {
    console.log("user connected");

    //connect
    socket.on("signup", userData => {
        signup(userData, socket.id);
        io.emit("getUsers", users);
    })

    //send message
    socket.on("sendMessage", (data) => {
        const user = getUser(data.receiverId);
        console.log(user);
        if (user) {
            io.to(user.socketId).emit("getMessage", data)
        } else {
            console.log(`User not found: ${data.receiverId}`);
        }
    });

       // Log out
       socket.on("logout", (email) => {
        users = users.filter(user => user.email !== email);
        io.emit("getUsers", users);
    });
    
    //disconnect
    socket.on("disconnect", () => {
        console.log("user disconnected");
        users = users.filter(user => user.socketId !== socket.id);
        io.emit("getUsers", users);
    });
});
