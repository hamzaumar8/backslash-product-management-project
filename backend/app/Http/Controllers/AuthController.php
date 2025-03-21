<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Stancl\Tenancy\Resolvers\DomainTenantResolver;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $tenant = app(DomainTenantResolver::class)->resolve($request->getHost());

        if (!$tenant) {
            return response()->json(['message' => 'Tenant not found'], 404);
        }

        tenancy()->initialize($tenant);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
            'store_id' => tenant('id'),
        ], 201);
    }

    public function login(Request $request)
    {
        $tenant = app(DomainTenantResolver::class)->resolve($request->getHost());

        if (!$tenant) {
            return response()->json(['message' => 'Tenant not found'], 404);
        }

        tenancy()->initialize($tenant);

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'logged in successfully',
            'user' => $user,
            'token' => $token,
            'store_id' => tenant('id'),
        ]);
    }

    public function logout(Request $request)
    {
        $tenant = app(DomainTenantResolver::class)->resolve($request->getHost());
        if (!$tenant) {
            return response()->json(['message' => 'Tenant not found'], 404);
        }
        tenancy()->initialize($tenant);

        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
