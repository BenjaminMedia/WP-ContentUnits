<?php

namespace BonnierBannerPlugin;

class Banner
{
    private $code;
    private $bannerBreakpoints;

    private $bannerTypes = [
        'banner',
        'sidebar',
        'basic',
        'wallpaper'
    ];

    public function __construct($contentUnit, $breakpoint = null, $type, $sticky = false,$offset = 0)
    {
        $this->bannerBreakpoints = self::getBannerBreakpoints();
        if (isset($contentUnit)) {
            $this->code = $this->createBannerCode($contentUnit, $breakpoint, $type, $sticky, $offset);
        }
    }

    public static function getBannerBreakpoints()
    {
        return [
            'lg' => 'md-lg',
            'md' => 'md-lg',
            'sm' => 'sm',
            'xs' => 'xs',
        ];
    }

    private function createBannerCode($cu, $breakpoint, $type, $sticky= false, $offset = 0)
    {
        $wallpaperBanner = ($type == 'wallpaper') ? 'data-wallpaper-banner id="wallpaper"' : '';
        if (isset($type, $this->bannerTypes)) {
            if (($type == ('banner' || 'wallpaper')) && isset($breakpoint, $this->bannerBreakpoints)) {
                $bannerBreakpoint = $this->bannerBreakpoints[$breakpoint];
                $offsetAttr = ($offset > 0)? "data-offset=\"$offset\"":'';
                $stickyAttr = ($sticky) ? "class=\"fixed text-center static\" data-listen=\"sticky-banner\" $offsetAttr" : '';
                return "<div class='banner visible-$bannerBreakpoint gtm-banner' data-banner-$bannerBreakpoint $wallpaperBanner $stickyAttr>
                        <div class='banner-min-height banner gtm-banner' data-banner-code='$cu' data-banner-target='true'></div>
                    </div>";
            }
            if ($type == 'sidebanner') {
                $stickyAttr = ($sticky) ? 'class="fixed text-center static" data-listen="sticky-banner"' : 'class="absolute text-center"';
                $banner =
                    "<div $stickyAttr>
                        <div class='banner-min-height banner gtm-banner' data-banner-code='$cu' data-banner-target='true' id='banner-$cu'></div>
                    </div>";
                return $banner;
            }
            if ($type == 'basic') {
                return "<div class='' data-banner-code='$cu' data-banner-target='true'></div>";
            }
        }
        return null;
    }

    public function getCode()
    {
        return $this->code;
    }

    public static function htmlCodeFromProps($contentUnit, $breakpoint = null, $type, $sticky = false,$offset = 0){
        $self = new self($contentUnit, $breakpoint, $type, $sticky,$offset);
        return $self->getCode();
    }
}