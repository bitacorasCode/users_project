// Cache simulator
const cache = {
    roles: null,
    states: null,
};

export async function getRoles() {
    if (cache.roles) {
        return cache.roles;
    }

    const response = await fetch('/roles');

    if (!response.ok) {
        throw new Error('No se pudieron obtener los roles');
    }

    const roles = await response.json();

    cache.roles = roles;

    return roles;
}

export async function getUserStates() {
    if (cache.states) {
        return cache.states;
    }

    const response = await fetch('/user-states');

    if (!response.ok) {
        throw new Error('No se pudieron obtener los estados');
    }

    const states = await response.json();

    cache.states = states;

    return states;
}
