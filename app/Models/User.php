<?php

namespace App\Models;
use App\Enums\UserState;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'last_name',
        'email',
        'rut',
        'phone',
        'role_id',
        'state',
    ];

    protected $casts = [
        'state' => UserState::class,
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
