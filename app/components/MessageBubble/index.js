import React from 'react';
import PropTypes from 'prop-types';
import LauraStockPhoto from './Laura_Photo.png';
import RobStockPhoto from './Rob_Photo.png';
import './MessageBubble.scss';

function MessageBubble(props) {

  // readMessageInput = () => {
  //   // if (fileBody) {
  //   //   // read the image file and provide it to the bubble
  //   // } else {
  //   //   return props.messageBody;
  //   // }
  //   console.log(props.messageBody);
  // }

  return (
    <div className={`message--bubble ${props.messageClasses}`}>
      <div className={`message-bubble--user-photo ${props.iconClasses}`}>
        <img
          src={props.sender === 'Laura' ? LauraStockPhoto : RobStockPhoto}
          alt={props.sender === 'Laura' ? 'Laura' : 'Rob'}
          className="message-bubble-user-photo--img"
        />
      </div>
      <p className="message-bubble--text">{props.messageBody}</p>
    </div>
  );
}

MessageBubble.propTypes = {
  messageClasses: PropTypes.string,
  iconClasses: PropTypes.string,
  sender: PropTypes.string,
  //messageBody: PropTypes.string,
};

export default MessageBubble;
