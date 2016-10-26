<?php

namespace BonnierBannerPlugin;

use BonnierBanner\Banner;
use BonnierBannerGroup\BannerGroup;

class BannerPlugin{
    private $postCount = 0;
    private $externalHeaderSlug = 'wp-content-units';
    private $isExternalHeaderActive;
    public $bcmBrand = '';
    public $bcmCountry = '';
    public $bcmType = '';
    public $bcmCxensePersistedQueryId = '';
    public $bcmMobileBreakpoint;
    public $bcmTabletBreakpoint;
    public $pageTitle;
    public $pageTags;
    public $pageCategories;
    public $pageContentType;
    public $externalShell;
    public $bcmSub;

    public function __construct(){
        $this->addHooks();
        include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
        $this->setBcmVariables();
    }

    public function setBcmVariables(){
        $this->bcmBrand = $this->getOptionOrDefault('bcm-brand', BCM_BRAND);
        $this->bcmCountry = $this->getOptionOrDefault('bcm-country', BCM_COUNTRY);
        $this->bcmType = $this->getOptionOrDefault('bcm-type', BCM_TYPE);
        $this->bcmSub = $this->getOptionOrDefault('bcm-sub', BCM_SUB);
        $this->bcmCxensePersistedQueryId = $this->getOptionOrDefault('bcm-cxense');
        $this->bcmMobileBreakpoint = $this->getOptionOrDefault('breakpoint-mobile', BCM_MOBILE_BREAKPOINT);
        $this->bcmTabletBreakpoint = $this->getOptionOrDefault('breakpoint-tablet', BCM_TABLET_BREAKPOINT);
    }

    public function setDynamicPageVariables(){
        $title = '';
        $tags = '';
        $categories = '';
        $contentType = '';
        $contentType = (get_post_type() === 'post')?'article':get_post_type();

        if(!is_front_page()){
            $title = get_the_title().' — '. get_bloginfo( 'name' );
        }
        else {
            $title = get_bloginfo( 'name' );
        }

        if(!is_front_page() && get_the_tags()){
            $postTags = get_the_tags();
            $tagAmount = count($postTags)-1;
            foreach($postTags as $postTag){
                //return all tags seperated by commas
                $tags .= $postTag->slug;
                $tags .= ($postTags[$tagAmount] !== $postTag)?',':'';
            }
        }

        if(!is_front_page() && get_categories(array('slug'))){
            $postCategories = get_categories(array('slug'));
            $categoryAmount = count($postCategories)-1;
            foreach($postCategories as $postCategory){
                //return all categories seperated by commas
                $categories .= $postCategory->slug;
                $categories .= ($postCategories[$categoryAmount] !== $postCategory)?',':'';
            }
        }

        $this->pageTitle = $title;
        $this->pageTags = $tags;
        $this->pageCategories = $categories;
        $this->pageContentType = $contentType;
    }

