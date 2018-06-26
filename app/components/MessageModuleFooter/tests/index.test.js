import React from 'react';
import { shallow } from 'enzyme';

import MessagesModuleFooter from '../index';

describe('<MessagesModuleFooter />', () => {
  it('should render the messages container', () => {
    const renderedComponent = shallow(<MessagesModuleFooter />);
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
