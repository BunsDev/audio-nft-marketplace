// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarketPlace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    uint256 public listingPrice;

    constructor(uint256 _listingPrice) {
        listingPrice = _listingPrice;
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        uint256 price;
    }

    MarketItem[] public marketItems;

    // itemId => marketItems index
    mapping(uint256 => uint256) private _marketItemIndex;

    // itemId => isValid
    mapping(uint256 => bool) private _itemIdValid;

    // nftContract => tokenId => exists
    mapping(address => mapping(uint256 => bool)) private _marketItemExists;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external payable nonReentrant {
        require(
            _marketItemExists[nftContract][tokenId] == false,
            "item already exists"
        );

        require(
            IERC721(nftContract).ownerOf(tokenId) == msg.sender,
            "only the owner of token can sell it"
        );

        require(price > 0, "Price must be at least 1 wei");

        require(
            msg.value == listingPrice,
            "msg.value must be equal to listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        MarketItem memory newMarketItem = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            price
        );

        marketItems.push(newMarketItem);
        _marketItemIndex[itemId] = marketItems.length - 1;
        _itemIdValid[itemId] = true;
        _marketItemExists[nftContract][tokenId] = true;

        if (listingPrice > 0) {
            (bool sent, ) = owner().call{value: listingPrice}("");
            require(sent, "Failed to send Ether to the owner of contract");
        }

        emit MarketItemCreated(itemId, nftContract, tokenId, msg.sender, price);
    }

    function removeMarketItem(uint256 itemId) external {
        require(_itemIdValid[itemId], "item id is not valid");

        uint256 marketItemIndex = _marketItemIndex[itemId];
        MarketItem memory marketItem = marketItems[marketItemIndex];

        require(
            marketItem.seller == msg.sender,
            "only the owner of item can remove it"
        );

        _deleteMarketItem(itemId);
    }

    function buyMarketItem(uint256 itemId) external payable nonReentrant {
        require(_itemIdValid[itemId], "item id is not valid");

        uint256 marketItemIndex = _marketItemIndex[itemId];

        MarketItem memory marketItem = marketItems[marketItemIndex];

        require(
            msg.value == marketItem.price,
            "msg.value must be equal to marketItem price"
        );

        (bool sentToSeller, ) = marketItem.seller.call{value: msg.value}("");
        require(sentToSeller, "Failed to send Ether to seller");

        IERC721(marketItem.nftContract).transferFrom(
            marketItem.seller,
            msg.sender,
            marketItem.tokenId
        );

        _deleteMarketItem(itemId);
    }

    function _deleteMarketItem(uint256 itemId) internal {
        uint256 marketItemIndex = _marketItemIndex[itemId];
        uint256 marketItemsLength = marketItems.length;

        MarketItem memory marketItem = marketItems[marketItemIndex];
        MarketItem memory lastItem = marketItems[marketItemsLength - 1];

        marketItems[marketItemIndex] = lastItem;
        _marketItemIndex[lastItem.itemId] = marketItemIndex;
        _itemIdValid[itemId] = false;
        _marketItemExists[marketItem.nftContract][marketItem.tokenId] = false;

        marketItems.pop();
    }
}
