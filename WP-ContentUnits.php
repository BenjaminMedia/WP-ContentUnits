<?php
/*
Plugin Name: WordPress Manual Content Units v2
Plugin URI: https://github.com/BenjaminMedia/wp-manual-cu
Description: Plugin that allows you to manually add Specific Content Units to WordPress
Author: Frederik Rabøl & Alf Henderson
Version: 2.1.2
Author URI: http://www.bonnierpublications.com
*/

$directory = plugin_dir_path(__FILE__);

include_once($directory.'bannerPlugin.php');
include_once($directory.'bannerGroup.php');
include_once($directory.'Banner.php');

const HOOK_DEFAULT_MIDDLE = 'headway_after_entry_content';
const HOOK_DEFAULT_HORSESHOE = 'headway_page_start';
const HOOK_DEFAULT_FOOTER = 'headway_footer_close';
const HOOK_DEFAULT_ABOVE_COMMENTS = 'headway_before_entry_comments';

$initPlugin = new \BonnierBannerPlugin\BannerPlugin();