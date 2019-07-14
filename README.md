# CI Jira Client
Simple jira client for use in CI.

Command example : `jira-client setIssueFixVersion --user jira@jira.com --pass 1234 --issueKey ISSUE-1 --fixVersion 1.0.0`

Feel free to make improvements pull requests!

## Authentication
| Arguments | Description |
| --- | --- |
| `user` | jira email  |
| `pass` | jira api-token (https://id.atlassian.com/manage/api-tokens) |

## Commands
| Command | Note |
| --- | --- |
| `setIssueFixVersion --user <USER> --pass <API_TOKEN> --issueKey <JIRA_ISSUE_KEY> --fixVersion <VERSION_STRING>`   | None |
| `extractIssuesFromCurrentBranch` | For a branch named `XYZ/ISSUE-12/blablabla/ISSUE-43/blabla`, `['ISSUE-12', 'ISSUE-43']` is going to be returned. |
| `setCurrentBranchIssuesFixVersion --user <USER> --pass <API_TOKEN> --fixVersion <VERSION_STRING>` | For a branch named `XYZ/ISSUE-12/blablabla/ISSUE-43/blabla`, the `fixVersion` is going to be assigned to both `ISSUE-12` and `ISSUE-43`. |

## Alternative execution using nodejs
Since the application is written in nodejs, it's possible to execute the code directly with node.
`node src/main.js <command> <arguments...>`
