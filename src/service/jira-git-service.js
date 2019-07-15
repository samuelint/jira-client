const { getCurrentBranchName } = require("./git-service");
const { setIssueFixVersionAndCreateFixVersion } = require("./jira-issues-service");
const { extractJiraIssues } = require("./jira-parsing-service");

async function extractIssuesFromCurrentBranch() {
  const branchName = await getCurrentBranchName();
  return extractJiraIssues(branchName);
}

async function setIssuesFixVersionFromParsedString(auth, stringToParse, fixVersion) {
  const issueKeys = extractJiraIssues(stringToParse);
  if (!issueKeys) return Promise.resolve([]);

  return await Promise.all(issueKeys.map(async (issueKey) => {
    try {
      return await setIssueFixVersionAndCreateFixVersion(auth, issueKey, fixVersion);
    } catch (error) {
      return { error };
    }
  }));
}

async function setCurrentBranchIssuesFixVersion(auth, fixVersion) {
  const branchName = await getCurrentBranchName();
  return setIssuesFixVersionFromParsedString(auth, branchName, fixVersion);
}

module.exports = { extractIssuesFromCurrentBranch,
                   setCurrentBranchIssuesFixVersion,
                   setIssuesFixVersionFromParsedString };
