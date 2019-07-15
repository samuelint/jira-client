const JIRA_ISSUE_MATCHER = /((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/g;

function extractJiraIssues(string) {
  return string.match(JIRA_ISSUE_MATCHER);
}

module.exports = { extractJiraIssues };
