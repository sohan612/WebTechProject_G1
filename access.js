
function checkAdmin() {

    if (sessionStorage.getItem("sms_admin_logged_in") !== "true") {

        alert("Please Login as Admin to access this page!");

        return false;

    }

    return true;

}

function checkCustomer() {

    let admin = sessionStorage.getItem("sms_admin_logged_in");
    let customer = sessionStorage.getItem("sms_customer_logged_in");

    if (admin !== "true" && customer !== "true") {

        window.location.replace("login.html");

    }

}
