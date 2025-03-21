<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenantA = Tenant::create([
            'name' => 'Store A',
        ]);
        $tenantA->domains()->create(['domain' => 'store-a.local']);

        $tenantB = Tenant::create([
            'name' => 'Store B',
        ]);
        $tenantB->domains()->create(['domain' => 'store-b.local']);
    }
}
