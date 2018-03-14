import React from 'react';
import { shallow, mount } from 'enzyme';

import {GuessForm} from './guess-form';

describe('<GuessForm />', () => {
  it('Renders without crashing', () => {
    shallow(<GuessForm />);
  });

  it('Should fire the onMakeGuess callback when the form is submitted', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<GuessForm dispatch={dispatch} />);
    const value = 10;
    wrapper.find('input[type="number"]').instance().value = value;
    wrapper.simulate('submit');
    expect(dispatch).toHaveBeenCalledWith({
      guess: value.toString(),
      type: 'MAKE_GUESS'
    });
  });

  it('Should reset the input when the form is submitted', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<GuessForm dispatch={dispatch}/>);
    const input = wrapper.find('input[type="number"]');
    input.instance().value = 10;
    wrapper.simulate('submit');
    expect(input.instance().value).toEqual('');
  });
});