    private function addHooks(){
        // Add hooks & filters
        add_filter('widget_text', 'do_shortcode');
        add_shortcode('banner', array($this,'bannerShortcode'));
        add_action('admin_menu', function() {
            // Add a new submenu item under Settings:
            add_options_page('Manual Content Units', 'Manage Content Units', 'manage_options', 'mcu_settings', array($this,'settingsPage'));
        });
        add_action('wp_head', array($this,'setDynamicPageVariables'),1);
        add_action('wp_head', array($this, 'addDynamicBcmTagsToHead'),10);
        add_action($this->getOptionOrDefault('middle-theme-hook', $this->getOptionOrDefault('theme-hook-middle', HOOK_DEFAULT_MIDDLE)), array($this,'middleBanners'), 999999);
        add_filter($this->getOptionOrDefault('body-open-hook', BCM_BODY_OPEN_HOOK ) ,array($this,'addWallpaperDivOpen'),999);
        add_filter($this->getOptionOrDefault('body-close-hook', BCM_BODY_CLOSE_HOOK ) ,array($this,'addWallpaperDivClose'),999);
        add_action($this->getOptionOrDefault('footer-theme-hook', $this->getOptionOrDefault('theme-hook-footer', HOOK_DEFAULT_FOOTER)), array($this,'footerBanners'));
        add_action('plugins_loaded', function(){
            if(class_exists('Wa_External_Header_V2_Public')){
                $this->externalShell = \Wa_External_Header_V2_Public::getInstance();
                $this->isExternalHeaderActive = class_exists('Wa_External_Header_V2_Public');
            }
            else {
                $this->externalShell = false;
                $this->isExternalHeaderActive = false;
            }

            if(($this->isExternalHeaderActive && !$this->externalShell->showShellBanners()) || (!$this->isExternalHeaderActive)){
                //if the WA External shell is not activated, we'll load bcm ourselves.
                add_action('wp_head', array($this,'addBcmTagsToHead'));
                add_action($this->getOptionOrDefault('horseshoe-theme-hook',$this->getOptionOrDefault('theme-hook-horseshoe', HOOK_DEFAULT_HORSESHOE)), array($this,'headerBanners'));
                add_action($this->getOptionOrDefault('theme-hook-comments', $this->getOptionOrDefault('comments-theme-hook', HOOK_DEFAULT_ABOVE_COMMENTS)), array($this,'aboveCommentsBanners'));
                add_action($this->getOptionOrDefault('second-middle-theme-hook', $this->getOptionOrDefault('theme-hook-second-middle', HOOK_DEFAULT_SECOND_MIDDLE)), array($this,'secondMiddleBanners'));
                add_action($this->getOptionOrDefault('wallpaper-hook', $this->getOptionOrDefault('theme-hook-second-middle', BCM_WALLPAPER_AND_LAYER_HOOK)), array($this,'wallpaperAndLayerBanners'));
                add_action('wp_enqueue_scripts', function() {

                    wp_enqueue_style('wa-manual-cu-css', $this->getPublicFolder() . '/css/wa-manual-cu.css');
                    wp_enqueue_script('bcm-script', 'https://bcm.interactives.dk/script/'.$this->bcmCountry.'/'.$this->bcmBrand.'/'.$this->bcmType, array(), true, true);
                }, 999);
            }
        });
    }

    /**
     * Get option from Wordpress or default value
     * @param $option
     * @param null $defaultValue
     * @return mixed|null|void
     */
    public static function getOptionOrDefault($option, $defaultValue = NULL) {
        $newHookNamespace = 'ContentUnit-';
        $oldHookNamespace = 'wp-manual-cu-';
        $themeHook = NULL;
        if(NULL !==(get_option($newHookNamespace. $option, NULL) )){
            $themeHook = get_option($newHookNamespace . $option, NULL );
        }
        else{
            $themeHook = get_option($oldHookNamespace . $option, NULL );
        }
        if( NULL === $themeHook || '' === $themeHook){
            return $defaultValue;
        }
        else{
            return $themeHook;
        }
    }

    public function getPublicFolder()
    {
        return plugin_dir_url( __FILE__ ) . 'public';
    }

    public function bannerShortcode($attrs) {
        $bannerShortCodeAttributes = shortcode_atts([
            'cu' => NULL,
            'breakpoint' => 'lg',
            'sticky' => FALSE,
            'offset' => NULL,
            'container' => ''
        ], $attrs );

        return Banner::htmlCodeFromProps($bannerShortCodeAttributes['cu'],$bannerShortCodeAttributes['breakpoint'],'banner',$bannerShortCodeAttributes['sticky'],$bannerShortCodeAttributes['offset']);
    }

    public function addBcmTagsToHead(){

        echo "
            <meta name=\"bcm-brand\" content=\"$this->bcmBrand\" />
            <meta name=\"bcm-country\" content =\"$this->bcmCountry\" />
            <meta name=\"bcm-type\" content =\"$this->bcmType\" />
            <meta name=\"bcm-sub\" content=\"$this->bcmSub\" />
            <meta name=\"bcm-tablet-breakpoint\" content=\"$this->bcmTabletBreakpoint\">
            <meta name=\"bcm-mobile-breakpoint\" content=\"$this->bcmMobileBreakpoint\">
            ";
    }

