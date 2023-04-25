<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;
use App\Http\Resources\BannerResource;
use App\Models\Banner;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BannerResource::collection(Banner::query()->orderBy(column: 'id', direction: 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBannerRequest $request)
    { {
            $data = Banner::create($request->all());
            if ($request->hasFile('path') && $request->file('path')->isValid()) {
                $request->file('path')->storeAs('public/bannersImage', $request->file('path')->getClientOriginalName());
                $data->path = $request->file('path')->getClientOriginalName();
                $data->save();
            }
            return response(new BannerResource($data), 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        return response(new BannerResource($banner), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBannerRequest $request, Banner $banner)
    {
        $data = $request->validated();
        $banner->update($data);
        return new BannerResource($banner);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        $banner->delete();
        return response("", 204);
    }
}