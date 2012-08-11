## tquerytool - a command line tool for tquery.js

### How to Install

**NOT YET IMPLEMENTED**

Install the package from npm

```
npm install tquerytool
```

### How to init a project

Copy a tquery boilerplate in the current directory.

```
tquery init
```

### Install a plugin

Install a plugin in the project of the current directory

```
tquery install pluginName [tquerypath]
```

If tquerypath isnt provided, it tries to use environment variable ```TQUERYPATH```.
One or the other MUST be provided.

### Some Helpers

* Display inline help

```
tquery help
```

* Run a local http server with ```python -m SimpleHTTPServer```

```
make server
```