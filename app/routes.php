<?php


Route::get('/', function()
{
	return View::make('template.template');
});

/**
*
* User Controller
*
**/

Route::post('login', 'UserController@login');
Route::post('logout', 'UserController@logOut');
Route::post('signup', 'UserController@signup');
Route::post('checkifemailexits', 'UserController@checkIfEmailExits');

// Route::post('admin', ['before' => 'admin', function() {
//      return Response::json('ok');
// }]);

/**
*
* Categories Controller
*
**/

Route::post('addcategory', 'CategoryController@addCategory');