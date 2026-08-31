import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import useDebounce from "../useDebounce";

export default function useUsers(filters) {
    const [search, setSearch] = useState(filters.search ?? "");

    const debouncedSearch = useDebounce(search, 400);

    useEffect(() => {
        if (debouncedSearch === filters.search) {
            return;
        }

        navigate({ search: debouncedSearch });
    }, [debouncedSearch]);

    const applyFilters = ({ role, state }) => {
        navigate({
            role,
            state,
        });
    };

    const changePage = (page) => {
        navigate({ page });
    };

    const navigate = (params = {}) => {
        const filtersOptions = getFilterOptions({ ...filters, ...params });

        router.get(
            "/users",
            {
                search: filtersOptions.search,
                role: filtersOptions.role,
                state: filtersOptions.state,
                page: params.page ?? 1,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const getFilterOptions = (params) => {
        const filterOptions = {};

        if (params.role) {
            filterOptions.role = params.role;
        }
        if (params.state) {
            filterOptions.state = params.state;
        }
        if (params.search) {
            filterOptions.search = params.search;
        }

        return filterOptions;
    };

    return {
        search,
        setSearch,
        applyFilters,
        changePage,
    };
}
