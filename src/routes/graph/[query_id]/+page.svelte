<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

    export let data;
    let ctx: CanvasRenderingContext2D | null;
    let chartCanvas: HTMLCanvasElement;

    let medianPricesAmazon = data.prices
        ?.filter((priceStats) => priceStats.ecommerce_name === 'amazon')
        ?.map((priceStats) => priceStats.median_price);

    let medianPricesLazada = data.prices
        ?.filter((priceStats) => priceStats.ecommerce_name === 'lazada')
        ?.map((priceStats) => priceStats.median_price);

    let pricesAmazon = data.prices
    ?.filter((priceStats) => priceStats.ecommerce_name === 'amazon')
    ?.map((priceStats) => {
        priceStats.query_dt = priceStats.query_dt.substring(0, 10);
        return priceStats;
    })

    let pricesLazada = data.prices
        ?.filter((priceStats) => priceStats.ecommerce_name === 'lazada')
        ?.map((priceStats) => {
        priceStats.query_dt = priceStats.query_dt.substring(0, 10);
        return priceStats;
    })

	let datetimeLabels = data.prices
    ?.filter((priceStats) => priceStats.ecommerce_name === 'amazon')
    ?.map((priceStats) => priceStats.query_dt.substring(0, 10));

    let chart: Chart<"line", { ecommerce_name: string | null; highest_price: number | null; id: number; lowest_price: number | null; mean_price: number | null; median_price: number | null; query_dt: string; query_id: number; queries: { query_string: string | null; } | null; }[] | undefined, string>;

    let options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    footer: function(context: { raw: any; }[]) {
                        const priceStats = context[0].raw;
                        return `Lowest Price: ${priceStats.lowest_price}, \nHighest Price: ${priceStats.highest_price}`;
                    }
                }
            }
        }
    }

    onMount(() => {
        ctx = chartCanvas.getContext('2d');
        if (ctx === null) {
            console.log("Error")!
            return "Error"!;
        }
        chart = new Chart(ctx, {
				type: 'line',
                options: options,
				data: {
						labels: datetimeLabels,
						datasets: [{
								label: 'Amazon Median Price',
								data: pricesAmazon,
                                parsing: {
                                    xAxisKey: 'query_dt',
                                    yAxisKey: 'median_price'
                                },
						}, {
                            label: 'Lazada Median Price',
                            data: pricesLazada,
                            parsing: {
                                xAxisKey: 'query_dt',
                                yAxisKey: 'median_price'
                            },
                        }]
				},

		});
    });
</script>

{#if data.prices && data.prices.length > 0}
    <h1 class="text-vermillion">Graph for {data.prices[0].queries?.query_string}:</h1>
{:else}
    <h1>Sorry, no data points have been collected for this search term yet!</h1>
{/if}

{#if data.message}
    <p>{data.message}</p>
{:else}
    <div style="width: 800px; background-color: white;"><canvas bind:this={chartCanvas} id="price-history"></canvas></div>
    <!-- <button on:click={() => addData()}>Change Chart</button> -->
{/if}

<style>

</style>