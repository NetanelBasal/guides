<?php


Route::get('/', function()
{
	return View::make('template.template');
});

Route::post('login', 'UserController@login');
Route::post('logout', 'UserController@logOut');