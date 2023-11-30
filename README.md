### code-opener-cli

command line interface code opener

#### install

```bash
$ npm i -g code-opener-cli
```

#### config

```bash
# open folder
$ openc <folderName>

# print config
$ openc config

# set open command, default is "code $folder", example for idea
$ openc "idea $folder"

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
$ openc workspace add <ignoreFolder>
$ openc workspace rm <ignoreFolder>
# list ignoreFolders
$ openc workspace ls
# clear ignoreFolders
$ openc workspace clear
```