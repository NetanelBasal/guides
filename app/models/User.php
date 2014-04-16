<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {



	protected $guarded = array('id', 'active', 'admin');

	/**
	 * check User Credentials
	 * @param  [type] $email    [description]
	 * @param  [type] $password [description]
	 * @return [type] bool      [description]
	 */
	public static function checkIfUserValid($email,$password) {
	    if(Auth::attempt(['email' => $email, 'password' => $password])) {
	    	return true;
	    }
	    return false;
	}

	/**
	 * set User Token in database for checking if user logged in
	 */
	public static function setUserToken() {
			$user = Auth::user();
	    	$user->session_token = Hash::make(Str::random(24));
	    	if($user->save()) return true;
	    	return false;
	}

	/**
	 * when insert password on signup make the password hashed
	 */

	public function setPasswordAttribute($value) {

   			$this->attributes['password'] = Hash::make($value);
	}

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password');

	/**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}

	/**
	 * Get the e-mail address where password reminders are sent.
	 *
	 * @return string
	 */
	public function getReminderEmail()
	{
		return $this->email;
	}

}