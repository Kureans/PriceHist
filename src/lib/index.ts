import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "$env/static/private";

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

export function findProduct(queryTerms: string[]) {
    let dbQueryString = queryTerms.reduce((accumulator, term) => {
        const formattedTerm = `\`${term}\` & `;
        return accumulator.concat(formattedTerm);
    }, "");
    dbQueryString = dbQueryString.slice(0, -2);
    console.log(dbQueryString);
}