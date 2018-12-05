const ghpages = require('gh-pages')

const branch = 'gh-pages'

ghpages.publish('build', {
  dotfiles: true,
  branch,
  repo: 'git@github.com:anthonykoch/trivia-app.git',
}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Deployed site to ${branch}!')
  }
})
