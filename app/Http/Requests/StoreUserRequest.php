<?php

namespace App\Http\Requests;

use App\Enums\UserState;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            /*
            |--------------------------------------------------------------------------
            | User
            |--------------------------------------------------------------------------
            */

            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'last_name' => [
                'required',
                'string',
                'max:100',
            ],

            'email' => [
                'required',
                'email',
                'unique:users,email',
            ],

            'rut' => [
                'required',
                'string',
                'unique:users,rut',
            ],

            'phone' => [
                'nullable',
                'string',
                'unique:users,phone',
            ],

            'role_id' => [
                'required',
                'exists:roles,id',
            ],

            'state' => [
                'required',
                new Enum(UserState::class),
            ],

            /*
            |--------------------------------------------------------------------------
            | Address
            |--------------------------------------------------------------------------
            */

            'address' => [
                'required',
                'array',
            ],

            'address.street' => [
                'required',
                'string',
            ],

            'address.city' => [
                'required',
                'string',
            ],

            'address.zip_code' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | Notes
            |--------------------------------------------------------------------------
            */

            'notes' => [
                'required',
                'array',
                'min:1',
            ],

            'notes.*.note' => [
                'required',
                'string',
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'address.street' => 'street',
            'address.city' => 'city',
            'address.zip_code' => 'zip code',
            'notes.*.note' => 'note',
        ];
    }
}
