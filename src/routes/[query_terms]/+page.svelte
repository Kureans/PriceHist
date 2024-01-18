<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
    import { page } from '$app/stores';

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

<h1>Results for {$page.url.searchParams.get("query")}</h1>

{#if data.message}
    <p>{data.message}</p>
{:else}
    <div style="width: 800px;"><canvas bind:this={chartCanvas} id="price-history"></canvas></div>
{/if}