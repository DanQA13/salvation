import React, { useState } from 'react';
import './ShepStyle.css';
import UploadModal from './UploadModal';
import Sidebar from './Sidebar';
import sheplogo from './sheplogo.svg'; // Ensure this path is correct
import documentIcon from '/Users/danielcornier/chatgpt-clone/chatgpt-clone/chatgpt-clone/src/assets/document.svg';
import searchIcon from '/Users/danielcornier/chatgpt-clone/chatgpt-clone/chatgpt-clone/src/search (3).svg';


function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'Shepherd',
      text: "Welcome, thank you for creating your free account.",
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

  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const handleUploadClick = () => {
    setModalOpen(true); 
    console.log("Modal Open State:", isModalOpen); // Add this line
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

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <div className="logo">
          <img src={sheplogo} alt="Shepherd Logo" className="shepherd-logo" />
          <span className="shepherd-text">Shepherd AI</span>
        </div>
        

        <div className="dark-mode-toggle">
  <label className="switch">
    <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
    <span className="slider round"></span>
    
  </label>
</div>

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
          <button type="button" className="doc-upload-button" onClick={handleUploadClick}>
          <img src={documentIcon} alt="Document" style={{ width: '24px', height: '24px' }} />
  </button>
            <input
              type="text"
              placeholder="What can I help you with?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
            <img src={searchIcon} alt="Document" style={{ width: '22px', height: '22px' }} />
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



