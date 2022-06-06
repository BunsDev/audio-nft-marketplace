// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private operator;

    struct Token {
        uint256 tokenId;
        string tokenURI;
    }

    constructor(address marketPlace) ERC721("MyToken", "MTK") {
        operator = marketPlace;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    //////////////////////////////////////////////////

    function mintToken(string memory _tokenURI) external returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        _setApprovalForAll(msg.sender, operator, true);

        return tokenId;
    }

    function getAllTokens() external view returns (Token[] memory) {
        uint256 tokensCount = totalSupply();

        Token[] memory tokens = new Token[](tokensCount);
        for (uint256 i = 0; i < tokensCount; i++) {
            uint256 tokenId = tokenByIndex(i);
            string memory _tokenURI = tokenURI(tokenId);
            tokens[i] = Token({tokenId: tokenId, tokenURI: _tokenURI});
        }

        return tokens;
    }

    function getOwnerTokens(address owner)
        external
        view
        returns (Token[] memory)
    {
        uint256 ownerTokensCount = balanceOf(owner);
        Token[] memory tokens = new Token[](ownerTokensCount);

        for (uint256 i = 0; i < ownerTokensCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            string memory _tokenURI = tokenURI(tokenId);
            tokens[i] = Token({tokenId: tokenId, tokenURI: _tokenURI});
        }

        return tokens;
    }
}
