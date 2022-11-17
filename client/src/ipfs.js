// const ipfsClient = require('ipfs-http-client');

// const projectId = '1qmt...XXX';
// const projectSecret = 'c920...XXX';
// const auth =
//     'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// const ipfs = ipfsClient.create({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//         authorization: auth,
//     },
// });

// export default ipfs;



import { create } from 'ipfs-http-client';

// connect to ipfs daemon API server
// const ipfs = create('http://localhost:5001') // (the default in Node.js)

// // or connect with multiaddr
// const ipfs = create('/ip4/127.0.0.1/tcp/5001')

// or using options
const ipfs = create({ host: 'localhost', port: '5002', protocol: 'http' });

// or specifying a specific API path
// const ipfs = create({ host: '1.1.1.1', port: '80', apiPath: '/ipfs/api/v0' })

export default ipfs;