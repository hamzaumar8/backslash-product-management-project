<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure the correct tenant database is used
        DB::statement('SET FOREIGN_KEY_CHECKS=0;'); // Disable foreign key checks for safety
        Product::truncate(); // Clear existing products

        Product::insert([
            [
                'name' => 'Product A',
                'description' => 'Description for Product A',
                'price' => 100.00,
                'image' => 'products/product-a.jpg',
            ],
            [
                'name' => 'Product B',
                'description' => 'Description for Product B',
                'price' => 150.00,
                'image' => 'products/product-b.jpg',
            ],
            [
                'name' => 'Product C',
                'description' => 'Description for Product C',
                'price' => 200.00,
                'image' => 'products/product-c.jpg',
            ],
        ]);

        DB::statement('SET FOREIGN_KEY_CHECKS=1;'); // Re-enable foreign key checks
    }
}
