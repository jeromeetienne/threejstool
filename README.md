## tquerytool - a command line tool for tquery.js

### How to Install

**NOT YET IMPLEMENTED**

```
npm install tquerytool
```

### How to init a project

copy a tquery boilerplate in the current directory.

```
tquery init
```

### Install a plugin

install a plugin in the project of the current directory

```
tquery install pluginName [tquerypath]
```

If tquerypath isnt provided, it tries to use environment variable ```TQUERYPATH```.
One or the other MUST be provided.

### Some Helpers

Run a local http server with ```python -m SimpleHTTPServer```

```
make server
```