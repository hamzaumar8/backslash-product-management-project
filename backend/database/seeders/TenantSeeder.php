<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Stancl\Tenancy\Facades\Tenancy;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenants = [
            ['name' => 'Store A', 'domain' => 'store-a.local'],
            ['name' => 'Store B', 'domain' => 'store-b.local'],
        ];

        foreach ($tenants as $tenantData) {
            $tenant = Tenant::create(['name' => $tenantData['name']]);
            $tenant->domains()->create(['domain' => $tenantData['domain']]);

            // Run seeder in tenant database
            Tenancy::initialize($tenant);
            // Seed products for this tenant
            $this->call(ProductSeeder::class);
            Tenancy::end();
        }
    }
}
