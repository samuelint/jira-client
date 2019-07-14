const { currentBranch } = require("isomorphic-git");
const fs = require('fs');

async function getCurrentBranchName() {
  return currentBranch({fs, dir: process.cwd() })
}

module.exports = { getCurrentBranchName };
