<?php

namespace App\Enums;

enum UserState: int
{
    case INACTIVE = 0;
    case ACTIVE = 1;

    public function label(): string
    {
        return match ($this) {
            self::INACTIVE => 'Inactivo',
            self::ACTIVE => 'Activo',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn(self $state) => [
                'value' => $state->value,
                'label' => $state->label(),
            ],
            self::cases()
        );
    }
}
