$(".placeOrderHomeNavi").click(function () {
    $("#carouselExampleIndicators").css('display', 'block');
    $("#customerPage").css('display', 'none');
});

var cartTMDB = [];

$('#txtOrderDate').val(new Date().toISOString().slice(0, 10));
$("#btnAddToCart").prop('disabled', true);
$("#btnPlaceOrder").prop('disabled', true);
let regBuyItemQty = /^[0-9]{1,}$/;

$(function () {
    generateOId();
    loadOrderTable();
    loadOrderDetailTable();
})

var orderUrl = "http://localhost:8080/springPOS/api/v1/order";

// Generate Order Id
function generateOId() {
    $.ajax({
        url: orderUrl + "/generateOrderId",
        method: "GET",
        success: function (res) {
            $("#txtOrderId").val(res.data);
        }
    })
}

// Add Listener method to customer id combo box for search customer details
$("#cmbSelectCustomerId").change(function () {
    var custId = $("#cmbSelectCustomerId").find('option:selected').text();
    $.ajax({
        url: orderUrl + "/customer/" + custId,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                $("#txtpocName").val(res.data.name);
                $("#txtpocaddress").val(res.data.address);
                $("#txtpocsalary").val(res.data.salary);
                var code = $("#cmbitemcode").find('option:selected').text();
                if (code != "-Select Item-" && $("#txtbuyQty").val() != '') {
                    $("#btnAddToCart").prop('disabled', false);
                }
            }
        },
        error: function (ob) {
            $("#txtpocName").val("");
            $("#txtpocaddress").val("");
            $("#txtpocsalary").val("");
            $("#btnAddToCart").prop('disabled', true);
        }
    })
});

// Add Listener method to item code combo box for search item details
$("#cmbitemcode").change(function () {
    var itemCode = $("#cmbitemcode").find('option:selected').text();
    $.ajax({
        url: orderUrl + "/item/" + itemCode,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                $("#txtpoiName").val(res.data.description);
                $("#txtitemPrice").val(res.data.unitPrice);
                let qtyOnHand = parseInt(res.data.qtyOnHand);

                var changedTempQty = false;
                for (var j = 0; j < cartTMDB.length; j++) {
                    if (cartTMDB[j].getICode() == itemCode) {
                        let cartQty = cartTMDB[j].getBuyQty();
                        let tempQty = qtyOnHand - cartQty;
                        $("#txtqtyOnHand").val(tempQty);
                        changedTempQty = true;
                    }
                }

                if (changedTempQty == false) {
                    $("#txtqtyOnHand").val(res.data.qtyOnHand);
                }

                var id = $("#cmbSelectCustomerId").find('option:selected').text();
                if (id != "-Select Customer-" && $("#txtbuyQty").val() != '') {
                    $("#btnAddToCart").prop('disabled', false);
                }
            }
        },
        error: function (ob) {
            $("#txtpoiName").val("");
            $("#txtitemPrice").val("");
            $("#txtqtyOnHand").val("");
            $("#btnAddToCart").prop('disabled', true);
        }
    })
});

// Add Validation for buy qty text field
$("#txtbuyQty").on('keyup', function () {
    addValidation();
});

// Add Validation to buy qty field and check if comboboxes are empty or not.
function addValidation() {
    var buyQty = $("#txtbuyQty").val();
    if (regBuyItemQty.test(buyQty)) {
        $("#txtbuyQty").css('border', '2px solid green');
        var code = $("#cmbitemcode").find('option:selected').text();
        var id = $("#cmbSelectCustomerId").find('option:selected').text();
        if (id != "-Select Customer-" && code != "-Select Item-") {
            $("#btnAddToCart").prop('disabled', false);
        }
    } else {
        $("#txtbuyQty").css('border', '2px solid red');
        $("#btnAddToCart").prop('disabled', true);
    }
}

// Add items to cart
$("#btnAddToCart").click(function () {
    var qtyOnHand = parseInt($("#txtqtyOnHand").val());
    var buyQty = parseInt($("#txtbuyQty").val());
    if (buyQty <= qtyOnHand) {
        addItemsToCart();
        loadCartItemsToTable();
        clearSelectItemFields();
        calculateTotalAndNoOfItems();
        $("#cartTable>tr").on('dblclick', function () {
            var itemCode = $(this).children(":eq(0)").text();
            for (var i = 0; i < cartTMDB.length; i++) {
                if (cartTMDB[i].getICode() == itemCode) {
                    cartTMDB.splice(i, 1);
                }
            }
            loadCartItemsToTable();
            calculateTotalAndNoOfItems();
            clearSelectItemFields();
        });

    } else {
        swal({
            title: "Error!",
            text: "Buy qty is incorrect.Please enter low quantity.",
            icon: "warning",
            button: "Close",
            timer: 2000
        });
    }
});

