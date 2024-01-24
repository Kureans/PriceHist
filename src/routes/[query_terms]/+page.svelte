<script lang="ts">
    import { page } from '$app/stores';
    export let data;

    $: queryString = $page.url.searchParams.get("query");
    $: isTracking = false;
    $: queryCount = data.queries?.length ?? 0;
    $: resultString = (queryCount == 1) ? "Result" : "Results";

    console.log(data.message);

    async function beginTrackingQuery(queryString: string | null) {
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

<h1 class="font-serif font-semibold text-white text-2xl mx-8 pt-4"> {queryCount} {resultString} for "{queryString}":</h1>

{#if data.message}
    <div class="mx-8 mt-4 flex items-center">
    {#if data.message !== "Error!"}
        {#if !isTracking}
            <p class="font-serif text-white pr-4">{data.message}</p>
            <button class="font-serif rounded-3xl p-2 w-36 bg-red-400 text-white hover:bg-white hover:text-red-400 cursor-pointer shadow-md" on:click={() => beginTrackingQuery(queryString)}>Start Tracking</button>
        {:else}
            <div class="font-serif text-red-400 font-semibold text-2xl">Successfully started Tracking!</div>
        {/if}
    {/if}
    </div>
{:else}
    {#if data.queries}
        <div class="w-1/3 mx-8 mt-4">
        {#each data.queries as { created_at, exclude_string, id, query_string }}
            <a href="/graph/{id}">
                <div class="font-serif bg-white shadow-md mt-4 px-8 py-4 rounded-3xl">
                    <p class="font-bold text-xl pb-2">Search Term: "{query_string}"</p>
                    <p>Started Tracking On: {created_at.substring(0, 10)}</p>
                    <p>Exclude Terms: {exclude_string === null ? exclude_string : 'NIL'}</p>
                </div>
            </a>
        {/each}
        </div>
    {/if}
{/if}

<!-- Modal -->
<!-- {#if isTrackingModalOpen}
<div class="fixed insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="modal">
    <form class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" method="POST" action="/track">
        <label class="font-serif font-normal text-xl py-8" for="query">
            New Search Term:
        </label>
        <div class="w-full flex justify-center">
            <input class="rounded-s-full h-10 w-2/3 pl-2 shadow-md" type="text" id="query" name="query" />
            <input class="rounded-e-full w-24 bg-red-400 text-white hover:bg-white hover:text-red-400 cursor-pointer shadow-md" type="submit" value="Submit"/>
        </div>
    </form>
</div>
{/if} -->