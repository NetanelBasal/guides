<?php

class GuideController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /guide
	 *
	 * @return Response
	 */
	public function index()
	{
		return Guide::paginate(1);
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

}