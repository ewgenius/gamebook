import * as keystone from 'keystone'

const User = keystone.list('User')

export = function (done) {
  const admin = new User.model({
    email: 'admin@gamebook.com',
    password: 'admin',
    name: { first: 'Admin', last: 'User' }
  })

  admin.isAdmin = true

  admin.save()
    .then(() => done())
    .catch(err => done(err))
}