const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select")

async function convertValues() {

    try {

        const data = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL")
        const currencies = await data.json()

        const inputCurrencyValue = document.querySelector(".input-currency").value
        const currencyValueToconvert = document.querySelector(".currency-value-to-convert")
        const currencyValueConverted = document.querySelector(".currency-value")

        console.log(currencySelect.value)

        const dolarToday = Number(currencies.USDBRL.bid)
        const euroToday = Number(currencies.EURBRL.bid)
        const libraToday = Number(currencies.GBPBRL.bid)
        const bitcoinToday = Number(currencies.BTCBRL.bid)

        if (currencySelect.value == "dolar") {
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(inputCurrencyValue / dolarToday)
        }

        if (currencySelect.value == "euro") {
            currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR"
            }).format(inputCurrencyValue / euroToday)
        }

        if (currencySelect.value == "libra") {
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP"
            }).format(inputCurrencyValue / libraToday)
        }


        if (currencySelect.value == "bitcoin") {
            currencyValueConverted.innerHTML =
                "₿ " + new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 8,
                    maximumFractionDigits: 8
                }).format(inputCurrencyValue / bitcoinToday)
        }



        currencyValueToconvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue)

    } catch (error) {

        alert("Não foi possível obter a cotação.")

        console.error(error)

    }

}


function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImg = document.querySelector(".currency-img")

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImg.src = "./assents/dolar.png"
    }

    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImg.src = "./assents/Euro.png"
    }


    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "Libra Esterlina"
        currencyImg.src = "./assents/libra.png"
    }

    if (currencySelect.value == "bitcoin") {
        currencyName.innerHTML = "Bitcoin"
        currencyImg.src = "./assents/bitcoin.png"
    }

    convertValues()

}

currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)