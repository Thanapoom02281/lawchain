import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifacts => {
      if (artifacts && artifacts.length !== 0) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545"); // "ws://localhost:8545"
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        let addresses = {};
        let contracts = {};
        for(const artifact of artifacts){
          const { abi } = artifact;
          try {
            const name = artifact.contractName;
            const address = artifact.networks[networkID].address;
            addresses[name] = addresses;
            const contract = new web3.eth.Contract(abi, address);
            contracts[name] = contract;
          } catch (err) {
            console.error(err);
        }
        }
        
        dispatch({
          type: actions.init,
          data: { artifacts, web3, accounts, networkID, contracts }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const simpleStorage = require("../../contracts/SimpleStorage.json");
        const test = require("../../contracts/Test.json");
        const lawIndexing = require("../../contracts/LawIndexing.json");
        const law = require("../../contracts/Law.json")
        init([simpleStorage,test,lawIndexing,law]);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifacts);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifacts]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
