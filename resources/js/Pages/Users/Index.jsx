import { Head, Link } from "@inertiajs/react";
import { Button } from "react-bootstrap";

import SearchBar from "../../Components/UI/SearchBar";
import UserTable from "../../Components/Users/UserTable";
import UserFilters from "../../Components/Users/UserFilters";

export default function Index({ users, filters }) {
    return (
        <>
            <Head title="Usuarios" />

            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="mb-1">Usuarios</h1>

                        <p className="text-muted mb-0">
                            Administración de usuarios
                        </p>
                    </div>

                    <Link href="/users/create">
                        <Button variant="primary">Crear usuario</Button>
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <SearchBar placeholder="Buscar usuarios..." />
                            </div>

                            <div className="col-md-6 d-flex justify-content-end">
                                <UserFilters filters={filters} />
                            </div>
                        </div>

                        <UserTable users={users} />
                    </div>
                </div>
            </div>
        </>
    );
}
