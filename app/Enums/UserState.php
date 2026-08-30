<?php

namespace App\Enums;

enum UserState: string
{
    case ACTIVE = 'Active';
    case INACTIVE = 'Inactive';
}
