import * as db from '$lib/index.ts';

export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        const queryString = data.get("query");
        if (queryString === null) {
                console.log("Invalid Null Query");
                return;
        }
        if (queryString instanceof File) {
            console.log("Expected String Type rather than File Type");
            return;
        }
        console.log(`Query String: ${queryString}`);
        const queryTerms = queryString.split(" ");
        db.findProduct(queryTerms);
    }
}