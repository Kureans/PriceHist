<h1 class="main-title centered text-vermillion text-bold">PriceHist</h1>

<p class="centered text-white">It's the Wayback Machine of Ecommerce Goods.</p>

<form class="centered flex-col form-container" method="GET" action="/search">
    <label class="text-white" for="query">
        Search for a product and see its price over time:
    </label>
    <div id="input-container" class="centered">
        <input class="input-size" type="text" id="query" name="query" />
        <input type="submit" value="Search"/>
    </div>
</form>

<style>
    .main-title {
        font-size: 100px;
    }

    .centered {
        display: flex;
        justify-content: center;
    }

    .flex-col {
        flex-direction: column;
        align-items: center;
    }

    .form-container {
        height: 75%;
    }

    .text-bold {
        font-weight: bolder;
    }

    .input-size {
        padding: 5px;
        width: 40%;
        height: 100%;
    }

    #input-container {
        width: 600px;
    }

    p {
        font-size: xx-large;
        font-weight: bold;
    }

    label {
        font-size: large;
        padding-bottom: 10px;
    }
</style>