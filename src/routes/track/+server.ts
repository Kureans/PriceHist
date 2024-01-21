import * as db from '$lib/server';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { queryString } = await request.json();
    const result = await db.insertQuery(queryString, "");

    if (result.message === "Error") {
        return json({status: 500});
    }

    return json({status: 201});
}