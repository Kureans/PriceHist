<script lang="ts">
    import { page } from '$app/stores';
    export let data;

    $: queryString = $page.url.searchParams.get("query");
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

<h1 class="text-vermillion margin-left-s">Results for {queryString}:</h1>

{#if data.message}
    <p class="text-white margin-left-s">{data.message}</p>
    {#if data.message !== "Error!"}
        {#if !isTracking}
            <button class="sunshine text-white margin-left-s" on:click={() => beginTrackingQuery(queryString)}>Start Tracking</button>
        {:else}
            <div class="text-white margin-left-s">Successfully started Tracking!</div>
        {/if}
    {/if}
{:else}
    {#if data.queries}
        <div>
        {#each data.queries as { created_at, exclude_string, id, query_string }}
            <a class="link-container" href="/graph/{id}">
                <div class="search-result white margin-left-s">
                    <p>Started Tracking On: {created_at.substring(0, 10)}</p>
                    <p>Query String: {query_string}</p>
                    <p>Exclude String: {exclude_string}</p>
                </div>
            </a>
        {/each}
        </div>
    {/if}
{/if}