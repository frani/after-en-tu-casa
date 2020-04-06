import React from 'react';
import { shallow } from 'enzyme';

import ParticipantListItem from './ParticipantListItem';
import { findByTestAttr, checkProps } from '../../../util/testUtils';

const defaultProps = {
  participant: { identity: 'mauro' },
};

const setup = (customProps = {}) => {
  const props = { ...defaultProps, ...customProps };
  const wrapper = shallow(<ParticipantListItem {...props} />);
  return wrapper;
};

describe('the ParticipantListItem component', () => {
  test('renders without crashing', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'participant-list-item');
    expect(component.length).toBe(1);
  });

  test('renders with no warnings with correct props', () => {
    checkProps(ParticipantListItem, defaultProps);
  });

  test('displays the correct participant identity', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'participant-list-item');
    expect(component.text().includes(defaultProps.participant.identity)).toBe(true);
  });
});
