
document.addEventListener("DOMContentLoaded", function() {

    let receiptItems = document.getElementById("receiptItems");

    let grandTotal = document.getElementById("grandTotal");

    let invoiceNumber = document.getElementById("invoiceNumber");

    let receiptDate = document.getElementById("receiptDate");


    // Get Sales Data

    let sales = JSON.parse(
        localStorage.getItem("sms_sales")
    ) || [];

    let currentSaleId = localStorage.getItem(
        "sms_current_sale_id"
    );

    let sale = sales.find(function(item) {

        return String(item.id) === String(currentSaleId);

    });


    // Check Receipt

    if (!sale) {

        receiptItems.innerHTML = `
            <tr>
                <td colspan="4">No Receipt Found!</td>
            </tr>
        `;

        grandTotal.textContent = "0";

        return;

    }


    // Invoice Information

    invoiceNumber.textContent = "INV-" + sale.id;

    receiptDate.textContent = sale.date;


    // Display Products

    receiptItems.innerHTML = "";

    sale.items.forEach(function(item) {

        let price = Number(item.price) || 0;

        let quantity = Number(item.quantity) || 1;

        let itemTotal = price * quantity;

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>৳${price.toFixed(2)}</td>
            <td>${quantity}</td>
            <td>৳${itemTotal.toFixed(2)}</td>
        `;

        receiptItems.appendChild(row);

    });


    // Grand Total

    grandTotal.textContent = Number(sale.total).toFixed(2);

});
