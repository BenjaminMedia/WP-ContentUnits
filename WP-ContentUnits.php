<?php
/*
Plugin Name: WordPress Manual Content Units v2
Plugin URI: https://github.com/BenjaminMedia/WP-ContentUnits
Description: Plugin that allows you to manually add Specific Content Units to WordPress
Author: Frederik Rabøl & Alf Henderson
Version: 2.1.9.5
Author URI: http://www.bonnierpublications.com
*/

$directory = plugin_dir_path(__FILE__);

include_once($directory.'bannerPlugin.php');
include_once($directory.'bannerGroup.php');
include_once($directory.'Banner.php');

$initPlugin = new \BonnierBannerPlugin\BannerPlugin();