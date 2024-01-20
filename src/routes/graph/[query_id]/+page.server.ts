import * as db from '$lib/server';

export function load({ params }) {
    const queryId = parseInt(params.query_id);
    const pricesJson = db.getPrices(queryId);
    return pricesJson;
}

