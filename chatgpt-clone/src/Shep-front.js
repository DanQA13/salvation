import React, { useState } from 'react';
import './ShepStyle.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import ShepherdLogo from './sheplogo.svg';

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'Shepherd',
      text: "Welcome John, thank you for creating your free account. Before we continue please enter your location below. This will allow me to provide a more accurate price prediction based on the market in your area."
    },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { text: input, sender: 'You' };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: input });
      const botMessage = { text: response.data.reply, sender: 'Shepherd' };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("There was an error communicating with the server!", error);
    }

    setInput('');
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Shepherd AI</h1>
        <button className="doc-upload-button">Doc Upload</button>
      </div>
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'Shepherd' ? 'bot' : 'user'}`}>
              <div className="sender-name">
                {msg.sender === 'Shepherd' && <img src={ShepherdLogo} alt="Shepherd Logo" />}
                {msg.sender}
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="City, State"
          />
          <button type="submit"><span role="img" aria-label="search">🔍</span></button>
        </form>
      </div>
    </div>
  );
}

export default App;


