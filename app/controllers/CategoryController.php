<?php

class CategoryController extends \BaseController {


	public function index() {
		 return Response::json(Category::all());
	}

    public function getGuidesByCategory() {

         $guide = Guide::with('category')->where('category_id', '=', '2')->get();
            foreach($guide as $guide) {
                return $guide->category->name;
            }



    }

}