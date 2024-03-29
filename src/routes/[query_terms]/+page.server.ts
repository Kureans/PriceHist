import * as db from '$lib/server';

export function load({url}) {
    const queryString = url.searchParams.get("query");
    if (queryString === null) {
            console.log("Invalid Null Query");
            return;
    }
    console.log(`Query String: ${queryString}`);
    return db.findProduct(queryString);
}

