export default function() {
  return Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          name: 'Martin',
          isbn: '555555',
          author: '123456789'
        },
        {
          name: 'Martin',
          isbn: '555555',
          author: '123456789'
        }
      ])
 
  })
}