import React from 'react';
import LoadingSpinner from './index';
import { shallow, configure } from 'enzyme';
import ReactSixteenAdapter from 'enzyme/build/adapters/ReactSixteenAdapter';

configure({adapter: new ReactSixteenAdapter()});

describe('Loading Spinner', () => {
  it('should render loading spinner correctly', () => {
    const component = shallow(
      <LoadingSpinner />
    );

    expect(component.find('.sk-fading-circle').length).toEqual(1);
    expect(component.find('.sk-circle').length).toEqual(12);
  });
});
