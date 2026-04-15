/**
 * Dolfin Sidebar Components
 * Handles dynamic sidebar rendering for Retail and Distributor portals.
 */

class SidebarSystem {
    constructor(role, activePageId) {
        this.role = role;
        this.activePageId = activePageId;
        this.containerId = "sidebar-container";
    }

    getRetailItems() {
        return [
            { id: "dashboard", label: "Dashboard", url: "retail_dashboard.html" },
            // { id: "catalog", label: "Catalog", url: "retail_catalog.html" },
            // { id: "orders", label: "Transaksi", url: "retail_orders.html" },
            // { id: "payment", label: "Payment", url: "retail_payment_management.html" },
            { id: "po_list", label: "PO Internal", url: "retail_POList.html" },
            { id: "grpo_list", label: "GRPO", url: "retail_GRPOList.html" },
            { id: "return-management", label: "Return Management", url: "retail_ReturnList.html" },
            { type: "divider" },
            { id: "profile", label: "Profile", url: "retail_profile.html" }
        ];
    }

    getDistributorItems() {
        return [
            { id: "dashboard", label: "Dashboard", url: "distributor_dashboard.html" },
            // { id: "orders", label: "Orders (Retail)", url: "distributor_orders.html" },
            { id: "forecast", label: "Forecast", url: "distributor_forecastlist.html" },
            { id: "salesorder", label: "Sales Order", url: "distributor_salesorderlist.html" },
            { id: "allocation", label: "Allocation", url: "distributor_Allocation.html" },
            { id: "deliveryorder", label: "Delivery Order", url: "distributor_DO.html" },
            { id: "billing", label: "Billing", url: "distributor_Billinglist.html" },
            { id: "credit-memo", label: "Credit Memo", url: "distributor_CreditMemoList.html" },
            { id: "return-management", label: "Return Management", url: "distributor_ReturnList.html" },
            // { id: "batch", label: "Batch Invoices", url: "distributor_batch_management.html" },
            // { id: "inventory", label: "Inventory", url: "distributor_inventory.html" },
            // { id: "promotions", label: "Promotions", url: "distributor_promotions.html" },
            { type: "divider" },
            { type: "header", label: "Reports" },
            { id: "report-summary", label: "Rekap Summary", url: "distributor_report_summary.html", indent: true },
            { id: "report-detail", label: "Detail Pengiriman", url: "distributor_report_detail.html", indent: true },
            { id: "report-harga", label: "Rekap per Harga", url: "distributor_report_harga.html", indent: true },
            { type: "divider" },
            { id: "profile", label: "Profile", url: "distributor_profile.html" }
        ];
    }

    getAdminItems() {
        return [
            { id: "dashboard", label: "Dashboard", url: "admin_dashboard.html" },
            { id: "users", label: "User Management", url: "admin_users.html" },
            { id: "PriceList", label: "Price List", url: "admin_PLList.html" },
            // { id: "PriceListAdd", label: "Add Price List", url: "admin_PLadd.html" },
            { type: "divider" },
            { id: "settings", label: "Settings", url: "admin_settings.html" }
        ];
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Sidebar container #${this.containerId} not found`);
            return;
        }

        container.classList.add("d-none", "d-lg-block");

        let items;
        if (this.role === "retail") {
            items = this.getRetailItems();
        } else if (this.role === "distributor") {
            items = this.getDistributorItems();
        } else if (this.role === "admin") {
            items = this.getAdminItems();
        } else {
            items = [];
        }

        let listHtml = "";
        items.forEach((item) => {
            if (item.type === "divider") {
                listHtml += `<div class="dropdown-divider my-2"></div>`;
            } else if (item.type === "header") {
                listHtml += `<div class="px-1 pt-1 pb-1" style="font-size:10px; font-weight:700; color:#9ca3af; text-transform:uppercase; letter-spacing:.6px;">${item.label}</div>`;
            } else {
                const activeClass = this.activePageId === item.id ? "active bg-success text-white" : "text-dark";
                const disabledClass = item.disabled ? "disabled" : "";
                const href = item.disabled ? "#" : item.url;
                const indentStyle = item.indent ? "padding-left: 1.5rem; font-size: 12px;" : "";

                listHtml += `
                    <a class="list-group-item list-group-item-action border-0 rounded mb-1 ${activeClass} ${disabledClass}" 
                       href="${href}" style="${this.activePageId !== item.id ? "background-color: transparent;" : ""} ${indentStyle}">
                        ${item.label}
                    </a>
                `;
            }
        });

        const desktopHtml = `
            <div class="card shadow-sm border-0" style="min-height: calc(100vh - 100px);">
                <div class="card-body p-3">
                    <div class="list-group list-group-flush">
                        ${listHtml}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = desktopHtml;

        const navbar = document.querySelector(".navbar .container-fluid");
        if (navbar && !document.getElementById("mobileSidebarToggle")) {
            const toggleBtn = document.createElement("button");
            toggleBtn.className = "navbar-toggler d-block d-lg-none me-2 border-0";
            toggleBtn.id = "mobileSidebarToggle";
            toggleBtn.type = "button";
            toggleBtn.setAttribute("data-bs-toggle", "offcanvas");
            toggleBtn.setAttribute("data-bs-target", "#offcanvasSidebar");
            toggleBtn.innerHTML = '<span class="navbar-toggler-icon"></span>';
            const brand = navbar.querySelector(".navbar-brand");
            brand.parentNode.insertBefore(toggleBtn, brand);
        }

        if (!document.getElementById("offcanvasSidebar")) {
            const offcanvasDiv = document.createElement("div");
            offcanvasDiv.className = "offcanvas offcanvas-start";
            offcanvasDiv.tabIndex = -1;
            offcanvasDiv.id = "offcanvasSidebar";
            offcanvasDiv.innerHTML = `
                <div class="offcanvas-header border-bottom">
                    <h5 class="offcanvas-title fw-bold text-success">Dolfin Menu</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body p-3">
                    <div class="list-group list-group-flush">
                        ${listHtml}
                    </div>
                </div>
            `;
            document.body.appendChild(offcanvasDiv);
        }
    }
}
