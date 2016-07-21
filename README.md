# amd-dependency-edit

> edit amd-like dependencies in commonjs style

<img src="https://github.com/fengzilong/atom-amd-dependency-edit/blob/master/screenshot.gif?raw=true" alt="screenshot" width="500">

only support following amd style currently.
`define` only accepts two argument, first is `array`, second is `function`

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

Code above will be transformed into following at first time

```js
var a = require( 'path/to/a' );
var b = require( 'path/to/b' );
var c = require( 'path/to/c' );
var d;
```

Try to edit source code or generated code, they will be synced automatically on next change.

Enjoy it ;)

## License

MIT &copy; [fengzilong](https://github.com/fengzilong)
