<script lang="ts">
    import { page } from '$app/stores';

    export let data;
</script>

<h1>Results for {$page.url.searchParams.get("query")}</h1>

{#if data.message}
    <p>{data.message}</p>
{:else}
    {#if data.queries}
        <ul>
        {#each data.queries as { created_at, exclude_string, id, query_string }}
            <a href="/graph/{id}"><li>Created At: {created_at}, Query String: {query_string}, Exclude String: {exclude_string}</li></a>
        {/each}
        </ul>
    {/if}
{/if}