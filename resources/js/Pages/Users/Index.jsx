import { Head, Link } from "@inertiajs/react";

import { SearchBar, FlashToast } from "../../Components/UI";
import { UserTable, UserFilters } from "../../Components/Users";
import { useUsersParams } from "../../Hooks";

export default function Index({ users, filters }) {
    const { search, setSearch, applyFilters, changePage } =
        useUsersParams(filters);

    return (
        <>
            <Head title="Usuarios" />

            <FlashToast />

            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="mb-1">Usuarios</h1>

                        <p className="text-muted mb-0">
                            Administración de usuarios
                        </p>
                    </div>

                    <Link href="/users/create" className="btn btn-primary">
                        Crear usuario
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <SearchBar
                                    value={search}
                                    onChange={setSearch}
                                    placeholder="Buscar usuarios..."
                                />
                            </div>
                            <div className="col-md-6 d-flex justify-content-end">
                                <UserFilters
                                    filters={filters}
                                    onApply={applyFilters}
                                />
                            </div>
                        </div>
                        <UserTable users={users} onPageChange={changePage} />
                    </div>
                </div>
            </div>
        </>
    );
}
