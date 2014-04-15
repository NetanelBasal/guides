<?php

class UserController extends BaseController {

	public function login() {

	    if(User::checkIfUserValid(Input::json('email'), Input::json('password')))
	    {
	    	if(User::setUserToken()) return Response::json(Auth::user(), 200);
	    }
	    	return Response::json(['flash' => 'Your email/password are incorrect!'], 401);
}

	public function logOut() {

		if(Auth::logout()) return Response::json(['logout' => true], 200);
	}


}