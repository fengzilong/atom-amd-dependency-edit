var falafel = require( './safe' );

function accept( src, patch ) {
	var output = '';

	try {
		output = falafel(src, function( node ) {
			if( node.type === 'CallExpression' ) {
				var callee = node.callee;
				var args = node.arguments;
				if(
					callee.type === 'Identifier' &&
					callee.name === 'define' &&
					args[ 0 ].type === 'ArrayExpression' &&
					args[ 1 ].type === 'FunctionExpression'
				) {
					var arr = args[ 0 ];
					var fn = args[ 1 ];

					// 替换依赖列表
					var counter = 0;
					var source = arr.source().trim().replace(/(['|"])(.+?)(['|"])/g, function( _, quoteBefore, matched, quoteAfter, i ) {
						if( patch.deps[ counter ] ) {
							var ret = quoteBefore + patch.deps[ counter ].expr + quoteAfter;
							counter++;
							return ret;
						} else {
							return '';
						}
					});

					console.log( source );

					source = source.slice( 1, -1 ).split( ',' );

					source = source.filter(function( v ) {
						if( v.trim() !== '' ) {
							return true;
						} else {
							return false;
						}
					});

					for( var i = counter, len = patch.deps.length; i < len; i++ ) {
						source.push( '\'' + patch.deps[ i ].expr + '\'' );
					}

					source = source.filter(function( v ) {
						// 排除空值
						return !/^\s*$/.test( v );
					});

					source = source.join( ',' );

					arr.update( '[' + source + ']' );

					// 替换形参
					params = patch.deps.concat( patch.di ).map(function( v ) {
						return v.name;
					});;

					var fnsource = fn.source().trim();
					fnsource = fnsource.replace(/^function\(([\s\S]+?)\)/g, function( _, matched ) {
						return 'function( ' + params.join( ', ' ) + ' )';
					});

					fn.update( fnsource );
				}
			}
		});
	} catch( e ) {
		output = e;
	}

	return output;
}

module.exports = accept;
