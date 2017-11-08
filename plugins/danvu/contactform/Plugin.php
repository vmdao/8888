<?php namespace DanVu\ContactForm;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function pluginDetails()
    {
        return [
            'name'        => 'danvu.contactform::lang.plugin.name',
            'description' => 'danvu.contactform::lang.plugin.description',
            'author'      => 'Alexey Bobkov, Samuel Georges',
            'icon'        => 'icon-pencil',
            'homepage'    => 'https://github.com/rainlab/blog-plugin'
        ];
    }

    public function registerComponents()
    {
        return [
        ];
    }
}
