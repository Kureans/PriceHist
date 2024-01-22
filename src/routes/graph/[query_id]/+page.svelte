<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

    export let data;
    let ctx: CanvasRenderingContext2D | null;
    let chartCanvas: HTMLCanvasElement;

    let medianPrices = data.prices
        ?.filter((priceStats) => priceStats.ecommerce_name === 'amazon')
        ?.map((priceStats) => priceStats.median_price);

	let datetimeLabels = data.prices
    ?.filter((priceStats) => priceStats.ecommerce_name === 'amazon')
    ?.map((priceStats) => priceStats.query_dt.substring(0, 10));

    onMount(() => {
        ctx = chartCanvas.getContext('2d');
        if (ctx === null) {
            console.log("Error")!
            return "Error"!;
        }
        new Chart(ctx, {
				type: 'line',
				data: {
						labels: datetimeLabels,
						datasets: [{
								label: 'Amazon Median Price',
								data: medianPrices
						}]
				}
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
{/if}

<style>

</style>