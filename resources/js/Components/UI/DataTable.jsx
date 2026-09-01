import DataTableLibrary from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTableLibrary.use(DT);

const defaultOptions = {
    paging: false,
    searching: false,
    info: false,
    ordering: false,
};

export default function DataTable({
    data = [],
    columns = [],
    options = {},
    slots = {},
}) {
    return (
        <DataTableLibrary
            data={data}
            columns={columns}
            slots={slots}
            className="table table-striped table-hover"
            options={{
                ...defaultOptions,
                ...options,
            }}
        />
    );
}
