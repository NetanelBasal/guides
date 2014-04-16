<?php

class CategoryController extends \BaseController {


	public function index() {
		 return Response::json(Category::all());
	}

}