function addItemsToCart() {
    var itemCode = $("#cmbitemcode").find('option:selected').text();
    var itemName = $("#txtpoiName").val();
    var itemPrice = $("#txtitemPrice").val();
    var qtyOnHand = parseInt($("#txtqtyOnHand").val());
    var qty = $("#txtbuyQty").val();
    var buyQty = parseInt(qty);
    var unitPrice = parseFloat(itemPrice);
    var total = buyQty * unitPrice;

    var cart = new CartTM(itemCode, itemName, itemPrice, buyQty, total);

    var found = false;

    for (var i = 0; i < cartTMDB.length; i++) {
        if (cartTMDB[i].getICode() == itemCode) {
            var tempQty = parseInt(cartTMDB[i].getBuyQty()) + buyQty;
            cartTMDB[i].setBuyQty(tempQty);
            let itemTotal = tempQty * unitPrice;
            cartTMDB[i].setItemTotal(itemTotal);
            found = true;
        }
    }

    if (found == false) {
        cartTMDB.push(cart);
    }
}

// load cart items to table
function loadCartItemsToTable() {
    $("#cartTable").empty();
    for (var i = 0; i < cartTMDB.length; i++) {
        let tableRow = `<tr><td>${cartTMDB[i].getICode()}</td><td>${cartTMDB[i].getIName()}</td><td>${cartTMDB[i].getItemPrice()}</td><td>${cartTMDB[i].getBuyQty()}</td><td>${cartTMDB[i].getItemTotal()}</td></tr>`;
        $("#cartTable").append(tableRow);
    }
}

// clear Selected Item Fields
function clearSelectItemFields() {
    $("#cmbitemcode").val("");
    $("#txtpoiName").val("");
    $("#txtitemPrice").val("");
    $("#txtqtyOnHand").val("");
    $("#txtbuyQty").val("");
    $("#txtbuyQty").css('border', '1px solid #ced4da');
    $("#btnAddToCart").prop('disabled', true);
}

// Calculate Total and No Of Items
function calculateTotalAndNoOfItems() {
    let ttl = 0;
    for (var i = 0; i < cartTMDB.length; i++) {
        ttl = ttl + cartTMDB[i].getItemTotal();
    }
    $("#txtTotal").val(ttl + "/=");
    $("#txtBalance").val(ttl + "/=");
    $("#txtNoOfItems").val(cartTMDB.length);
}

// Calculate Balance when Cash paid
$("#txtCash").keyup(function (event) {
    if (event.key == "Enter") {
        let ttl = 0;
        for (var i = 0; i < cartTMDB.length; i++) {
            ttl = ttl + cartTMDB[i].getItemTotal();
        }
        let cash = parseInt($("#txtCash").val());
        let balance = ttl - cash;
        $("#txtBalance").val(balance + "/=");

        var code = $("#cmbitemcode").find('option:selected').text();
        var id = $("#cmbSelectCustomerId").find('option:selected').text();
        if (id != "-Select Customer-" && cartTMDB.length != 0) {
            $("#btnPlaceOrder").prop('disabled', false);
        }
    }
});

// Clear Selected item details fields
$("#btnClearItemFields").click(function () {
    clearSelectItemFields();
});

// Cancel Order
$("#btnCancelOrder").click(function () {
    clearPlaceOrderForm();
    loadCartItemsToTable();
});

// Clear Place order form
function clearPlaceOrderForm() {
    $("#cmbSelectCustomerId").val("");
    $("#txtpocName").val("");
    $("#txtpocaddress").val("");
    $("#txtpocsalary").val("");

    $("#cmbitemcode").val("");
    $("#txtpoiName").val("");
    $("#txtitemPrice").val("");
    $("#txtqtyOnHand").val("");
    $("#txtbuyQty").val("");
    $("#txtbuyQty").css('border', '1px solid #ced4da');

    $("#txtTotal").val("");
    $("#txtNoOfItems").val("");
    $("#txtCash").val("");
    $("#txtBalance").val("");

    cartTMDB.splice(0, cartTMDB.length);

    $("#btnAddToCart").prop('disabled', true);

    $("#btnPlaceOrder").prop('disabled', true);
}

