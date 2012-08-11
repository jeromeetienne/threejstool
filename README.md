## tquerytool - a command line tool for tquery.js

### How to Install

```
npm install tquerytool
```

### How to Use

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