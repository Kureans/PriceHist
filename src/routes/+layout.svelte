<script>
    import '../app.css';
    import { page } from '$app/stores';
    $: currPathName = $page.url.pathname;
    $: queryString = $page.url.searchParams.get("query");
</script>

{#if currPathName !== '/'}
    <div class="logo-input-container">
        <a href="/"><h1 class="main-title text-vermillion text-bold margin-left-s">PriceHist</h1></a>
        <form class="form-styling flex-row margin-left-m" method="GET" action="/search">
            <input class="search-input" type="text" id="query" name="query" value={queryString}/>
            <input class="submit-button" type="submit" value="Search"/>
        </form>
    </div>
{/if}
<slot />
