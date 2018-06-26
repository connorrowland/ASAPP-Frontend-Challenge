import React from 'react';
import MessageModuleFooter from '../MessageModuleFooter';
import MessageModuleBody from '../MessageModuleBody';

import './MessagesContainer.scss';

const MessagesContainer = () => (
  <div className="chat--window">
    <div className="chat-window--header">
      <h2 className="chat-window-header--username">Laura</h2>
    </div>
    <MessageModuleBody />
    <MessageModuleFooter />
  </div>
);

export default MessagesContainer;
