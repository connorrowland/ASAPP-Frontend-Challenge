import React from 'react';
import LauraStockPhoto from './Laura_Photo.png';
import RobStockPhoto from './Rob_Photo.png';
import './MessageBubble.scss';

const MessageBubble = () => (
  <div>
    <div className="message--bubble message--bubble-sent">
      <div className="message-bubble--user-photo message-bubble--user-photo-sent">
        <img
          src={LauraStockPhoto}
          alt="Laura"
          className="message-bubble-user-photo--img"
        />
      </div>
      <p className="message-bubble--text">
        Hello Rob, how are you? Hahahahaha oh wow.
      </p>
    </div>
    <div className="message--bubble message--bubble-received">
      <div className="message-bubble--user-photo message-bubble--user-photo-received">
        <img
          src={RobStockPhoto}
          alt="Rob"
          className="message-bubble-user-photo--img"
        />
      </div>
      <p className="message-bubble--text">
        Hello Rob, how are you? Hahahahaha oh wow.
      </p>
    </div>
  </div>
);

export default MessageBubble;
