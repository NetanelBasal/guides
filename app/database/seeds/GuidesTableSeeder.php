<?php


use Faker\Factory as Faker;

class GuidesTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 30) as $index)
		{
			Guide::create([
                'title' => $faker->word,
                'body' => $faker->text(200),
                'user_id' => $faker->numberBetween(1,20),
                'category_id' => $faker->numberBetween(1,10),
                'created_at' => time(),
                'updated_at' => time()
			]);
		}
	}

}