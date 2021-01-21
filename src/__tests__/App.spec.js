import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  
  it('should renders App without crashing', () => {
    shallow(<App />);
  });

})


