$(".customerHomeNavi").click(function () {
    $("#carouselExampleIndicators").css('display', 'block');
    $("#customerPage").css('display', 'none');
});

/*Customer Form Text Field Validations*/

let regCusId = /^(C00-)[0-9]{4}$/;
let regCustName = /^[A-z .]{3,}$/;
let regCustAddress = /^[A-z ,.0-9]{3,}$/;
let regCustSalary = /^[1-9][0-9]{3,}(.[0-9]{2})?$/;

let searchCustId;

$(function () {
    loadAllCustomers();
});


// Add Customer Form Validations
$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('blur', function () {
    addCustomerFormValidation();
});

$("#txtCustomerId").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

$("#txtCustomerName").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

$("#txtCustomerAddress").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

$("#txtCustomerSalary").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

function addCustomerFormValidation() {
    var custId = $("#txtCustomerId").val();
    $("#txtCustomerId").css('border', '2px solid green');
    $("#customerIdError").text("");
    if (regCusId.test(custId)) {
        var custName = $("#txtCustomerName").val();
        if (regCustName.test(custName)) {
            $("#txtCustomerName").css('border', '2px solid green');
            $("#customerNameError").text("");
            var custAddress = $("#txtCustomerAddress").val();
            if (regCustAddress.test(custAddress)) {
                var custSalary = $("#txtCustomerSalary").val();
                var response = regCustSalary.test(custSalary);
                $("#txtCustomerAddress").css('border', '2px solid green');
                $("#customerAddressError").text("");
                if (response) {
                    $("#txtCustomerSalary").css('border', '2px solid green');
                    $("#customerSalaryError").text("");
                    return true;
                } else {
                    $("#txtCustomerSalary").css('border', '2px solid red');
                    $("#customerSalaryError").text("Customer Salary is a required field.Pattern : 1000.00 or 1000");
                    return false;
                }
            } else {
                $("#txtCustomerAddress").css('border', '2px solid red');
                $("#customerAddressError").text("Customer address is a required field.");
                return false;
            }
        } else {
            $("#txtCustomerName").css('border', '2px solid red');
            $("#customerNameError").text("Customer name is a required field.");
            return false;
        }
    } else {
        $("#txtCustomerId").css('border', '2px solid red');
        $("#customerIdError").text("Cust ID is a required field.Pattern : C00-0001");
        return false;
    }
}

function setAddCustomerButtonDisableOrNot() {
    let check = addCustomerFormValidation();
    if (check) {
        $("#btnRegisterCustomer").attr('disabled', false);
    } else {
        $("#btnRegisterCustomer").attr('disabled', true);
    }
}

function checkIfAddCustomerFormValid() {
    var custID = $("#txtCustomerId").val();
    if (regCusId.test(custID)) {
        $("#txtCustomerName").focus();
        var custName = $("#txtCustomerName").val();
        if (regCustName.test(custName)) {
            $("#txtCustomerAddress").focus();
            var custAddress = $("#txtCustomerAddress").val();
            if (regCustAddress.test(custAddress)) {
                $("#txtCustomerSalary").focus();
                var custSalary = $("#txtCustomerSalary").val();
                var response = regCustSalary.test(custSalary);
                if (response) {
                    let res = confirm("Do you want to add this Customer..?");
                    if (res) {
                        addCustomer();
                    }
                } else {
                    $("#txtCustomerSalary").focus();
                }
            } else {
                $("#txtCustomerAddress").focus();
            }
        } else {
            $("#txtCustomerName").focus();
        }
    } else {
        $("#txtCustomerId").focus();
    }
}

// Update Customer Form Validations

$('#txtSearchCustomerId,#txtCName,#txtCaddress,#txtCsalary').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtSearchCustomerId").keyup(function (event) {
    searchCustId = $("#txtSearchCustomerId").val();
    if (regCusId.test(searchCustId)) {
        $("#txtSearchCustomerId").css('border', '2px solid green');
        $("#searchCustIdError").text("");
        if (event.key == "Enter") {

            searchUpdateCustomer(searchCustId);

        }
    } else {
        $("#txtSearchCustomerId").css('border', '2px solid red');
        $("#searchCustIdError").text("Cust ID is a required field.Pattern : C00-0001");
        $("#btnUpdateCust").prop('disabled', true);
    }
});

