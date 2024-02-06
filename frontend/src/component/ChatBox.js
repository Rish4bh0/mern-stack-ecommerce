import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxc from "./ChatBox.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:4000"
    : window.location.host;

export default function ChatBox() {
  const uiMessagesRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");

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
       // Emit the 'onLogin' event with the username
      socket.emit("onLogin", { name: userName });
      // Listen for incoming messages from the server
      socket.on("message", (data) => {
        setMessages([...messages, data]);
      });
    }
  }, [messages, socket, userName]);

  const supportHandler = () => {
    setIsOpen(true); // Set isOpen state variable to true to open the chat window
    if (!userName) {
      // If username is not set, prompt user to enter their name and set it as the username
      const newUserName = prompt("Please enter your name");
      setUserName(newUserName);
       // Add welcome message to the message list
      setMessages([
        ...messages,
        {
          from: "System",
          body: `Hello ${newUserName}, please ask your question.`,
        },
      ]);
    }
    const sk = socketIOClient(ENDPOINT);// Create a new socket connection object
    setSocket(sk);
  };
  const closeHandler = () => {
    setIsOpen(false); // Set isOpen state variable to false to close the chat window
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error: Please type message."); // Show an error if message is empty
    } else {
      // Add new message to the message list
      setMessages([
        ...messages,
        { body: messageBody, from: userName, to: "Admin" },
      ]);
      setTimeout(() => {
         // Emit the 'onMessage' event with the message data
        socket.emit("onMessage", {
          body: messageBody,
          from: userName,
          to: "Admin",
        });
      }, 1000);
      setMessageBody("");
    }
    //test
  };
  return (
    <div className="chatbox">
      {!isOpen ? (  // If the chat window is not open, display the support button
        <Button onClick={supportHandler} variant="primary">
          Chat with us
        </Button>
      ) : (
         // If the chat window is open, display the chat window
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <strong>Support</strong>
              </Col>
              <Col className="text-end">
                <Button
                  className="btn-sm btn-secondary"
                  type="button"
                  onClick={closeHandler}
                >
                  x
                </Button>
              </Col>
            </Row>
            <hr />
            <ListGroup ref={uiMessagesRef}>
              {messages.map((msg, index) => ( // Display all messages in the message list
                <ListGroup.Item key={index}>
                  <strong>{msg.from}</strong> {msg.body}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <form action="" onSubmit={submitHandler}>
              <InputGroup className="col-6">
                <FormControl
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  type="text"
                  placeholder="Type a message"
                ></FormControl>
                <Button type="submin" variant="primary">
                  Send
                </Button>
              </InputGroup>
            </form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
