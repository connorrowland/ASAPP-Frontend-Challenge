import React from 'react';
import { shallow } from 'enzyme';

import MessagesModuleBody from '../index';

describe('<MessagesModuleBody />', () => {
  it('should render the messages container', () => {
    const renderedComponent = shallow(<MessagesModuleBody />);
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
