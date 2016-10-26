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

const HOOK_DEFAULT_MIDDLE = 'headway_after_entry_content';
const HOOK_DEFAULT_HORSESHOE = 'headway_page_start';
const HOOK_DEFAULT_FOOTER = 'headway_footer_close';
const HOOK_DEFAULT_ABOVE_COMMENTS = 'headway_before_entry_comments';
const HOOK_DEFAULT_SECOND_MIDDLE = 'headway_after_entry_content';
const BCM_COUNTRY = 'no';
const BCM_BRAND = 'sty';
const BCM_TYPE = 'site';
const BCM_SUB = 'wordpress-test-blog';
const BCM_BODY_OPEN_HOOK = 'before_wa_shell_start';
const BCM_BODY_CLOSE_HOOK = 'headway_body_close';
const BCM_TOP_BANNER_SLUG = 'top-banner';
const BCM_SIDE_LEFT_BANNER_SLUG = 'sky-left';
const BCM_SIDE_RIGHT_BANNER_SLUG = 'sky-right';
const BCM_STICKY_RIGHT_BANNER_SLUG = 'sky-right-sticky';
const BCM_STICKY_LEFT_BANNER_SLUG = 'sky-left-sticky';
const BCM_MIDDLE_BANNER_SLUG = 'middle-banner';
const BCM_SECOND_MIDDLE_BANNER_SLUG = 'middle-banner';
const BCM_ABOVE_COMMENTS_BANNER_SLUG = 'middle-banner';
const BCM_FOOTER_BANNER_SLUG = 'middle-banner';
const BCM_WALLPAPER_BANNER_SLUG = 'wallpaper';
const BCM_LAYER_BANNER_SLUG = 'layer';
const BCM_LAYER2_BANNER_SLUG = 'layer2';
const BCM_WALLPAPER_AND_LAYER_HOOK = 'wp_footer';
const BCM_MOBILE_BREAKPOINT = '480';
const BCM_TABLET_BREAKPOINT = '768';
const BCM_CXENSE_PERSISTED_QUERY_ID = 'a7ec4be7a20a21f8a39687794f04544586ad18a4';

$initPlugin = new \BonnierBannerPlugin\BannerPlugin();