<?php


Route::get('/', function()
{
	return View::make('template.template');
});

/*=======================================
=            User Controller            =
=======================================*/

Route::post('login', 'UserController@login');
Route::post('logout', 'UserController@logOut');
Route::post('signup', 'UserController@signup');
Route::post('checkifemailexits', 'UserController@checkIfEmailExits');


/*=============================================
=            Categories Controller            =
=============================================*/

Route::post('addcategory', 'CategoryController@addCategory');