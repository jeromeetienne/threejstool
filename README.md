## tquerytool - a command line tool to install tquery.js and its plugins

### How to Install

Install the package from npmjs.org (**not yet published**)

```
sudo npm install -g tquerytool
```

Install the package from git

```
git clone git@github.com:jeromeetienne/tquerytool.git
cd tquerytool
sudo npm install -g
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

* Run a local http server with ```python -m SimpleHTTPServer```. It will serve the local directory
as static file. check out [http://127.0.0.1:8000](http://127.0.0.1:8000)

```
make server
```