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
		//
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
		//
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
		//
	}

}