# CI Jira Client

Simple jira client for use in CI.

Command example : `jira-client setIssueFixVersion --user jira@jira.com --pass 1234 --issueKey ISSUE-1 --fixVersion 1.0.0`

Feel free to make improvements pull requests!

## Authentication

| Arguments | Description |
| --- | --- |
|  `user` | jira email  |
| `pass` | jira api-token (https://id.atlassian.com/manage/api-tokens) |

## Commands

| Command | Arguments | Description |
| --- | --- | --- |
|  `setIssueFixVersion`   |  `issueKey` : Ex: `ISSUE-1`<br><br>`fixVersion` : Fix version to set and create, can be a any string accepted by jira.   |   Set issue `fixVersion` and create the fix version if it do not exist.  |

## How to build
* `yarn`
* `yarn bundle` -> Produce binary that can be used in CI instead of installing the nodejs stack + node_modules.

## Alternative execution
#### With pkg binary
`jira-client <command> <arguments...>`
#### With NodeJS
`node src/main.js <command> <arguments...>`