// Place Order
$("#btnPlaceOrder").click(function () {
    var orderDetails = [];
    for (let i = 0; i < cartTMDB.length; i++) {
        var od = {
            orderId: $("#txtOrderId").val(),
            itemCode: cartTMDB[i].getICode(),
            itemName: cartTMDB[i].getIName(),
            unitPrice: cartTMDB[i].getItemPrice(),
            qty: cartTMDB[i].getBuyQty(),
            total: cartTMDB[i].getItemTotal()
        }
        orderDetails.push(od);
    }

    var customer = {
        id: $("#cmbSelectCustomerId").find('option:selected').text(),
        name: $("#txtpocName").val(),
        address: $("#txtpocaddress").val(),
        salary: $("#txtpocsalary").val()
    }

    var order = {
        orderId: $("#txtOrderId").val(),
        orderDate: $("#txtOrderDate").val(),
        customer: customer,
        cost: $("#txtTotal").val().split("/")[0],
        orderDetails: orderDetails
    }
    $.ajax({
        url: orderUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(order),
        success: function (res) {
            if (res.data == true) {
                clearPlaceOrderForm();
                loadCartItemsToTable();
                loadOrderTable();
                loadOrderDetailTable();
                generateOId();

                swal({
                    title: "Success!",
                    text: "Place Order Successfully",
                    icon: "success",
                    button: "Ok",
                    timer: 2000
                });
            }
        },
        error: function (res) {
            alert(res.message);
        }
    })

});

// Load Order Table
function loadOrderTable() {

    $("#orderTable").empty();
    $.ajax({
        url: orderUrl,
        method: "GET",
        success: function (res) {
            for (let order of res.data) {
                let tableRow = `<tr><td>${order.orderId}</td><td>${order.orderDate}</td><td>${order.customer.id}</td><td>${order.cost}</td></tr>`;
                $("#orderTable").append(tableRow);
            }
        }
    })
}

// Load Order Details Table
function loadOrderDetailTable() {
    $("#orderDetailsTable").empty();
    $.ajax({
        url: orderUrl + "/loadOrderDetails",
        method: "GET",
        success: function (res) {
            console.log(res.data);
            for (let orderDetails of res.data) {
                let tableRow = `<tr><td>${orderDetails.orderId}</td><td>${orderDetails.itemCode}</td><td>${orderDetails.itemName}</td><td>${orderDetails.unitPrice}</td><td>${orderDetails.qty}</td><td>${orderDetails.total}</td></tr>`;
                $("#orderDetailsTable").append(tableRow);
            }
        }
    })
}

// Search Order details from Order Table and Order Detail Table
function searchOrderByOrderTable(orderId) {

    $.ajax({
        url: orderUrl + "/orderTable/" + orderId,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                $("#orderTable").empty();
                let tableRow = `<tr><td>${res.data.orderId}</td><td>${res.data.orderDate}</td><td>${res.data.customer.id}</td><td>${res.data.cost}</td></tr>`;
                $("#orderTable").append(tableRow);
            }
        },
        error:function (ob) {
            loadOrderTable();
            loadOrderDetailTable();
            swal({
                title: "Error!",
                text: "Order Not Found",
                icon: "warning",
                button: "Close",
                timer: 2000
            });
        }
    });
}

function searchOrderByOrderDetailTable(orderId) {
    $("#orderDetailsTable").empty();
    $.ajax({
        url: orderUrl + "/orderDetailTable/" + orderId,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                for (let orderDetail of res.data) {
                    console.log(orderDetail);
                    let tableRow = `<tr><td>${orderDetail.orderId}</td><td>${orderDetail.itemCode}</td><td>${orderDetail.itemName}</td><td>${orderDetail.unitPrice}</td><td>${orderDetail.qty}</td><td>${orderDetail.total}</td></tr>`;
                    $("#orderDetailsTable").append(tableRow);
                }
            }
        }
    });
}

// Search Order
let regOrderId = /^(O-)[0-9]{4}$/;

$("#searchOrder").on('shown.bs.modal', function () {
    $(this).find("#txtSearchOrderId").focus();
});

// btn search order function
$("#btnSearchOrder").click(function () {
    let searchOid = $("#txtSearchOrderId").val();
    searchOrderByOrderDetailTable(searchOid);
    searchOrderByOrderTable(searchOid);
});

// btn clear search field function
$("#btnClearSearchOrderField").click(function () {
    $("#txtSearchOrderId").val("");
    $("#txtSearchOrderId").css('border', '1px solid #ced4da');
    $("#txtSearchOrderId").focus();
    loadOrderTable();
    loadOrderDetailTable();
});

// add validation to search order text field
$("#txtSearchOrderId").keyup(function (event) {
    let searchOid = $("#txtSearchOrderId").val();
    if (regOrderId.test(searchOid)) {
        $("#txtSearchOrderId").css('border', '2px solid green');
        if (event.key == "Enter") {
            searchOrderByOrderDetailTable(searchOid);
            searchOrderByOrderTable(searchOid);
        }
    } else {
        $("#txtSearchOrderId").css('border', '2px solid red');
    }
});
