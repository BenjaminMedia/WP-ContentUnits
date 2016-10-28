<?php

namespace BonnierBanner;

use BonnierBannerPlugin\BannerPlugin;

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
        if (isset($type, $this->bannerTypes)) {
            $bannerAttributes = ($sticky)?'class="bonnier-ad fixed" data-listen="sticky-banner"':'class="bonnier-ad"';
            return "<div $bannerAttributes data-ad-position=\"$cu\">
                </div>";
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