### code-opener-cli

command line interface code opener

#### install

```bash
$ npm i -g code-opener-cli
or
$ yarn global add code-opener-cli
or
$ pnpm add -g code-opener-cli
```

#### usage
```bash
# first set your workspaces
$ openc workspace add <pathToYourWorkspace>
# open it
$ openc <yourProjectFolderName>
```

#### tips
```bash
# show help command
$ openc --help

# If your code editor is not vscode
# then you need to change the executable command
# $folder is a placeholder and will be replaced with the corresponding path when executed.
$ openc openCMD 'idea $folder'

# It's much easier to alias a project,
# and then you can use the alias to open the project.
# for example
$ openc alias add my ~/workspace/my-project
$ openc my
```

#### config

```bash
# open folder, Similarly ** matching is possible for <folderName>, like project**
$ openc <folderName>

# print config
$ openc config

# set open command, default is "code $folder", example for idea
$ openc openCMD 'idea $folder'

# set folder alias
$ openc alias <alias> <originFolderName>
# remove alias
$ openc alias <alias>
# clear alias
$ openc alias clear
# print alias
$ openc alias print

# set workspaces
$ openc workspace add <workspacePath>
$ openc workspace rm <workspacePath>
# list workspaces
$ openc workspace ls
# clear workspaces
$ openc workspace clear

# set workspaceOnly, default true, change false will travel globally
$ openc workspaceOnly <true | false>

# set ignoreFolders
$ openc ignoreFolders add <ignoreFolder>
$ openc ignoreFolders rm <ignoreFolder>
# list ignoreFolders
$ openc ignoreFolders ls
# clear ignoreFolders
$ openc ignoreFolders clear
```