$("#txtCName").keyup(function (event) {
    var custName = $("#txtCName").val();
    if (regCustName.test(custName)) {
        $("#txtCName").css('border', '2px solid green');
        $("#cNameError").text("");
        if (event.key == "Enter") {
            $("#txtCaddress").focus();
        }
        var custId = $("#txtSearchCustomerId").val();
        var custSalary = $("#txtCsalary").val();
        var custAddress = $("#txtCaddress").val();

        if (regCusId.test(custId) && regCustName.test(custName) && regCustAddress.test(custAddress) && regCustSalary.test(custSalary)) {
            $("#btnUpdateCust").prop('disabled', false);
        }

    } else {
        $("#btnUpdateCust").prop('disabled', true);
        $("#txtCName").css('border', '2px solid red');
        $("#cNameError").text("Cust name is a required field.");
    }
});

$("#txtCaddress").keyup(function (event) {
    var custAddress = $("#txtCaddress").val();
    if (regCustAddress.test(custAddress)) {
        $("#txtCaddress").css('border', '2px solid green');
        $("#cAddressError").text("");
        if (event.key == "Enter") {
            $("#txtCsalary").focus();
        }
        var custId = $("#txtSearchCustomerId").val();
        var custName = $("#txtCName").val();
        var custSalary = $("#txtCsalary").val();

        if (regCusId.test(custId) && regCustName.test(custName) && regCustAddress.test(custAddress) && regCustSalary.test(custSalary)) {
            $("#btnUpdateCust").prop('disabled', false);
        }

    } else {
        $("#btnUpdateCust").prop('disabled', true);
        $("#txtCaddress").css('border', '2px solid red');
        $("#cAddressError").text("Customer address is a required field.");
    }
});

$("#txtCsalary").keyup(function (event) {
    var custSalary = $("#txtCsalary").val();
    if (regCustSalary.test(custSalary)) {
        $("#txtCsalary").css('border', '2px solid green');
        $("#cSalaryError").text("");
        var custId = $("#txtSearchCustomerId").val();
        var custName = $("#txtCName").val();
        var custAddress = $("#txtCaddress").val();

        if (regCusId.test(custId) && regCustName.test(custName) && regCustAddress.test(custAddress) && regCustSalary.test(custSalary)) {
            $("#btnUpdateCust").prop('disabled', false);
        }

        if (event.key == "Enter") {
            let res = confirm("Do you want to update this customer?");
            if (res) {
                updateCustomer();
            }
        }

    } else {
        $("#btnUpdateCust").prop('disabled', true);
        $("#txtCsalary").css('border', '2px solid red');
        $("#cSalaryError").text("Customer Salary is a required field.Pattern : 1000.00 or 1000");
    }
});

// Delete Customer Form Validations

$("#txtSearchCId").keyup(function (event) {
    searchCustId = $("#txtSearchCId").val();
    if (regCusId.test(searchCustId)) {
        $("#txtSearchCId").css('border', '2px solid green');
        $("#searchCustomerIdError").text("");
        if (event.key == "Enter") {
            searchDeleteCustomer(searchCustId);
        }
    } else {
        $("#txtSearchCId").css('border', '2px solid red');
        $("#searchCustomerIdError").text("Cust ID is a required field.Pattern : C00-0001");
        $("#btnDeleteCustomer").prop('disabled', true);
    }
});

/*End Of Customer Form Text Field Validations*/

/*CRUD Operations Of Customer Form*/

// Add Customer

var baseUrl = "http://localhost:8080/springPOS/api/v1/customer"

