var falafel = require( './safe' );

function patch( src ) {
	var deps = [];
	var di = [];

	try {
		falafel(src, function( node ) {
			if( node.type === 'VariableDeclaration' ) {
				node.declarations.forEach(function( v ) {
					var name;
					var expr;

					if(
						v.init &&
						v.init.type === 'CallExpression' &&
						v.init.callee.name === 'require'
					) {
						name = v.id.name;
						expr = v.init.arguments[ 0 ] && v.init.arguments[ 0 ].value;

						deps.push( {
							name: name,
							expr: expr
						} );
					} else if(
						v.type === 'VariableDeclarator' &&
						v.init === null
					) {
						name = v.id.name;
						di.push( {
							name: name,
							expr: null
						} )
					}
				});
			}
		});
	} catch( e ) {
		deps = [];
		di = [];
		console.log( 'error', e );
	}

	return {
		deps: deps,
		di: di
	};
};

module.exports = patch;
