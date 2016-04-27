var gulp = require('gulp');
var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.coffee([
    	'banner_loader.coffee',
    	'detect_breakpoints.coffee'
	],'public/js/banners.js');
	mix.scripts([
		'EAS_tag.1.0.js',
		'EAS_fif.js',
		'wa-manual-cu.js'
	], 'public/js/EAS_functions.js');
});