import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import MessageBubble from 'components/MessageBubble';
import TypingGif from './typing.gif';

import './ChatPage.scss';

export class ChatPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeModule: '',
      currentMessageInputValue: {},
      currentFileInputValue: {},
      messages: [],
      typing: false,
      sendOptionsOpen: false,
    };
  }

  // Scrolls the chat box to the bottom to see new messages.
  scrollToBottom = () => {
    const windows = ['chat-body--Laura', 'chat-body--Rob'];
    for (let i = 0; i <= 1; i++) {
      const chatBox = document.getElementById(windows[i]);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleOptionsClick = () => {
    this.setState({
      sendOptionsOpen: !this.state.sendOptionsOpen
    });
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
    }
  };

  handleInputClick = name => {
    if (name !== this.state.activeModule) {
      this.setState({
        activeModule: name,
      });
    }
  };

  handleMessageInputChange = event => {
    const sender = this.state.activeModule;
    this.setState({
      typing: true,
      currentMessageInputValue: {
        [sender]: event.target.value,
      }
    });
    // Remove the typing gif when message input is emptied.
    const formId = `message-input--${sender}`;
    if (document.getElementById(formId).value === '') {
      this.setState({
        typing: false,
      });
    }
  };

  handleSubmit = () => {
    // Adds timestamp for eventual integration with server.
    const date = new Date();
    const time = date.getTime();
    const { currentMessageInputValue, currentFileInputValue, activeModule, messages } = this.state;
    const messageBody = currentMessageInputValue[activeModule];
    const fileBody = currentFileInputValue[activeModule];
    // Say we have an image and a text value to send. We send the image first, and then we send the text.
    // determine if there is a file input present for sender

    // if both message and file, we need to create two of these messages; one for the file, and one for the message.

    const newMessage = {
      body: messageBody,
      time,
      activeModule,
    };

    const newFileMessage = {
      body: fileBody,
      time,
      activeModule
    }

    const newMessageState = fileBody ? messages.concat(newFileMessage) : messages.concat(newMessage);

    if (fileBody) {
      this.setState({
        messages: newMessageState,
        currentFileInputValue: {
          [activeModule]: null,
        },
        typing: false,
        sendOptionsOpen: false,
      });
      // Reset file input after message is sent.
    } else {
      this.setState({
        messages: newMessageState,
        currentMessageInputValue: {
          [activeModule]: null,
        },
        typing: false,
        sendOptionsOpen: false,
      });

      // Reset textarea after message sent.
      const formId = `message-input--${activeModule}`;
      document.getElementById(formId).value = '';
    }
  };

  // Creates the 'send with reaction' interaction.
  handleReaction = (receiverName, reactionType) => {
    const reactionGifURL =
      reactionType === 'confetti'
        ? "url('https://media.giphy.com/media/120ErahsQyf1q8/giphy.gif')"
        : "url('https://media.giphy.com/media/rgF2gZDIoNbpe/giphy.gif')";
    this.handleSubmit();
    const receiver = `chat-body--${receiverName}`;
    const receiverBody = document.getElementById(receiver);
    // So reaction will play as the message fades in.
    setTimeout(() => {
      receiverBody.style.backgroundImage = reactionGifURL;
    }, 200);
    setTimeout(() => {
      receiverBody.style.backgroundImage = '';
    }, 1500);
  };

  renderMessageBubbles = messageBoxOwner => {
    const messageBubble = this.state.messages.map((message, i) => {
      const sender = message.sender === messageBoxOwner;
      const messageBubbleClasses = sender
        ? 'message--bubble-sent'
        : 'message--bubble-received';
      const iconClasses = sender
        ? 'message-bubble--user-photo-sent'
        : 'message-bubble--user-photo-received';

      return (
        <MessageBubble
          key={i}
          messageClasses={messageBubbleClasses}
          messageBody={message.body}
          sender={message.sender}
          iconClasses={iconClasses}
        />
      );
    });
    return messageBubble;
  };

  handleFileInputChange = (e) => {
    const senderName = e.target.id;
    this.setState({
      currentFileInputValue: {
        typing: true,
        [senderName]: e.target.files[0],
      }
    });
    console.log(e.target.files[0]);
  }

  renderMessagesContainers = () => {
    const sender = this.state.activeModule;
    const names = ['Laura', 'Rob'];
    const chatBox = names.map((name, i) => {
      const messages = this.renderMessageBubbles(name);
      const receiver = name === 'Laura' ? 'Rob' : 'Laura';
      return (
        <div
          key={i}
          id={name}
          className={
            sender === name
              ? 'chat--window chat--window-active'
              : 'chat--window chat--window-inactive'
          }
        >
          <div className="chat-window--header">
            <h2 className="chat-window-header--username">{receiver}</h2>
          </div>
          <div className="chat-window--body" id={`chat-body--${name}`}>
            <CSSTransitionGroup
              transitionName="message-bubble"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {messages}
            </CSSTransitionGroup>
            {name !== sender &&
              this.state.typing && (
              <img className="typing-gif" src={TypingGif} alt="Typing Gif" />
            )}
          </div>
          <div className="chat-window--footer">
            <input
              type="file"
              value={this.state.currentFileInputValue.name}
              onChange={this.handleFileInputChange}
              id={name}
            />
            <textarea
              value={this.state.currentMessageInputValue.name}
              onClick={this.handleInputClick.bind(this, name)}
              onChange={this.handleMessageInputChange}
              placeholder="Type your message..."
              id={`message-input--${name}`}
              onKeyPress={this.handleKeyPress}
            />
            {name === sender &&
              this.state.typing && (
              <div className="chat-window--send-button">
                <p className="send-button" onClick={this.handleSubmit}>
                    Send
                </p>
                <div
                  className="send-options--toggle"
                  onClick={this.handleOptionsClick}
                >
                  <div className="send-options-toggle--circle" />
                  <div className="send-options-toggle--circle" />
                  <div className="send-options-toggle--circle" />
                </div>
                <div
                  className={`send-options--toggle-screen ${
                    this.state.sendOptionsOpen
                      ? 'send-options--toggle-screen-open'
                      : ''
                  }`}
                >
                  <p
                    onClick={this.handleReaction.bind(
                      this,
                      receiver,
                      'confetti',
                    )}
                  >
                      Send with confetti
                  </p>
                  <p
                    onClick={this.handleReaction.bind(this, receiver, 'love')}
                  >
                      Send with love
                  </p>
                  <p onClick={this.handleAttachImageClick}>
                    Attach image
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    });
    return chatBox;
  };

  render() {
    const chatBoxes = this.renderMessagesContainers();

    return <div className="chat-page--container">{chatBoxes}</div>;
  }
}

export default ChatPage;
