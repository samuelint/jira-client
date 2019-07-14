const minimist = require("minimist");
const { setIssueFixVersionAndCreateFixVersion } = require("./service/jira-issues-service");
const { setCurrentBranchIssuesFixVersion, extractIssuesFromCurrentBranch } = require("./service/jira-git-service");

const argv = process.argv.slice(2);

const command = argv[0];
const arguments = minimist(argv);

async function main(command, arguments) {
  const {user,pass, issueKey, fixVersion} = arguments;
  const auth = {user, pass};

  let returnValue = "";

  switch(command) {
    case "setIssueFixVersion":
        returnValue = await setIssueFixVersionAndCreateFixVersion(auth, issueKey, fixVersion);
      break;
    case "extractIssuesFromCurrentBranch":
        returnValue = await extractIssuesFromCurrentBranch();
      break;
    case "setCurrentBranchIssuesFixVersion":
        returnValue = await setCurrentBranchIssuesFixVersion(auth, fixVersion);
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
  process.exit(1);
}
