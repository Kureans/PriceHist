<script>
    import '../app.css';
    import { page } from '$app/stores';
    $: currPathName = $page.url.pathname;
    $: queryString = $page.url.searchParams.get("query");
</script>

{#if currPathName !== '/'}
    <div class="flex">
        <a href="/"><h1 class="underline underline-offset-4 decoration-double decoration-2 font-serif font-semibold text-4xl text-red-500 p-4">PriceHist</h1></a>
        <form class="flex justify-start items-center px-4 pt-1 w-96" method="GET" action="/search">
            <input class="font-serif rounded-s-full h-1/2 w-2/3 pl-2 shadow-md" type="text" id="query" name="query" value={queryString}/>
            <input class="font-serif rounded-e-full h-1/2 w-20 bg-red-400 text-white hover:bg-white hover:text-red-400 cursor-pointer shadow-md" type="submit" value="Search"/>
        </form>
    </div>
    <hr />
{/if}

<slot />