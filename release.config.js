/* eslint-disable */

module.exports = {
  analyzeCommits: ['@semantic-release/commit-analyzer'], // Determine the type of release by analyzing commits with conventional-changelog
  verifyConditions: [
    '@semantic-release/changelog', // Verify the presence and the validity of the configuration
    '@semantic-release/npm', // Verify the presence and the validity of the npm authentication and release configuration
    '@semantic-release/github', // Verify the presence and the validity of the GitHub authentication and release configuration
    '@semantic-release/git' // Verify the presence and the validity of the Git authentication and release configuration
  ],
  generateNotes: ['@semantic-release/release-notes-generator'], // Generate release notes for the commits added since the last release with conventional-changelog
  prepare: [
    '@semantic-release/changelog', // Create or update the changelog file in the local project repository
    '@semantic-release/npm', // Update the package.json version and create the npm package tarball
    ,
    [
      '@semantic-release/exec', // Execute a shell command to update package.json to new version
      {
        prepareCmd: './config/_ci/release/prepare-assets ${nextRelease.version}'
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'README.md', 'package.json', './dist', './lib'] // Push a release commit and tag, including globed files
      }
    ]
  ],
  publish: [
    '@semantic-release/npm', // Update the package.json version and create the npm package tarball
    ,
    '@semantic-release/github', // Publish a GitHub release
  ],
  success: ['@semantic-release/github'], // Add a comment to GitHub issues and pull requests resolved in the release
  fail: ['@semantic-release/github'], // Open a GitHub issue when a release fails
  plugins: [] // Reset default plugins and use custom steps defined in this file
}