    public function addDynamicBcmTagsToHead(){
        echo "
        <meta name=\"cxense-persisted-query-id\" content =\"$this->bcmCxensePersistedQueryId\" />
            <meta name=\"bcm-tags\" content=\"$this->pageTags\" />
            <meta name=\"bcm-categories\" content=\"$this->pageCategories\" />
            <meta name=\"bcm-title\" content=\"$this->pageTitle\" />
            <meta name=\"bcm-content-type\" content=\"$this->pageContentType\" />
        ";
    }

    public function addWallpaperDivOpen(){ echo "<div id=\"wallpaper\">"; }
    public function addWallpaperDivClose(){ echo "</div>"; }

    public function headerBanners(){
        $sidebannerLeft = $this->getOptionOrDefault('sidebanner-left',$this->getOptionOrDefault('sidebanner-left',BCM_SIDE_LEFT_BANNER_SLUG));
        $sidebannerRight = $this->getOptionOrDefault('sidebanner-right',$this->getOptionOrDefault('sidebanner-right',BCM_SIDE_RIGHT_BANNER_SLUG));
        $stickyLeft = $this->getOptionOrDefault('sticky-left',$this->getOptionOrDefault('left-sticky',BCM_STICKY_LEFT_BANNER_SLUG));
        $stickyRight = $this->getOptionOrDefault('sticky-right',$this->getOptionOrDefault('right-sticky',BCM_STICKY_RIGHT_BANNER_SLUG));

        $topBanner = $this->getOptionOrDefault('top-banner-slug',$this->getOptionOrDefault('top-banner-horseshoe',BCM_TOP_BANNER_SLUG));

        $horseshoeBanner = BannerGroup::htmlCodeFromProps('Horseshoe Banners',[
            'banners' => [
                'lg' => $topBanner,
            ],
            'left' => [
                'side' => $sidebannerLeft,
                'sticky' => $stickyLeft
            ],
            'right' => [
                'side' => $sidebannerRight,
                'sticky' => $stickyRight
            ],
        ], 'horseshoe');
        echo $horseshoeBanner;
    }

    public function wallpaperAndLayerBanners(){
        $wallpaper = $this->getOptionOrDefault('wallpaper-slug', BCM_WALLPAPER_BANNER_SLUG);
        $layer = $this->getOptionOrDefault('wallpaper-layer-slug', BCM_LAYER_BANNER_SLUG);
        $layer2 = $this->getOptionOrDefault('wallpaper-layer2-slug', BCM_LAYER2_BANNER_SLUG);

        $wallpaperAndLayerPlaceholders =
        '<div style="display:none;">
            <div class="bonnier-ad" data-ad-position="'.$wallpaper.'" />
            <div class="bonnier-ad" data-ad-position="'.$layer.'" />
            <div class="bonnier-ad" data-ad-position="'.$layer2.'" />
        </div>';
        echo $wallpaperAndLayerPlaceholders;
    }

    public function middleBanners(){
        $middleBannerSlug = $this->getOptionOrDefault('middle-banner-slug', BCM_MIDDLE_BANNER_SLUG);
        $postsBetweenBanners = $this->getOptionOrDefault('posts-between-banners', 1);
        $postsBeforeBanners = $this->getOptionOrDefault('posts-before-banners', 0);

        $maxPostsPerPage = get_option('posts_per_page');
        
        $this->postCount++;

        if($this->postCount >= $postsBeforeBanners){
            if( (($this->postCount % $postsBetweenBanners++) == 0) && ($maxPostsPerPage > $this->postCount)) {
                if($this->isExternalHeaderActive && $this->externalShell->showShellBanners()){
                    print_r($this->externalShell->getBanners());
                }
                else {
                    echo BannerGroup::htmlCodeFromProps('Middle Banners',
                        [
                            'banners' => [
                                'lg'=> $middleBannerSlug,
                            ]
                        ],'banner_group');
                }
            }
        }
    }

