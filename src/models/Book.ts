import * as keystone from 'keystone'
const Types = keystone.Field.Types

const Book = new keystone.List('Book')

Book.add({
  name: {
    type: Types.Text,
    required: true,
    initial: true,
    index: true
  },
  owner: {
    type: Types.Relationship,
    ref: 'User',
    required: true,
    initial: true
  }
})

Book.defaultColumns = 'name'
Book.register()