const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());

const mongoUri = "mongodb+srv://avess:avess@cluster0.onw5ve9.mongodb.net/";

const dbName = "market_data";
const collectionName = "real_time_data";
let db, collection;

const cryptos = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
  },
  {
    id: "shiba-inu",
    symbol: "shib",
    name: "Shiba Inu",
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
  },
  {
    id: "litecoin",
    symbol: "ltc",
    name: "Litecoin",
  },
];

MongoClient.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(client => {
    db = client.db(dbName);
    collection = db.collection(collectionName);
    console.log('Connected to MongoDB');
}).catch(error => console.log(error));

const fetchCryptoData = async (cryptoId) => {
  const url = `https://api.coingecko.com/api/v3/coins/${cryptoId}`;
  try{
    const response = await axios.get(url);
    console.log(response.data.market_data.price_change_24h);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log("Rate limit exceeded. Retrying...");
    } else {
      throw error;
    }
  }
};

const fetchDataAndStore = async () => {
    try {
        for (const crypto of cryptos) {
            const cryptoData = await fetchCryptoData(crypto.id);
            console.log(cryptoData);
            if(cryptoData) {
                const formattedData = {
                  current_price: cryptoData?.market_data?.current_price?.usd,
                  high_24h: cryptoData?.market_data?.high_24h?.usd,
                  low_24h: cryptoData?.market_data?.low_24h?.usd,
                  price_change_24h: cryptoData?.market_data?.price_change_24h,
                  crypto_name: crypto.name,
                  crypto_id: crypto.id,
                  crypto_symbol: crypto.symbol,
                  timestamp: new Date(),
                };
                await collection.insertOne(formattedData);
                console.log('Data fetched and stored successfully');
            }
        }

    } catch (error) {
        console.error('Error fetching or storing data:', error);
    }
};

setInterval(fetchDataAndStore, 10000); // Fetch data every 10 seconds


app.get('/', (req, res) => {
    res.send('Stock nd Crypto Tracker is running');
})

app.get('/getData/:id', async (req, res) => {
    console.log(req.params.id);
    // const data = await collection.find({ crypto_id: 'bitcoin' });
    
    let results = await collection
      .find({ crypto_id: req.params.id })
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();
    console.log(results);
    res.send(results).status(200);
})

app.listen(4000, ()=> {
    console.log('Server is running on port 4000');
})