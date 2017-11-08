<?php namespace DanVu\ContactForm\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateOrderTable extends Migration
{
    public function up()
    {
        Schema::create('danvu_contactform_order', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name', 255)->default("");
            $table->string('email', 255)->default("");
            $table->string('mobile', 255)->default("");
            $table->string('company', 255)->default("");
            $table->string('service', 1024)->default("");
            $table->string('message')->default("");
            $table->string('description')->default("");
            $table->string('status')->nullable();
            $table->dateTime('createdate')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('danvu_contactform_order');
    }
}
