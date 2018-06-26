import React from 'react';
import { shallow } from 'enzyme';

import MessagesContainer from '../index';

describe('<MessagesContainer />', () => {
  it('should render the messages container', () => {
    const renderedComponent = shallow(<MessagesContainer />);
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
