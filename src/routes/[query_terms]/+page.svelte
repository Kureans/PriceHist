<script lang="ts">
    import { page } from '$app/stores';
    export let data;

    const queryString = $page.url.searchParams.get("query");
    $: isTracking = false;

    async function beginTrackingQuery(queryString: string|null) {
        if (queryString === null) {
            console.log("Error! Cannot track null string");
            return;
        }
        const response = await fetch('/track', {
            method: 'POST',
            body: JSON.stringify({ queryString }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            console.log("Successfully started tracking query.")
        }

        isTracking = true;
    }

</script>

<h1>Results for {queryString}</h1>

{#if data.message}
    <p>{data.message}</p>
    {#if data.message !== "Error!"}
        {#if !isTracking}
            <button on:click={() => beginTrackingQuery(queryString)}>Start Tracking</button>
        {:else}
            <div>Successfully started Tracking!</div>
        {/if}
    {/if}
{:else}
    {#if data.queries}
        <ul>
        {#each data.queries as { created_at, exclude_string, id, query_string }}
            <a href="/graph/{id}"><li>Created At: {created_at}, Query String: {query_string}, Exclude String: {exclude_string}</li></a>
        {/each}
        </ul>
    {/if}
{/if}