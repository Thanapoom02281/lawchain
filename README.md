# LawChain
A law application of blockchain which laws and judgements are store into LawChain by legislator and the court who finalize judgements.

## Run LawChain
To run the LawChain, cd into the client folder and run docker-compose up
```
$ cd client
$ docker-compose up
```
The client should run on http://localhost:3000

The smart contracts are already deployed into the goerli. Therefore, just running the client is ready to go!

## Elements in this repository

### The client folder
client folder is the client of LawChain, developed by React.js. It contain the following:
  1. source code of the client side application
  2. src/contexts/EthContext folder which contain the logic to connect to MetaMask and logic of calling smartContract function
  3. src/contracts folder which contains contracts in form of json, used by EthContext to the location of contracts during calling contract process.
  4. ipfs.js in src folder which contain logic to connect to IPFS network

### The truffle folder
truffle folder is for writing/compile smart contract and deploy those contracts on the blockchain network. It can connect to a local private blockchain network when connects to Ganache. The folder contains the following:
  1. contracts folder which contain all the smart contracts in solidity language.
  2. migrations folder contains migrate files about how to deploy smart contracts.
  3. truffle-config.js in the truffle folder configs the connection to the network where the contracts would be deployed.
