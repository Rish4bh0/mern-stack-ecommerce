import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
// Set the endpoint URL for the socket connection based on whether the app is running on localhost or not
const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:4000"
    : window.location.host;
export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Scroll the message list to the bottom when new messages are received
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }

    if (socket) {
       // Listen for incoming messages from the server
      socket.on("message", (data) => {
        // If the message is from the currently selected user, add it to the message list
        if (selectedUser.name === data.from) {
          setMessages([...messages, data]);
        } else {
          // Otherwise, update the unread count for the user who sent the message
          const existUser = users.find((user) => user.name === data.from);
          if (existUser) {
            setUsers(
              users.map((user) =>
                user.name === existUser.name ? { ...user, unread: true } : user
              )
            );
          }
        }
      });
// Listen for updates to the user list from the server
      socket.on("updateUser", (updatedUser) => {
        const existUser = users.find((user) => user.name === updatedUser.name);
        if (existUser) {
           // If the user already exists in the list, update their information
          setUsers(
            users.map((user) =>
              user.name === existUser.name ? updatedUser : user
            )
          );
        } else {
           // Otherwise, add them to the list of available users
          setUsers([...users, updatedUser]);
        }
      });

      // Listen for the list of available users from the server
      socket.on("listUsers", (updatedUsers) => {
        setUsers(updatedUsers);
      });

       
      socket.on("selectUser", (user) => {
        setMessages(user.messages);
      });
    } else {
      // Listen for a user being selected from the user list
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit("onLogin", {
        name: "Admin",
      });
    }
  }, [messages, selectedUser, socket, users]);

   // Function to handle selecting a user from the list
  const selectUser = (user) => {
    setSelectedUser(user);
    const existUser = users.find((x) => x.name === user.name);
    if (existUser) {
       // Mark the selected user as read by updating their unread count to 0
      setUsers(
        users.map((x) =>
          x.name === existUser.name ? { ...x, unread: false } : x
        )
      );
    }
    socket.emit("onUserSelected", user); // Emit the "onUserSelected" event with the selected user object
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
       // Add the new message to the message list
      setMessages([
        ...messages,
        { body: messageBody, from: "Admin", to: selectedUser.name },
      ]);
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          from: "Admin",
          to: selectedUser.name,
        });
      }, 1000);
      setMessageBody("");
    }
  };

  return (
    <div className="admin-page-wrapper">
      <Row>
        <Col sm={3}>
          {users.filter((x) => x.name !== "Admin").length === 0 && (
            <Alert variant="info">No User Found</Alert>
          )}
          <ListGroup>
            {users
              .filter((x) => x.name !== "Admin")
              .map((user) => (
                <ListGroup.Item
                  action
                  key={user.name}
                  variant={user.name === selectedUser.name ? "info" : ""}
                  onClick={() => selectUser(user)}
                >
                  <Badge
                    bg={
                      selectedUser.name === user.name
                        ? user.online
                          ? "primary"
                          : "secondary"
                        : user.unread
                        ? "danger"
                        : user.online
                        ? "primary"
                        : "secondary"
                    }
                  >
                    {selectedUser.name === user.name
                      ? user.online
                        ? "Online"
                        : "Offline"
                      : user.unread
                      ? "New"
                      : user.online
                      ? "Online"
                      : "Offline"}
                  </Badge>
                  &nbsp;
                  {user.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col sm={9}>
          <div className="admin">
            {!selectedUser.name ? (
              <Alert variant="info">Select a user to start chat</Alert>
            ) : (
              <div>
                <h2>Chat with {selectedUser.name}</h2>
                <ListGroup ref={uiMessagesRef}>
                  {messages.length === 0 && (
                    <ListGroup.Item>No message</ListGroup.Item>
                  )}
                  {messages.map((msg, index) => (
                    <ListGroup.Item key={index}>
                      <strong>{`${msg.from}: `}</strong> {msg.body}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div>
                  <form onSubmit={submitHandler}>
                    <InputGroup className="col-6">
                      <FormControl
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        type="text"
                        placeholder="type message"
                      ></FormControl>
                      <Button type="submit" variant="primary">
                        Send
                      </Button>
                    </InputGroup>
                  </form>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
