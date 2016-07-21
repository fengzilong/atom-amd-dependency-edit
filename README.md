# amd-dependency-edit

> edit amd-like dependencies in commonjs style

<img src="https://github.com/fengzilong/atom-amd-dependency-edit/blob/master/screenshot.gif?raw=true" alt="screenshot" width="800">

only support following structure currently.
`define` accepts two arguments, first is `array`, second is `function`

```js
define(
[
	'path/to/a',
	'path/to/b',
	'path/to/c'
],
function( a, b, c, d ) {
	// your own logic
});
```

Code above will be transformed into following code at first time

```js
var a = require( 'path/to/a' );
var b = require( 'path/to/b' );
var c = require( 'path/to/c' );
var d;
```

Try to edit source code or generated code, both will be synced automatically when code changes.

Enjoy ;)

## License

MIT &copy; [fengzilong](https://github.com/fengzilong)
