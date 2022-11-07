import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export default function Test(){
    const { state: { contracts, accounts } } = useEth();
    const [val,setVal] = useState("");
    async function submit(e){
        console.log(e.target[0].value);
        await contracts['Test'].methods.setValue(e.target[0].value).send({from:accounts[0]});
        e.preventDefault();
    }
    return(<div>
        <form onSubmit={submit}>
            change Value : <input></input>
            <button type="submit">Submit</button>
        </form>
        current Value : <p>{val}</p><br></br>
        <button onClick={
            async ()=>{
                const value = await contracts['Test'].methods.testVal().call({from:accounts[0]})
                setVal(value)
            }
        }>See value</button>
    </div>)
}