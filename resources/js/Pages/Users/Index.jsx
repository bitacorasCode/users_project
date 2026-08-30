import { Head } from "@inertiajs/react";

export default function Index({ users }) {
    return (
        <>
            <Head title="Usuarios" />

            <h1>Usuarios</h1>

            {users.data.map((user) => (
                <div key={user.id}>
                    {user.name} {user.last_name}
                </div>
            ))}
        </>
    );
}