function addCustomer() {
    var data = $("#registerCustomerForm").serialize();
    console.log(data);
    $.ajax({
        url: baseUrl,
        method: "POST",
        data: data,
        success: function (res) {
            if (res.code == 200) {
                loadAllCustomers();
                clearCustomerFields();
                generateCustomerId();
                swal({
                    title: "Confirmation",
                    text: "Customer Saved Successfully",
                    icon: "success",
                    button: "Close",
                    timer: 2000
                });
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

// Search Update Customer

function searchUpdateCustomer(searchId) {
    $.ajax({
        url: baseUrl + "/" + searchId,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                var customer = res.data;
                $("#txtCName").val(customer.name);
                $("#txtCaddress").val(customer.address);
                $("#txtCsalary").val(customer.salary);
                $("#btnUpdateCust").prop('disabled', false);
                $("#txtCName").css('border', '2px solid green');
                $("#txtCaddress").css('border', '2px solid green');
                $("#txtCsalary").css('border', '2px solid green');
                $("#txtCName").focus();
            }
        },
        error: function (ob) {
            $("#txtCName").val("");
            $("#txtCaddress").val("");
            $("#txtCsalary").val("");
            $("#btnUpdateCust").prop('disabled', true);
            $("#txtCName").css('border', '1px solid #ced4da');
            $("#txtCaddress").css('border', '1px solid #ced4da');
            $("#txtCsalary").css('border', '1px solid #ced4da');
            swal({
                title: "Error!",
                text: "Customer Not Found.",
                icon: "warning",
                button: "Close",
                timer: 2000
            });
        }
    });
}

// Search Delete Customer

function searchDeleteCustomer(searchId) {
    $.ajax({
        url: baseUrl + "/" + searchId,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                var customer = res.data;
                $("#txtdcName").val(customer.name);
                $("#txtdcAddress").val(customer.address);
                $("#txtdcSalary").val(customer.salary);
                $("#btnDeleteCustomer").prop('disabled', false);
                $("#btnDeleteCustomer").focus();
            }
        },
        error: function (ob) {
            $("#txtdcName").val("");
            $("#txtdcAddress").val("");
            $("#txtdcSalary").val("");
            $("#btnDeleteCustomer").prop('disabled', true);
            swal({
                title: "Error!",
                text: "Customer Not Found.",
                icon: "warning",
                button: "Close",
                timer: 2000
            });
        }
    });
}

// Update Customer

function updateCustomer() {
    var cusOb = {
        id: $("#txtSearchCustomerId").val(),
        name: $("#txtCName").val(),
        address: $("#txtCaddress").val(),
        salary: $("#txtCsalary").val()
    }

    $.ajax({
        url: baseUrl,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.code == 200) {
                loadAllCustomers();
                clearUpdateCustomerFields();
                $("#btnUpdateCust").prop('disabled', true);
            }
        },
        error: function (ob, errorStus) {
            alert(ob.responseJSON.message);
        }
    });
}

// Delete Customer

function deleteCustomer() {
    let cusId = $("#txtSearchCId").val();
    $.ajax({
        url: baseUrl + "?id=" + cusId,
        method: "DELETE",
        success: function (res) {
            if (res.code == 200) {
                clearDeleteCustomerFields();
                loadAllCustomers();
                $("#btnDeleteCustomer").prop('disabled', true);
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    })
}

// Load all customers

function loadAllCustomers() {
    $("#customerTable").empty();
    $.ajax({
        url: baseUrl,
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                console.log(customer.id + " " + customer.name);
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
                $("#customerTable").append(row);
            }
        }
    });
}

/*End Of CRUD Operations*/

/*Other Functions*/

// Generate Customer Id

function generateCustomerId() {
    $.ajax({
        url: baseUrl + "/generateCustId",
        method: "GET",
        success: function (res) {
            $("#txtCustomerId").val(res.data);
        }
    });
}

// Search Customer By Table

function searchCustomerByTable(searchId) {
    $.ajax({
        url: baseUrl + "/" + searchId,
        method: "GET",
        success: function (res) {
            if (res.code == 200) {
                var customer = res.data;
                $("#customerTable").empty();
                let tableRow = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
                $("#customerTable").append(tableRow);
            }
        },
        error: function (ob) {
            loadAllCustomers();
            swal({
                title: "Error!",
                text: "Customer Not Found.",
                icon: "warning",
                button: "Close",
                timer: 2000
            });
        }
    });
}

