import React from 'react';
import Adapter  from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import fetch from '../../__mocks__/fetch';
import Home from './Home';
 
global.fetch = fetch;
 
configure({adapter: new Adapter()});

describe('Book component', () => {
  describe('when rendered', () => {
    it('should fetch a list of books', () => {
      const fetchfn = jest.fn(window, 'fetch');
      const HomeInstance = shallow(<Home /> );
      //HomeInstance.setState({ isLoading: true });
      expect(HomeInstance.find('.content').length).toBe(0);
    });
  });
});