import React from 'react';
import Adapter  from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import fetch from '../../__mocks__/fetch';
import Authorlist from './Authorlist';
 
global.fetch = fetch;
 
configure({adapter: new Adapter()});

describe('Authorlist component', () => {
  describe('when rendered', () => {
    it('should fetch a list of authors', () => {

      const fetchfn = jest.fn(window, 'fetch');
      const AuthorlistInstance = shallow(<Authorlist /> );
      //AuthorlistInstance.setState({ isLoading: true });
      expect(AuthorlistInstance.find('.content').length).toBe(0);

    });
  });
});