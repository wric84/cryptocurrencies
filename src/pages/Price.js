import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function Price(props){
    const [coin, setCoin] = useState(null)
    
    const params = useParams()
    const {symbol} = params
    const url= `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${process.env.REACT_APP_COINAPI_KEY}`

    const getCoin = async() => {
        try{
        const res = await fetch(url)
        const data = await res.json()
        setCoin(data)
        }
        catch(e){
            console.log('ERROR FETCHING DATA', e);
        }
    }

    useEffect(()=>{
        getCoin()
    }, [])

    const loaded= ()=>{
        return(
            <div>
                <h1>
                    {coin.asset_id_base}/{coin.asset_id_quotes}
                </h1>
                <h2>{coin.rate}</h2>
            </div>
        )
    }

    const loading = () => {
        return <h1>Loading...</h1>;
      };
    
      return coin && coin.rate ? loaded() : loading();
};
export default Price