function CartTM(itemCode, itemName, itemPrice, buyQty, total) {
    var __itemCode = itemCode;
    var __itemName = itemName;
    var __itemPrice = itemPrice;
    var __buyQty = buyQty;
    var __total = total;

    this.getICode = function () {
        return __itemCode;
    }

    this.setICode = function (itemCode) {
        __itemCode = itemCode;
    }

    this.getIName = function () {
        return __itemName;
    }

    this.setIName = function (itemName) {
        __itemName = itemName;
    }

    this.getItemPrice = function () {
        return __itemPrice;
    }

    this.setItemPrice = function (itemPrice) {
        __itemPrice = itemPrice;
    }

    this.getBuyQty = function () {
        return __buyQty;
    }

    this.setBuyQty = function (buyQty) {
        __buyQty = buyQty;
    }

    this.getItemTotal = function () {
        return __total;
    }

    this.setItemTotal = function (total) {
        __total = total;
    }
}