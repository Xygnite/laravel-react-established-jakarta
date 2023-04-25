<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\BannerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//unprotected
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/contacts/export', [ContactController::class, 'export']);


//protected 
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // Route::get('/contacts/export', [ContactController::class, 'export']);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/contacts', ContactController::class);
    Route::apiResource('/banners', BannerController::class);
    // Route::get('/contacts/export/', [ContactController::class, 'export']);
    // Route::get('/contacts', [ContactController::class, 'index']);
    // Route::get('/contacts/{id}', [ContactController::class, 'show']);
    // Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);
});