/*Controller Functions*/
// Add Customer Form

$("#registerCustomer").on('shown.bs.modal', function () {
    $(this).find("#txtCustomerId").focus();
    generateCustomerId();
});

$("#btnRegisterCustomer").prop('disabled', true);

$("#btnRegisterCustomer").click(function () {
    let res = confirm("Do you want to add this customer?");
    if (res) {
        addCustomer();
    }
});

$("#btnclearcustomerform").click(function () {
    clearCustomerFields();
    generateCustomerId();
});

function clearCustomerFields() {
    $("#txtCustomerId").focus();

    $("#txtCustomerId").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerSalary").val("");

    $("#customerIdError").text("");
    $("#customerNameError").text("");
    $("#customerAddressError").text("");
    $("#customerSalaryError").text("");

    $("#txtCustomerId").css('border', '1px solid #ced4da');
    $("#txtCustomerName").css('border', '1px solid #ced4da');
    $("#txtCustomerAddress").css('border', '1px solid #ced4da');
    $("#txtCustomerSalary").css('border', '1px solid #ced4da');

    $("#btnRegisterCustomer").prop('disabled', true);
}


// Update Customer Form

$("#btnUpdateCust").prop('disabled', true);

$("#updateCustomer").on('shown.bs.modal', function () {
    $(this).find("#txtSearchCustomerId").focus();
});

$("#btnUpdateCust").click(function () {
    let res = confirm("Do you want to update this customer?");
    if (res) {
        updateCustomer();
    }
});

$("#btnClearUpdateCustomer").click(function () {
    $("#btnUpdateCust").prop('disabled', true);
    clearUpdateCustomerFields();
});

function clearUpdateCustomerFields() {
    $("#txtSearchCustomerId").focus();

    $("#txtSearchCustomerId").val("");
    $("#txtCName").val("");
    $("#txtCaddress").val("");
    $("#txtCsalary").val("");

    $("#searchCustIdError").text("");
    $("#cNameError").text("");
    $("#cAddressError").text("");
    $("#cSalaryError").text("");

    $("#txtSearchCustomerId").css('border', '1px solid #ced4da');
    $("#txtCName").css('border', '1px solid #ced4da');
    $("#txtCaddress").css('border', '1px solid #ced4da');
    $("#txtCsalary").css('border', '1px solid #ced4da');
}

// Delete Customer Form

$("#btnDeleteCustomer").prop('disabled', true);

$("#deleteCustomer").on('shown.bs.modal', function () {
    $(this).find("#txtSearchCId").focus();
});

$("#btnDeleteCustomer").click(function () {
    let res = confirm("Do you want to delete this customer?");
    if (res) {
        deleteCustomer();
    }
});

$("#btnClearDeleteCustomerFields").click(function () {
    $("#btnDeleteCustomer").prop('disabled', true);
    clearDeleteCustomerFields();
});

function clearDeleteCustomerFields() {
    $("#txtSearchCId").focus();

    $("#txtSearchCId").val("");
    $("#txtdcName").val("");
    $("#txtdcAddress").val("");
    $("#txtdcSalary").val("");

    $("#searchCustomerIdError").text("");
}

//Other

$("#searchCustomerForm").submit(function (e) {
    e.preventDefault();
});

$("#txtSCustId").on('keyup', function (event) {
    var custId = $("#txtSCustId").val();
    if (regCusId.test(custId)) {
        $("#txtSCustId").css('border', '2px solid green');
        if (event.key == "Enter") {
            searchCustomerByTable(custId);
        }
    } else {
        $("#txtSCustId").css('border', '2px solid red');
    }
});

$("#btnSearchCustId").click(function () {
    var custId = $("#txtSCustId").val();
    searchCustomerByTable(custId);
});

$("#btnClearSearchField").click(function () {
    $("#txtSCustId").val("");
    $("#txtSCustId").css('border', '1px solid #ced4da');
    loadAllCustomers();
});
