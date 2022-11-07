// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Test {
    string public testVal;

    function setValue(string memory newVal) public{
        testVal = newVal;
    }
}