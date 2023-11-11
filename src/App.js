import { useEffect, useState } from 'react';

import './App.css';


const App = (props) => {

    const [valueOnDisplay, setValueOnDisplay] = useState(0);
    const [currency, setCurrency] = useState('USD');

    const getRate = async (currency) => {
        const resp = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&json`);
        const data = await resp.json();
        return data[0].rate;
    }

    useEffect(() => {
        getRate(currency)
            .then(rate => {
                let resultValue = 'N/A';
                if (currency && rate) {
                    resultValue = (props.valueUAH / rate).toFixed(2);
                };
                setValueOnDisplay(resultValue);
            })
    }, [currency, props.valueUAH]);

    return (

        <div className="app">
            <div className="tochange">Меняем: {props.valueUAH} грн</div>
            <div className="counter">{valueOnDisplay}</div>
            <div className="controls">
                <button onClick={() => setCurrency('USD')}>USD</button>
                <button onClick={() => setCurrency('EUR')}>EUR</button>
                <button onClick={() => setCurrency('PLN')}>PLN</button>
                <button onClick={() => setCurrency('NOK')}>NOK</button>
            </div>
        </div>
    )
}

export default App;