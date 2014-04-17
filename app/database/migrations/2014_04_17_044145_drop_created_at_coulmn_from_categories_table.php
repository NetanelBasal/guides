<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class DropCreatedAtCoulmnFromCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	  public function up()
    {
        Schema::table('categories', function(Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
    }



	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
 public function down()
    {
        Schema::table('tasks', function(Blueprint $table) {
            $table->timestamps();
        });
    }

}
