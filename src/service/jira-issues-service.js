const { updateIssue } = require("../api/jira-api");
const { createFixVersionIfDoNotExist  } = require("./jira-versions-service");

async function updateIssueFixVersion(auth, issueKey, fixVersion) {
  return await updateIssue(auth, issueKey, {
    fixVersions: [{
      set: [{name: fixVersion}]
    }]
  });
}

async function setIssueFixVersionAndCreateFixVersion(auth, issueKey, fixVersion) {
  try {
    const projectKey = issueKey.split("-")[0];
    await createFixVersionIfDoNotExist(auth, projectKey, fixVersion);
    await updateIssueFixVersion(auth, issueKey, fixVersion);

  } catch(error) {
    console.error(error);
  }
}

module.exports = { setIssueFixVersionAndCreateFixVersion, updateIssueFixVersion, };
