var request = require('request-promise-native');

const JIRA_BASE_URL = "https://robotiq.atlassian.net";

const DEFAULT_OPTIONS =  {headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          }};

async function jsonRequest(method, restPath, auth, options) {
  const requestArguments = {...DEFAULT_OPTIONS,
    ...{method},
    ...{url:`${JIRA_BASE_URL}${restPath}`},
    ...{auth},
    ...options};

    const response = await request(requestArguments);
    return response ? JSON.parse(response) : {};
}

function listVersions(auth, projectKey) {
  return jsonRequest("GET", `/rest/api/3/project/${projectKey}/versions`, auth);
}

function getIssue(auth, issueKey) {
  return jsonRequest("GET", `/rest/api/3/issue/${issueKey}`, auth);
}

function updateIssue(auth, issueKey, update) {
  const body = JSON.stringify({update});
  return jsonRequest("PUT",
                     `/rest/api/3/issue/${issueKey}`,
                     auth,
                     {body});
}

function getProject(auth, projectKey) {
  return jsonRequest("GET", `/rest/api/3/project/${projectKey}`, auth);
}

function createFixVersion(auth, projectId, fixVersion, description) {
  const body = {
    name: fixVersion,
    description,
    projectId,
  };

  const jsonBody = JSON.stringify(body);
  return jsonRequest("POST",
                     "/rest/api/3/version",
                     auth,
                     {body:jsonBody});
}

module.exports = { listVersions, getIssue, updateIssue, getProject, createFixVersion };
