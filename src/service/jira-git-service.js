const { getCurrentBranchName } = require("./git-service");

const JIRA_ISSUE_MATCHER = /((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/g;

async function extractIssuesFromCurrentBranch() {
  const branchName = await getCurrentBranchName();

  return branchName.match(JIRA_ISSUE_MATCHER);
}

module.exports = { extractIssuesFromCurrentBranch };
