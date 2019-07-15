const { Mutex } = require("async-mutex");
const { getProject,
        createFixVersion:createFixVersionRequest,
        listVersions } = require("../api/jira-api");

const mutex = new Mutex();

async function doesVersionExist(auth, projectKey, fixVersion) {
  const versions = await listVersions(auth, projectKey);
  const fetchedVersion = versions.filter(({name}) => name === fixVersion);
  return fetchedVersion.length > 0;
}

async function createFixVersion(auth, projectKey, fixVersion) {
  const {id} = await getProject(auth, projectKey);
  return await createFixVersionRequest(auth, id, fixVersion)
}

async function createFixVersionIfDoNotExist(auth, projectKey, fixVersion) {
  const mutexRelease = await mutex.acquire();
  try {
    if (!await doesVersionExist(auth, projectKey, fixVersion)) {
      await createFixVersion(auth, projectKey, fixVersion);
    }
  } catch (error) {
    throw error;
  } finally {
    mutexRelease();
  }
}

module.exports = { doesVersionExist, createFixVersion, createFixVersionIfDoNotExist };
