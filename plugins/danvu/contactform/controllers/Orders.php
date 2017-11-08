<?php namespace DanVu\ContactForm\Controllers;

use Backend\Classes\Controller;
use BackendMenu;

class Orders extends Controller
{
    public $implement = ['Backend\Behaviors\ListController','Backend\Behaviors\FormController'];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';

    public $requiredPermissions = [
        'danvu.contactform.manager' 
    ];

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('DanVu.ContactForm', 'manager', 'orders');
    }
}