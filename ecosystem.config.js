module.exports = {
  apps: [
    {
      name: 'ideats',
      script: 'npm',
      args: 'start',
      watch: true,
      ignore_watch: [
        'node_modules',
        'tmp',
        'rearranged',
        'public',
        'assets',
        '.next'
      ]
    },
  ]
}