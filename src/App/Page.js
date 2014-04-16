/**
 * @author sheiko
 * @license MIT
 * jscs standard:Jquery
 */

/**
 * Module representing page
 * @module App/Page
 */

// UMD boilerplate according to https://github.com/umdjs/umd
if ( typeof module === "object" && typeof define !== "function" ) {
	/**
	* Override AMD `define` function for RequireJS
	* @param {function( function, Object, Object )} factory
	*/
	var define = function ( factory ) {
		module.exports = factory( require, exports, module );
	};
}
/**
 * @constructor
 * @alias module:App/Page
 */
define(function( require ) {
	/** @type {module:jQuery} */
	var $ = require( "jquery" );
	/** @lends module:App/Page.prototype */
	return function() {
		var
		/**
			* Module representing the Form
			* @type {modele:Form}
			*/
			Form = require( "./Form" ),
			/**
			 * @type {module:App/Misc/util}
			 */
			util = require( "./Misc/util" ),
			/**
			 *
			 * @type {Node[]}
			 */
			forms = [];
		/**
		 * Expose the shim as global
		 * @lends module:App/Page.prototype
		 */
		window.hfFormShim = {
			/**
			* @constructs
			*/
			__constructor__: function() {
				$( "form[data-enable-shim='true']" ).each(function(){
					forms.push( util.createInstance( Form, [ { boundingBox: $( this ) } ] ) );
				});
			},
			/**
			* Look up for AbstractInput instance for the given HTMLElement
			* @public
			* @param {object} node
			* @returns (object) AbstractInput
			*/
			getInput: function( node ) {
				var $node = $( node ), i, input;
				for ( i in forms ) {
					input = forms[ i ].getInput( $node );
					if ( input ) {
						return input;
					}
				}
				return null;
			}
		};
		return window.hfFormShim;
	};
});