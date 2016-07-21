var falafel = require( './safe' );

function extract( src ) {
	var output = '';

	try {
		falafel(src, function( node ) {
			if( node.type === 'CallExpression' ) {
				var callee = node.callee;
				var args = node.arguments;
				if(
					callee.type === 'Identifier' &&
					callee.name === 'define' &&
					args[ 0 ].type === 'ArrayExpression' &&
					args[ 1 ].type === 'FunctionExpression'
				) {
					var elements = args[ 0 ].elements;
					var fn = args[ 1 ];
					elements = elements.map(function( el ) {
						return el.source();
					});
					var params = fn.params.map(function( param ) {
						return param.name;
					});

					var min = Math.min( elements.length, params.length );

					for( var i = 0; i < min; i++ ) {
						output += 'var ' + params[ i ] + ' = require( ' + elements[ i ] + ' );\n';
					}

					if( params.length > elements.length ) {
						for( var len = params.length; i < len; i++ ) {
							output += 'var ' + params[ i ] + ';\n';
						}
					}
				}
			}
		});
	} catch( e ) {
		output = '';
	}

	return output;
}

module.exports = extract;
