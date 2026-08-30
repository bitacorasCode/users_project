<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\UserState;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string('name', 100);
            $table->string('last_name', 100);

            $table->string('email')->unique();
            $table->string('rut')->unique();

            $table->string('phone')->nullable()->unique();

            $table->foreignId('role_id')
                ->constrained('roles')
                ->restrictOnDelete();


            $table->enum(
                'state',
                array_column(UserState::cases(), 'value')
            );

            $table->string('password', 10);
            $table->rememberToken();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
