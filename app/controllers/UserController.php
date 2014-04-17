<?php

class UserController extends BaseController {


/*===========================================================
=            Login The User and Set unique Token            =
===========================================================*/

	public function login() {

	    if(User::checkIfUserValid(Input::json('email'), Input::json('password'))) {
	    	if(User::setUserToken()) {
			    	return Response::json(Auth::user(), 200);
			    }
	    	}
	    	return Response::json(['flash' => 'Your email/password are incorrect!'], 401);
}

/*========================================
=            Log out the user            =
========================================*/


	public function logOut() {

		if(Auth::logout()) return Response::json(['logout' => true], 200);
	}


/*=========================================
=            Register new user            =
=========================================*/

	public function signup() {
		if(User::create(Input::all())) {
			 return Response::json(['action' => true], 200);
		}
		 return Response::json(['action' => false], 501);
	}

/*=====================================================
=            Check if user email is unique            =
=====================================================*/

	public function checkIfEmailExits() {
		$email = User::whereEmail(Input::json('email'))->get();
		if(count($email)) {
			 return Response::json(['email' => false]);
		} else {
			 return Response::json(['email' =>true]);
		}

	}


}