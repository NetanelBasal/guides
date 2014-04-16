<?php

class Guide extends \Eloquent {
	protected $guarded = ['id'];


    public function users() {
        return $this->belongsTo('User');
    }

    public function category() {
        return $this->belongsTo('Category');
    }
}