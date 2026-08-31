import UserForm from "../../Components/Users/UserForm";

export default function Create() {
    return (
        <div className="container py-4">
            <div className="mb-4">
                <h1>Crear usuario</h1>
                <p className="text-muted mb-0">
                    Ingresa los datos del nuevo usuario.
                </p>
            </div>

            <UserForm />
        </div>
    );
}
