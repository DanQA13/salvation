import React from 'react';
import './Sidebar.css';

function Sidebar({ conversations, onSelectConversation }) {
  return (
    <div className="sidebar">
      <h2>Your Convos</h2>
      <ul className="conversation-list">
        {conversations.map((conversation, index) => (
          <li key={index} onClick={() => onSelectConversation(index)}>
            {conversation.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
