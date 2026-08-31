import DataTable from "../UI/DataTable";

export default function UserTable({ users }) {
    const columns = [
        {
            title: "Nombre completo",
            data: null,
            render: (_, type, row) => `${row.name} ${row.last_name}`,
        },
        {
            title: "Email",
            data: "email",
        },
        {
            title: "RUT/RUN",
            data: "rut",
        },
        {
            title: "Rol",
            data: "role.name",
        },
        {
            title: "Estado",
            data: "state.label",
        },
        {
            title: "Fecha creación",
            data: "created_at",
        },
        {
            title: "Acciones",
            data: null,
            orderable: false,
            searchable: false,
            render: () => `
                <button class="btn btn-sm btn-outline-primary me-2">
                    Ver detalle
                </button>

                <button class="btn btn-sm btn-outline-danger">
                    Eliminar
                </button>
            `,
        },
    ];

    return <DataTable data={users.data} columns={columns} />;
}
