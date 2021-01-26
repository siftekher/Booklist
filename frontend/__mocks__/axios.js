'use strict';
module.exports = {
  get: () => {
    return Promise.resolve({
      data: [
        {
          name: 'Martin',
          isbn: '555555',
          author: '123456789'
        },
        {
          id: 'Luther',
          isbn: '444444',
          author: '987654321'
        }
      ]
    });
  }
};