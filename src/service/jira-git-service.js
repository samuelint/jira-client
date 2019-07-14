const { getCurrentBranchName } = require("./git-service");
const { setIssueFixVersionAndCreateFixVersion } = require("./jira-issues-service");

const JIRA_ISSUE_MATCHER = /((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/g;

async function extractIssuesFromCurrentBranch() {
  const branchName = await getCurrentBranchName();

  return branchName.match(JIRA_ISSUE_MATCHER);
}

async function setCurrentBranchIssuesFixVersion(auth, fixVersion) {
  const issueKeys = await extractIssuesFromCurrentBranch();

  return await Promise.all(issueKeys.map(async (issueKey) => {
    try {
      return await setIssueFixVersionAndCreateFixVersion(auth, issueKey, fixVersion);
    } catch(error) {
      return { error };
    }
  }));
}

module.exports = { extractIssuesFromCurrentBranch, setCurrentBranchIssuesFixVersion };
