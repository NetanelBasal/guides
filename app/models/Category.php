<?php

class Category extends \Eloquent {
	protected $guarded = ['id'];
    public $timestamps = false;

    public function guides() {
        return $this->hasMany('Guide');
    }
}