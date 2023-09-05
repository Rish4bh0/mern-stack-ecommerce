const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary");
const socket = require("socket.io");

// Handling Uncaught Expection
process.on("uncaughtException" , (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Expection Error`);
    process.exit(1);
});

//Config
dotenv.config({path:"backend/config/config.env"})

//connecting database
connectDatabase()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
//create server
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT} `)
})

// Initialize Socket.IO server instance
const io = socket(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });
  
  // Initialize an empty users array to store user data in memory
  const users = [];
  // Handle connection event
  io.on("connection", (socket) => {

    // Handle disconnection event
      socket.on("disconnect", () => {
          const user = users.find((x) => x.socketId === socket.id);
          if (user) {
              user.online = false;
              const admin = users.find((x) => x.name === "Admin" && x.online);
              if (admin) {
                  io.to(admin.socketId).emit("updateUser", user)
              }
          }
      })
  

      // Handle login event
      socket.on("onLogin", (user) => {
          const updatedUser = {
              ...user,
              online: true,
              socketId: socket.id,
              messages: [],
          }
          // Check if a user with the same name already exists in the users array
          const existUser = users.find((x) => x.name === updatedUser.name);
          if (existUser) {
             // If user exists, update their socketId and online status
              existUser.socketId = socket.id;
              existUser.online = true;
          } else {
            // Otherwise, add the new user to the users array
              users.push(updatedUser);
          }
  
          // Find the admin user in the users array
          const admin = users.find((x) => x.name === "Admin" && x.online);
          if (admin) {
            // If admin is online, send an update to all connected clients with the updated user data.
              io.to(admin.socketId).emit("updateUser", updatedUser);
          }
  
          if (updatedUser.name === "Admin") {
              io.to(updatedUser.socketId).emit("listUsers", users);
          }
      })
  // Handle user selection event
      socket.on("onUserSelected", (user) => {
          const admin = users.find((x) => x.name === "Admin" && x.online);
          if (admin) {
              const existUser = users.find((x) => x.name === user.name);
              io.to(admin.socketId).emit("selectUser", existUser);
          }
      })
  // Handle message event
      socket.on("onMessage", (message) => {
          if (message.from === "Admin") {
              const user = users.find((x) => x.name === message.to && x.online);
              if (user) {
                  io.to(user.socketId).emit("message", message);
                  user.messages.push(message);
              } else {
                  io.to(socket.id).emit("message", {
                      from: "System",
                      to: "Admin",
                      body: "User Is Not Online"
                  })
              }
          } else {
              const admin = users.find((x) => x.name === "Admin" && x.online);
              if (admin) {
                  io.to(admin.socketId).emit("message", message);
                  const user = users.find((x) => x.name === message.from && x.online);
                  if (user) {
                      user.messages.push(message);
                  }
              } else {
                  io.to(socket.id).emit("message", {
                      from: "System",
                      to: message.from,
                      body: "Sorry, admin is not online right now"
                  })
              }
          }
      })
  })
  

// Unhandled Promise Rejection ---- [suppose there is an error in the "http://" or mistake in database such as "mongo://local....". and for this error we called Unhandled Promise Rejection.  Here is how to solve it]

process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);


    server.close(()=>{
        process.exit(1);

    });


});