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

<div class="logo-input-container">
    <a href="/"><h1 class="main-title text-vermillion text-bold margin-left-s">PriceHist</h1></a>
    <form class="form-styling flex-row margin-left-m" method="GET" action="/search">
        <input class="search-input" type="text" id="query" name="query" value={queryString}/>
        <input class="submit-button" type="submit" value="Search"/>
    </form>
</div>


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

<style>
    .logo-input-container {
        display: flex;
        width: 800px;
    }

    .link-container {
        display: inline-block;
        width: max-content;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .main-title {
        font-size: 40px;
    }

    .search-result {
        width: 600px;
        padding: 10px;
        border-radius: 0.5rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .submit-button {
        width: 60px;
    }

    .form-styling {
        margin-top: 20px;
        margin-left: 20px;
    }

    .search-input {
        height: 26px;
        width: 500px;
    }

    .margin-left-s {
        margin-left: 20px;
    }

    .margin-left-m {
        margin-left: 40px;
    }

    input {
        padding: 5px;
        height: 50%;
        margin-top: 10px;
    }

    a {
        text-decoration: none;
    }
</style>