    public function secondMiddleBanners() {
        $secondMiddleBannerSlug = $this->getOptionOrDefault('middle-banner-slug', BCM_SECOND_MIDDLE_BANNER_SLUG);

        $maxPostsPerPage = get_option('posts_per_page');
        $postOffset = 1;
        // we do not add to the postCount variable as it is already being added to in middleBanners
        if($this->postCount == $postOffset){
            if( ($this->postCount == $postOffset) && ($maxPostsPerPage >= $this->postCount) ) {
                if($this->isExternalHeaderActive && $this->externalShell->showShellBanners()){
                    print_r($this->externalShell->getBanners());
                    dump('shell');
                }
                else {
                    echo BannerGroup::htmlCodeFromProps('Middle Banners',
                        [
                            'banners' => [
                                'lg'=> $secondMiddleBannerSlug,
                            ]
                        ],'banner_group');
                    dump('not shell');
                }
            }
        }
    }

    public function footerBanners(){
        $footerBannerSlug = $this->getOptionOrDefault('banner-slug-footer',$this->getOptionOrDefault('footer-banner-slug', BCM_FOOTER_BANNER_SLUG));

    $footerBannerGroup = BannerGroup::htmlCodeFromProps('Footer Banners',
        [
            'banners' => [
                'lg'=>$footerBannerSlug,
            ]
        ],'banner_group');

    if($this->isExternalHeaderActive && $this->externalShell->showShellBanners()){
        $footerBannerGroup = $this->externalShell->getBanners();
    }
    
    echo "<div class='row' id='footer-banners'>
            <div class='col-sm-12'>
                $footerBannerGroup
                <div class='clearfix'></div>
            </div>
        </div>";

    }

    public function aboveCommentsBanners(){
        $aboveCommentsSlug = $this->getOptionOrDefault('banner-slug-comments',$this->getOptionOrDefault('comments-banner-slug', BCM_ABOVE_COMMENTS_BANNER_SLUG));

        $aboveCommentsBannerGroup = BannerGroup::htmlCodeFromProps('Above Comments Banners',
            [
                'banners' => [
                    'lg'=>$aboveCommentsSlug,
                ]
            ],'banner_group');

        echo "<div class='row' id='above-comments-banners'>
            <div class='col-sm-12'>
                $aboveCommentsBannerGroup
                <div class='clearfix'></div>
            </div>
        </div>";

    }

