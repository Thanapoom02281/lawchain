// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Law{
    uint cid;
    constructor (uint _cid) public{
        cid = _cid;
    }
    function getCid() public view returns(uint){
        return cid;
    }
}
contract LawIndexing{
    struct Draft{
        uint cid;
        address[] signers;
        bool allocated;
    }
    struct LawStruct{
        Law[] laws;
        bool allocated;
    }
    mapping(string=>LawStruct) lawMapping;
    mapping(string=>Draft) draftMapping;
    string private _secret = "SECRETS";
    address[] authorizedUsers = new address[](0);

    function addAuthorizedUser(address user, string memory secret) public payable {
        require(keccak256(abi.encode(secret)) == keccak256(abi.encode(_secret)),"Invalid secret");
        require(auth(user) == false, "This user is already added");
        authorizedUsers.push(user);
    }

    function viewAuthorizedUsers() public view returns (address[] memory) {
        return authorizedUsers;
    }

    function auth(address user) private view returns (bool){
        for (uint i = 0; i < authorizedUsers.length; i++) {
            if (authorizedUsers[i] == user) {
                return true;
            }
        }
        return false;
    }

    function checkDuplicateSign(address signer,string memory article) private view returns(bool) {
        for (uint i = 0; i < draftMapping[article].signers.length; i++) {
            if (draftMapping[article].signers[i] == signer) {
                return true;
            }
        }
        return false;
    }

    function editOrCreateDraft(string memory article,uint cid) public payable{
        require(auth(msg.sender),"Unauthorized");
        draftMapping[article].signers = new address[](0);
        draftMapping[article].cid = cid;
        draftMapping[article].allocated  = true;
    }

    function getDraft(string memory article) public view returns(Draft memory){
        return draftMapping[article];
    }

    function sign(string memory article) public payable{
        require(auth(msg.sender),"Unauthorized");
        require(draftMapping[article].allocated,"The draft is not exists");
        require(checkDuplicateSign(msg.sender,article) == false, "You have already signed this draft");
        draftMapping[article].signers.push(msg.sender);
        if(draftMapping[article].signers.length >= authorizedUsers.length/2){
            Law newLaw = new Law(draftMapping[article].cid);
            if(lawMapping[article].allocated){
                lawMapping[article].laws.push(newLaw);
            }else{
                lawMapping[article].laws = new Law[](0);
                lawMapping[article].laws.push(newLaw);
                lawMapping[article].allocated = true;
            }
            draftMapping[article].allocated = false;
            draftMapping[article].signers = new address[](0);
            draftMapping[article].cid = 0;
        }
    }

    function getLatestLaw(string memory article) public view returns (uint){
        return lawMapping[article].laws[lawMapping[article].laws.length-1].getCid();
    }

    function getEveryLawVersions(string memory article) public view returns (uint[] memory){
        uint[] memory everyLawVersions = new uint[](lawMapping[article].laws.length);
        for(uint i = 0; i< lawMapping[article].laws.length ; i++){
            everyLawVersions[i] = (lawMapping[article].laws[i].getCid());
        }
        return everyLawVersions;
    }
}