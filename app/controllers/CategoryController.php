<?php

class CategoryController extends \BaseController {

	public function __construct() {
		$this->beforeFilter('admin');
	}

	public function addCategory() {
		if(Category::create(Input::all())) {
			 return Response::json(['save' => true]);
		}
	}

}