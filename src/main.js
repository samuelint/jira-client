const minimist = require("minimist");
const { setIssueFixVersionAndCreateFixVersion } = require("./service/jira-issues-service");
const { extractIssuesFromCurrentBranch } = require("./service/jira-git-service");

const argv = process.argv.slice(2);

const command = argv[0];
const arguments = minimist(argv);

async function main(command, arguments) {
  const {user,pass} = arguments;
  const auth = {user, pass};

  let returnValue = "";

  switch(command) {
    case "setIssueFixVersion":
        const {issueKey, fixVersion} = arguments;
        returnValue = await setIssueFixVersionAndCreateFixVersion(auth, issueKey, fixVersion);
      break;

    case "extractIssuesFromCurrentBranch":
        returnValue = await extractIssuesFromCurrentBranch();
      break;

    default:
      throw new Error(`Unrecognized command <${command}>.`)
  }

  console.log(returnValue);
}

try {
  main(command, arguments);
} catch(error) {
  console.error(error);
  exit(1);
}
