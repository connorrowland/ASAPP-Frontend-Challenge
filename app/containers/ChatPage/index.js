import React from 'react';
import MessagesContainer from 'components/MessagesContainer';
import './ChatPage.scss';

const ChatPage = () => (
  <div className="chat-page--container">
    <MessagesContainer />
    <MessagesContainer />
  </div>
);

export default ChatPage;