    public function settingsPage(){
        if (count($_POST) >= 1) {
            echo"<div class='updated'> <p>Updated settings</p></div>";

            foreach ($_POST as $key => $value) {
                if ($key != 'submit'){
                    update_option('ContentUnit-'.$key, $value, TRUE);
                }
            }
        }

        $HorseshoeForm = $this->generateOptionPanel('Horseshoe',[
            'title' => 'Horseshoe',
            'forms' => [
                self::generateBannerGroupForm('Horseshoe Hook','Horseshoe',[
                    'theme-hook' => 'code-fork',
                ], [
                    'theme-hook' => HOOK_DEFAULT_HORSESHOE
                ]),
                self::generateBannerGroupForm('Horseshoe Banner Slug','Top',[
                    'banner-slug' => 'code',
                ],[
                    'banner-slug' => BCM_TOP_BANNER_SLUG
                ]),
                self::generateBannerGroupForm('Side Banners','Sidebanner',[
                    'Left' => 'caret-square-o-left',
                    'Right' => 'caret-square-o-right',
                ],[
                    'Left' => BCM_SIDE_LEFT_BANNER_SLUG,
                    'Right' => BCM_SIDE_RIGHT_BANNER_SLUG
                ]),
                self::generateBannerGroupForm('Sticky Banners','Sticky',[
                    'Left' => 'caret-square-o-left',
                    'Right' => 'caret-square-o-right',
                ],[
                    'Left' => BCM_STICKY_LEFT_BANNER_SLUG,
                    'Right' => BCM_STICKY_RIGHT_BANNER_SLUG
                ]),
            ]
        ]);

        $bcmTagForm = $this->generateOptionPanel('BCM Tags', [
            'title' => 'BCM',
            'forms' => [
                self::generateBannerGroupForm('BCM Information','bcm',[
                    'brand' => 'star',
                    'type' => 'sitemap',
                    'country' => 'flag'
                ],[
                    'brand' => BCM_BRAND,
                    'type' => BCM_TYPE,
                    'country' => BCM_COUNTRY
                ]),
                self::generateBannerGroupForm('Cxense Persisted Query Id','bcm',[
                    'cxense' => 'code',
                    'sub' => 'sitemap',
                ],[
                    'cxense' => BCM_CXENSE_PERSISTED_QUERY_ID,
                    'sub' => BCM_SUB
                ]),
                self::generateBannerGroupForm('Mobile Breakpoints','breakpoint', [
                    'mobile' => 'mobile',
                    'tablet' => 'tablet',
                ],[
                    'mobile' => BCM_MOBILE_BREAKPOINT,
                    'tablet' => BCM_TABLET_BREAKPOINT
                ])
            ]
        ]);

        $wallpaperAndLayerForm = $this->generateOptionPanel('Wallpaper & Layer', [
            'title' => 'Wallpaper',
            'forms' => [
                self::generateBannerGroupForm('Wallpaper & Layer','wallpaper',[
                    'hook' => 'code-fork',
                    'slug' => 'code',
                    'layer-slug' => 'code',
                    'layer2-slug' => 'code',
                ], [
                    'hook' => BCM_WALLPAPER_AND_LAYER_HOOK,
                    'slug' => BCM_WALLPAPER_BANNER_SLUG,
                    'layer-slug' => BCM_LAYER_BANNER_SLUG,
                    'layer2-slug' => BCM_LAYER2_BANNER_SLUG
                ]),
                self::generateBannerGroupForm('Body open theme hook (Wallpaper open tag)','body',[
                    'open-hook' => 'code-fork',
                    'close-hook' => 'code-fork'
                ],[
                    'open-hook' => BCM_BODY_OPEN_HOOK,
                    'close-hook' => BCM_BODY_CLOSE_HOOK
                ]),
            ]
        ]);

        $middleForm = $this->generateOptionPanel('Between Content Banners (aka. Middle)', [
            'title' => 'second-middle',
            'forms' => [
                self::generateBannerGroupForm('Middle Banner Hook','middle',[
                    'theme-hook' => 'code-fork',
                ],[
                    'theme-hook' => HOOK_DEFAULT_MIDDLE
                ]),
                self::generateBannerGroupForm('Middle Banner Slug','middle',[
                    'banner-slug' => 'code',
                ],[
                    'banner-slug' => BCM_MIDDLE_BANNER_SLUG
                ])
            ]
        ]);

        $secondMiddleForm = $this->generateOptionPanel('#2 Middle Banner (Strossle)', [
            'title' => 'Second',
            'forms' => [
                self::generateBannerGroupForm('#2 Middle Banner Hook','second-middle',[
                    'theme-hook' => 'code-fork',
                ],[
                    'theme-hook' => HOOK_DEFAULT_SECOND_MIDDLE
                ]),
                self::generateBannerGroupForm('#2 Middle Banner Slug','second-middle',[
                    'banner-slug' => 'code',
                ],[
                    'banner-slug' => BCM_SECOND_MIDDLE_BANNER_SLUG
                ])
            ]
        ]);

        $footerForm = $this->generateOptionPanel('Footer Banners', [
            'title' => 'Footer',
            'forms' => [
                self::generateBannerGroupForm('Footer Banner Hook','Footer',[
                    'theme-hook' => 'code-fork',
                ],[
                    'theme-hook' => HOOK_DEFAULT_FOOTER
                ]),
                self::generateBannerGroupForm('Footer Banner Slug','Footer',[
                    'banner-slug' => 'code',
                ],[
                    'banner-slug' => BCM_FOOTER_BANNER_SLUG
                ])
            ]
        ]);

        $aboveCommentsForm = $this->generateOptionPanel('Above Comments Banners', [
            'title' => 'above-comments',
            'forms' => [
                self::generateBannerGroupForm('Above Comments Hook','comments',[
                    'theme-hook' => 'code-fork',
                ],[
                    'theme-hook' => HOOK_DEFAULT_ABOVE_COMMENTS
                ]),
                self::generateBannerGroupForm('Above Comments Banners','comments',[
                    'banner-slug' => 'code',
                ],[
                    'banner-slug' => BCM_ABOVE_COMMENTS_BANNER_SLUG
                ])
            ]
        ]);

        $metaForm = $this->generateOptionPanel('General Settings', [
            'title' => 'General',
            'forms' => [
                self::generateBannerGroupForm('Posts Before first Banner','posts',[
                    'before-banners' => 'bars',
                ],[
                    'before-banners' => 2
                ]),
                self::generateBannerGroupForm('Posts Between Banners','posts',[
                    'between-banners' => 'bars',
                ],[
                    'between-banners' => 2
                ])
            ]
        ]);


        wp_enqueue_style( 'AdminBootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css', array(), '', 'all' );
        wp_enqueue_style('AdminFA','//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',array(),'');

        $form = <<< HTML
    <style>
        .padding-t { padding-top: 30px; }
        .padding-b { padding-bottom: 20px; }
        #wpwrap {background-color: #FFF;}
    </style>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h2>Manage Content Units</h2>
            </div>
            <div class="col-xs-12 col-md-10 col-lg-11">


            <form method="post" action=''>
                $bcmTagForm

                $HorseshoeForm

                $middleForm

                $secondMiddleForm

                $aboveCommentsForm

                $footerForm

                $wallpaperAndLayerForm
                $metaForm

                <input type='submit' name='submit' value='Save' class='btn btn-primary pull-right' style="margin-top: 30px;" />
            </form>
            </div>
        </div>
    </div>
HTML;

        echo $form;
    }

