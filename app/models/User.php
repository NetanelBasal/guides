<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {



	protected $guarded = array('id', 'active', 'admin');

	public function guides() {
		return $this->hasMany('Guide');
	}

/*===================================================
=            Check if user in the system            =
===================================================*/

	public static function checkIfUserValid($email,$password) {
	    if(Auth::attempt(['email' => $email, 'password' => $password])) {
	    	return true;
	    }
	    return false;
	}

/*=====================================================
=           Set user token and save id DB            =
=====================================================*/

	public static function setUserToken() {
		$user = Auth::user();
		$user->session_token = Hash::make(Str::random(24));
		if ($user->save()) return true;
	}


/*===================================================
=            Save password field as Hash            =
===================================================*/

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
	protected $hidden = array('password', 'created_at', 'updated_at');

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

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }

}