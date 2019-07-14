const minimist = require("minimist");
const { setIssueFixVersionAndCreateFixVersion } = require("./service/jira-issues-service");

const argv = process.argv.slice(2);

const command = argv[0];
const arguments = minimist(argv);

async function main(command, arguments) {
  const {user,pass} = arguments;
  const auth = {user, pass};

  switch(command) {
    case "setIssueFixVersion":
        const {issueKey, fixVersion} = arguments;
        setIssueFixVersionAndCreateFixVersion(auth, issueKey, fixVersion);
      break;

    default:
      throw new Error(`Unrecognized command <${command}>.`)
      break;
  }
}

try {
  main(command, arguments);
} catch(error) {
  console.error(error);
  exit(1);
}
