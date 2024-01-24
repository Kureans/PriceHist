<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

    export let data;
    let ctx: CanvasRenderingContext2D | null;
    let chartCanvas: HTMLCanvasElement;

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

    let chart;

    let options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    footer: function(context: { raw: any; }[]) {
                        const priceStats = context[0].raw;
                        return `Lowest Price: ${priceStats.lowest_price}\nHighest Price: ${priceStats.highest_price}\nStandard Deviation: ${priceStats.std_dev_price}`;
                    }
                }
            }
        },
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
								label: 'Amazon Median Price (SGD)',
								data: pricesAmazon,
                                parsing: {
                                    xAxisKey: 'query_dt',
                                    yAxisKey: 'median_price'
                                },
						}, {
                            label: 'Lazada Median Price (SGD)',
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
<div class="flex flex-col items-center">
{#if data.prices && data.prices.length > 0}
    <h1 class="font-serif text-white font-semibold text-2xl py-4">Graph for "{data.prices[0].queries?.query_string}":</h1>
{:else}
    <h1 class="font-serif text-white font-semibold text-2xl py-4">Sorry, no data points have been collected for this search term yet!</h1>
{/if}

{#if data.message}
    <p class="font-serif text-white font-semibold text-2xl py-4">{data.message}</p>
{:else}
    <div class="w-3/5 bg-white border-4 border-red-400 shadow-xl rounded-md"><canvas bind:this={chartCanvas} id="price-history"></canvas></div>
{/if}
</div>