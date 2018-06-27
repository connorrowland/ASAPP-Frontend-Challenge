import React from 'react';
import { shallow } from 'enzyme';

import MessageBubble from '../index';

describe('<MessageBubble />', () => {
  it('should render a message bubble', () => {
    const renderedComponent = shallow(<MessageBubble />);
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
