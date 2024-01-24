<div class="flex flex-col items-center">
    <h1 class="underline underline-offset-4 decoration-double decoration-2 font-serif font-semibold text-7xl text-red-500 py-16">PriceHist</h1>

    <p class="italic font-serif font-normal text-3xl text-white pt-4 pb-10">It's the Wayback Machine of Ecommerce Goods.</p>

    <form class="w-1/2 flex flex-col items-center" method="GET" action="/search">
        <label class="font-serif font-normal text-xl text-white py-8 px-32" for="query">
            Search for a product and see its price over time:
        </label>
        <div class="w-full flex justify-center">
            <input class="rounded-s-full h-10 w-2/3 border-4 pl-2" type="text" id="query" name="query" />
            <input class="rounded-e-full w-24 bg-red-400 text-white hover:bg-white hover:text-red-400 cursor-pointer" type="submit" value="Search"/>
        </div>
    </form>
</div>