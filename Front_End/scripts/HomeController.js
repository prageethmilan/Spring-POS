$(".naviItem-1").click(function () {
    $("#carouselExampleIndicators").css('display', 'block');
    $("#customerPage").css('display', 'none');
    $("#itemPage").css('display', 'none');
    $("#placeOrderPage").css('display', 'none');
});

$(".naviItem-2").click(function () {
    $("#carouselExampleIndicators").css('display', 'none');
    $("#customerPage").css('display', 'block');
    $("#itemPage").css('display', 'none');
    $("#placeOrderPage").css('display', 'none');
});

$(".naviItem-3").click(function () {
    $("#carouselExampleIndicators").css('display', 'none');
    $("#customerPage").css('display', 'none');
    $("#itemPage").css('display', 'block');
    $("#placeOrderPage").css('display', 'none');
});

$("#placeOrderForm").click(function () {
    $("#carouselExampleIndicators").css('display', 'none');
    $("#customerPage").css('display', 'none');
    $("#itemPage").css('display', 'none');
    $("#placeOrderPage").css('display', 'block');
    setCustomerIdsToComboBox();
    setItemCodesToComboBox();
});

function setCustomerIdsToComboBox() {
    $("#cmbSelectCustomerId").empty();
    $("#cmbSelectCustomerId").append(new Option("-Select Customer-",""));

    $.ajax({
        url:"http://localhost:8080/springPOS/api/v1/customer",
        method:"GET",
        success:function (res) {
            var i = 0;
            for (const customer of res.data) {
                $("#cmbSelectCustomerId").append(new Option(customer.id,i));
                i++;
            }
        }
    })
}

function setItemCodesToComboBox() {
    $("#cmbitemcode").empty();
    $("#cmbitemcode").append(new Option("-Select Item-",""));

    $.ajax({
        url:"http://localhost:8080/springPOS/api/v1/item",
        method:"GET",
        success:function (res) {
            var i = 0;
            for (const item of res.data) {
                $("#cmbitemcode").append(new Option(item.code,i));
                i++;
            }
        }
    })
}
