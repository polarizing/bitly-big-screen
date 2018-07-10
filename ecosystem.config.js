module.exports = {
  apps: [{
    name: 'bitly-big-screen',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-52-14-3-213.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/key.pem',
      ref: 'origin/master',
      repo: 'git@github.com:polarizing/bitly-big-screen.git',
      path: '/home/ec2-user/bitly-big-screen',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
