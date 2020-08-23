# Minimal Web Framework

This is a minimal web framework for making simple webapps without any compilers, bundlers, minifiers or package managers. You don't even need node.

While all those things are necessary for building large production-ready webapps these days, I got tired of fighting with them all the time and realized that, now with with the new ECMAScript modules supported in all the evergreen browsers, for many simple apps, I don't actually need to.

With this framework you just need a text editor, and a browser. 

But it's also sophisticated enough that it looks fairly nice, is fast, and has a similar API and unidirectional dataflow model to React/Redux. 
This was made for people (really, this was just made for me) who miss the good old days where you could make a website with just notepad and a browser, but who don't actually want to back to those days 😛

## Built upon:

- HTML javascript literal templates and dom-differ/renderer by [uhtml](https://github.com/WebReflection/uhtml). This gives us an API with a similar feeling to React/JSX without having to have a bundler or JSX compiler. 
- My own [minimal re-implementation](./lib/mini-redux.js) of my favorite parts of [redux](https://redux.js.org/)
- Basic, minimal css styling by [siimple](https://www.siimple.xyz/)
- I'm being a _little_ bit dishonest here. There _was_ a bundler used in the making of this. In order to use the raw esm modules that made up `uhtml` I had to fixup all the module imports to use relative paths. I didn't want to fixup all those imports by hand so I used [snowpack](https://www.snowpack.dev/)'s `install` feature, which was really quite handy. 

## Running it:

My favorite simple webserver (which is what I would recommend for checking out this example) is the built-in python simple webserver. (Though any webserver will do)

### For python 3:

    python -m http.server

### For python 2:

    python -m SimpleHTTPServer

### Just using the browser

Alternatively, you _can_ still just use a browser, but due to CORS you'll probably need to disable unique origins for `file:///` see [this](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp). It has a small security risk, but might be more convenient than the python server.






