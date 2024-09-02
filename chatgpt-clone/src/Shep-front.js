import React, { useState } from 'react';
import './ShepStyle.css';
import UploadModal from './UploadModal';
import Sidebar from './Sidebar';
import sheplogo from './sheplogo.svg'; // Make sure this path is correct

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'Shepherd',
      text: "Welcome, thank you for creating your free account. ",
    },
  ]);

  const [input, setInput] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [conversations, setConversations] = useState([
    { title: 'Conversation 1' },
    { title: 'Conversation 2' },
    { title: 'Conversation 3' },
  ]);
  const [currentConversation, setCurrentConversation] = useState(0);

  const handleUploadClick = () => {
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
  };

  const handleFileUpload = (file) => {
    console.log("File uploaded:", file);
    setModalOpen(false); 
  };

  const handleSelectConversation = (index) => {
    setCurrentConversation(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { text: input, sender: 'You' };
    setMessages([...messages, userMessage]);

    setInput('');
  };

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <img src={sheplogo} alt="Shepherd Logo" className="shepherd-logo" />
          <span className="shepherd-text">Shepherd AI</span>
        </div>
        <button className="doc-upload-button" onClick={handleUploadClick}>
          Doc Upload
        </button>
      </div>

      <div className="main-content">
        <Sidebar 
          conversations={conversations} 
          onSelectConversation={handleSelectConversation} 
        />
        <div className="chat-container">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender === 'You' ? 'user' : 'bot'}`}>
                <div className="sender-name">
                  {message.sender === 'Shepherd' ? (
                    <img src={sheplogo} alt="Shepherd Logo" className="shepherd-logo-small" />
                  ) : (
                    'You'
                  )}
                </div>
                <div>{message.text}</div>
              </div>
            ))}
          </div>

          <form className="input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="What can I help you with?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
              <span role="img" aria-label="send">🔍</span>
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <UploadModal onClose={handleCloseModal} onUpload={handleFileUpload} />
      )}
    </div>
  );
}

export default App;




