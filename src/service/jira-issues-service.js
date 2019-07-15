const { updateIssue, getIssue } = require("../api/jira-api");
const { createFixVersionIfDoNotExist  } = require("./jira-versions-service");
const { extractJiraIssues } = require("./jira-parsing-service");

async function updateIssueFixVersion(auth, issueKey, fixVersion) {
  return await updateIssue(auth, issueKey, {
    fixVersions: [{
      add: {name: fixVersion}
    }]
  });
}

async function setIssueFixVersionAndCreateFixVersion(auth, issueKey, fixVersion) {
  const projectKey = issueKey.split("-")[0];
  await createFixVersionIfDoNotExist(auth, projectKey, fixVersion);
  await updateIssueFixVersion(auth, issueKey, fixVersion);

  return { issueKey, fixVersion };
}

async function getIssueInfo(auth, issueKey) {
  const { fields } = await getIssue(auth, issueKey);
  const { fixVersions, summary } = fields;

  const filteredFixVersions = fixVersions ? fixVersions.map(({name}) => name) : [];
  return {issueKey,
          fixVersions:filteredFixVersions,
          summary};
}

async function getIssueInfoFromParsedString(auth, string) {
  const issueKeys = await extractJiraIssues(string);

  const promises = issueKeys ? issueKeys.map(async (issueKey) => {
    try {
      return await getIssueInfo(auth, issueKey);
    } catch (error) {
      return {};
    }
  }) : [];
  return await Promise.all(promises);
}

module.exports = { setIssueFixVersionAndCreateFixVersion,
                   updateIssueFixVersion,
                   getIssueInfo,
                   getIssueInfoFromParsedString};
