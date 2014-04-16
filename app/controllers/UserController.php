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

	public function signup() {
		if(User::create(Input::all())) {
			 return Response::json(['action' => true], 200);
		}
		 return Response::json(['action' => false], 501);
	}

	public function checkIfEmailExits() {
		$email = User::whereEmail(Input::json('email'))->get();
		if(count($email)) {
			 return Response::json(['email' => false]);
		} else {
			 return Response::json(['email' =>true]);
		}

	}


}