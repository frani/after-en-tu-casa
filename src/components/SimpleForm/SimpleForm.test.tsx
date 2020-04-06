import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestAttr } from '../../util/testUtils';

import SimpleForm from './';

const defaultProps = {
  value: '',
  onChange: () => {},
  onSubmit: () => {},
};

const setup = (props?: Object): ShallowWrapper => {
  const wrapper = shallow(<SimpleForm {...defaultProps} {...props} />);
  return wrapper;
};

describe('the SimpleForm component', () => {
  test('renders without crashing', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'simple-form');
    expect(component.length).toBe(1);
  });

  test('renders an input field', () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, 'input-field');
    expect(input.length).toBe(1);
  });

  test('renders a submit button', () => {
    const wrapper = setup();
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.length).toBe(1);
  });

  test('renders the correct text for the submit button', () => {
    const submitText = 'Testing Time';
    const wrapper = setup({ submitText: submitText });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe(submitText);
  });

  test('renders the correct label for the text input', () => {
    const label = 'Testing Time';
    const wrapper = setup({ label: label });
    const input = findByTestAttr(wrapper, 'input-field');
    expect(input.prop('label')).toBe(label);
  });
});
