<?php

class GuideController extends \BaseController {


	public function __construct() {

            $this->beforeFilter('auth', array('only' => array('store', 'update', 'myGuides')));
	}


	/**
	 * Display a listing of the resource.
	 * GET /guide
	 *
	 * @return Response
	 */
	public function index()
	{
		return Guide::paginate(6);
	}



/*========================================
=            Create new guide            =
========================================*/

	public function store()
	{
		if(Guide::create(Input::all())) {
			 return Response::json(['save' => true]);
		}
	}

	/**
	 * Display the specified resource.
	 * GET /guide/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return Guide::find($id);
	}

	/**
	 * Show the form for editing the specified resource.
	 * GET /guide/{id}/edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /guide/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /guide/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$guide = Guide::find($id);
		if($guide->delete()) {
			 return Response::json(['delete' => true]);
		}

	}

    public function myGuides() {
        if(Input::get('id') == Auth::user()->id) {
            return Response::json(Guide::where('user_id', '=', Input::get('id') )->get());
        }else {
            return Response::json(['not' => true]);
        }
    }

    public function search() {
        $val = Input::get('search');
        return Guide::where('body', 'LIKE', '%'.$val.'%')->paginate(6);
    }

    public function searchcategory() {
        $val = Input::get('id');
        return Guide::where('category_id', '=', $val)->paginate(6);
    }

}