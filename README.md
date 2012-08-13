## threejstool - a command line tool to install three.js, threejs.js and its plugins

### How to Install

Install the package from npmjs.org (**not yet published**)

```
sudo npm install -g threejstool
```

Install the package from git

```
git clone git@github.com:jeromeetienne/threejstool.git
cd threejstool
sudo npm install -g
```

### How to init a project

Copy a threejs boilerplate in the current directory.

```
threejs init
```

### Install a plugin

Install a plugin in the project of the current directory

```
threejs install pluginName [THREEJSPATH]
```

If THREEJSPATH isnt provided, it tries to use environment variable ```THREEJSPATH```.
One or the other MUST be provided.

### Some Helpers

* Display inline help

```
threejs help
```

* Run a local http server with ```python -m SimpleHTTPServer```. It will serve the local directory
as static file. check out [http://127.0.0.1:8000](http://127.0.0.1:8000)

```
make server
```