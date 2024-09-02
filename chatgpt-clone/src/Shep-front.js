import React, { useState } from 'react';
import './ShepStyle.css'; // Your existing styles
import UploadModal from './UploadModal'; // Import the modal
import logo from './sheplogo.svg'; // Import logo

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'Shepherd',
      text: "Welcome John, thank you for creating your free account. Before we continue please enter your location below. This will allow me to provide a more accurate price prediction based on the market in your area."
    },
  ]);
  const [input, setInput] = useState('');
  const [isModalOpen, setModalOpen] = useState(false); // State for modal

  const handleUploadClick = () => {
    setModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  const handleFileUpload = (file) => {
    // Handle the file upload logic here
    console.log("File uploaded:", file);
    setModalOpen(false); // Close the modal after uploading the file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { text: input, sender: 'You' };
    setMessages([...messages, userMessage]);

    // Add your backend communication logic here
    setInput('');
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Shepherd AI</h1>
        <button className="doc-upload-button" onClick={handleUploadClick}>
          Doc Upload
        </button>
      </div>
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'Shepherd' ? 'bot' : 'user'}`}>
              <div className="sender-name">
              {msg.sender === 'Shepherd' && <img src={logo} alt="Shepherd Logo" className="shepherd-logo" />}

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

      {/* Modal for uploading documents */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpload={handleFileUpload}
      />
    </div>
  );
}

export default App;

