import React from 'react';
import { shallow } from 'enzyme';
import MessagesContainer from 'components/MessagesContainer';

import ChatPage from '../index';

describe('<ChatPage />', () => {
  it('should render the two chat modules', () => {
    const renderedComponent = shallow(<ChatPage />);
    expect(renderedComponent.find('div').length).toEqual(2);
  });
});