    private function generateOptionPanel($title,$array){
        $inputForms = '';
        foreach($array['forms'] as $form){
            $inputForms .= $form;
        }
        $htmlPanel =
            "<div class='panel panel-info'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>$title</h3>
                </div>
                <div class='panel-body'>
                $inputForms
                </div>
            </div>";

        return $htmlPanel;
    }

    private function generateBannerGroupForm($title,$namespace,$array, $fallbackValues = []){
        $bannerGroups = $this->generateBannerGroupInputs($namespace,$array, $fallbackValues);
        $htmlForm = "
        <div class='col-xs-12'>
            <div class='col-xs-6 col-sm-4'>
                <label>$title</label>
            </div>
            <div class='col-xs-12 col-sm-8'>
                <div class='form-group'>$bannerGroups</div>
            </div>
        </div>
        ";

        return $htmlForm;
    }

    private function generateBannerGroupInputs($namespace,$array, $fallbackValues = []){
        $htmlDropdown = '<div class="input-group">';
        foreach($array as $key => $value){
            $fallbackValue = (array_key_exists($key,$fallbackValues))?$fallbackValues[$key]:'';
            $htmlDropdown .= '
                <span class="input-group-addon">
                    <i class="fa fa-'.strtolower($value).'"></i>
                </span>
                <input class="form-control" name="'.strtolower($namespace).'-'.strtolower($key).'" placeholder="'.$namespace.' '.$key.'" value="'.$this->getOptionOrDefault(strtolower($namespace).'-'.strtolower($key),$this->getOptionOrDefault( strtolower($key).'-'.strtolower($namespace), $fallbackValue) ).'" type="text" />';
        }
        $htmlDropdown .= '</div>';
        return $htmlDropdown;
    }
}