import { ReactNode } from "react";
import { SvgIconProps } from "@mui/material";
// CUSTOM ICON COMPONENT
import duotone from "@/icons/duotone";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { UrlHelper } from "@/routes/constants";

// type ChildItem = { name: string; path: string };

// type ChildItemWithChildren = {
//   name: string;
//   path: string;
//   children?: ChildItemWithChildren[];
// };

interface NavItem {
  type: string;
  name: string;
  path: string;
  label: string;
  access: string;
  iconText: string;
  disabled: boolean;
  badge?: ReactNode;
  children: Partial<NavItem>[];
  icon: (props: SvgIconProps<"svg", {}>) => JSX.Element;
}

export type Navigations = Partial<NavItem>;

const adminNavigations: Navigations[] = [ // admin
  {
    name: "Dashboard",
    path: "/admin",
    icon: duotone.Dashboard,
    access: Roles.admin,
  },
  {
    name: "User Management",
    path: "/admin/" + UrlHelper.users,
    icon: duotone.UserList,
    access: Roles.admin,
  },
  {
    name: "Marketing",
    path: "/admin/"  + UrlHelper.leads ,
    icon: duotone.LayerGroup,
    access: Roles.admin,
  },
  {
    name: "Analytics",
    path: "/admin/"  + UrlHelper.analytics,
    icon: duotone.BadgeDollar,
    access: Roles.admin,
  },
  {
    name: "Billing",
    path: "/admin/"  + UrlHelper.billing,
    icon: duotone.MessagesDollar,
    access: Roles.admin,
  },
  {
    name: "Support",
    path: "/admin/"  + UrlHelper.support,
    icon: duotone.Accounts,
    access: Roles.admin,
  },
  {
    name: "Settings",
    path: "/admin/"  + UrlHelper.settings,
    icon: duotone.Settings,
    access: Roles.admin,
  },
]

const agentNavigations1: Navigations[] = [ // agent
  {
    name: "Home",
    path: "/agent",
    access: Roles.agent,
    // isStandalone: true,
  },
  {
    name: "Search",
    access: Roles.agent,
    children: [
      { name: "Hotels", path: "/agent/hotels" },
      { name: "Flights", path: "/agent/flights/best-price" },
    ],
  },
  {
    name: "Orders",
    access: Roles.agent,
    children: [
      { name: "My Orders", path: "/agent/orders" },
      { name: "Manage Orders", path: "/agent/orders/manage" },
      { name: "Create Invoice", path: "/agent/orders/create-invoice" },
      { name: "Order History", path: "/agent/leads/history" },
      { name: "Invoices/Vouchers", path: "/agent/orders/invoices-vouchers" },
    ],
  },
  {
    name: "Lead Center",
    access: Roles.agent,
    children: [
      { name: "My Leads", path: "/agent/leads/my-leads" },
      { name: "Buy Leads", path: "/agent/leads/buy" },
      { name: "Leads Marketplace", path: "/agent/leads/leadsmall" },
      { name: "Order History", path: "/agent/leads/history" },
    ],
  },
  {
    name: "Dashboard",
    access: Roles.agent,
    children: [
      { name: "My Sales", path: "/agent/dashboard/my-sales" },
      { name: "Agency Sales", path: "/agent/dashboard/agency-sales" },
    ],
  },
  {
    name: "Reports",
    access: Roles.agent,
    children: [
      { name: "Future Withdrawals", path: "/agent/reports/future-withdrawals" },
      { name: "Withdrawal History", path: "/agent/reports/withdrawal-history" },
    ],
  },
  {
    name: "Apps",
    access: Roles.agent,
    children: [
      { name: "Chats", path: "/agent/app/chats" },
      { name: "Email", path: "/agent/app/email" },
      { name: "Calendar", path: "/agent/app/calendar" },
      { name: "Todo", path: "/agent/app/todo" },
      { name: "Connection Network", path: "/agent/network" },
      { name: "Accountant", path: "/agent/account/accountant" },
    ],
  },
  {
    name: "Tools",
    access: Roles.agent,
    children: [
      { name: "Find My Hotel", path: "/agent/agent/hotels/find" },
      { name: "Quotation", path: "/agent/agent/quotation" },
      { name: "Best Price Flights", path: "/agent/agent/flights/best-price" },
    ],
  },
  {
    name: "Academy",
    access: Roles.agent,
    children: [
      { name: "Courses", path: "/agent/tools/courses" },
      { name: "My Courses", path: "/agent/courses/my-courses" },
      { name: "Course Details", path: "/agent/courses/1" },
    ],
  },
  {
    name: "Support",
    access: Roles.agent,
    children: [
      { name: "Open Tickets", path: "/agent/support/open-tickets" },
      { name: "New Ticket", path: "/agent/support/new-ticket" },
      { name: "Ticket History", path: "/agent/support/ticket-history" },
      { name: "Contact", path: "/agent/support/contact" },
      { name: "FAQ", path: "/agent/support/faq" },
    ],
  },
  {
    name: "My Account",
    access: Roles.agent,
    children: [
      { name: "Profile", path: "/agent/account/profile" },
      { name: "Settings", path: "/agent/account/settings" },
      { name: "Manage Agency", path: "/agent/account/manage-agents" },
    ],
  },
];

const navigationsExample: Navigations[] = [
  { type: "label", label: "Dashboard" },
  { name: "Analytics 1", path: "/dashboard", icon: duotone.PersonChalkboard },
  {
    name: "Analytics 2",
    path: "/dashboard/analytics-2",
    icon: duotone.BadgeDollar,
  },
  {
    name: "Ecommerce",
    path: "/dashboard/ecommerce",
    icon: duotone.RectangleCirclePlus,
  },
  { name: "CRM", path: "/dashboard/crm", icon: duotone.CommentsQuestionCheck },
  {
    name: "Logistics",
    path: "/dashboard/logistics",
    icon: duotone.DiagramProject,
  },
  { name: "Marketing", path: "/dashboard/marketing", icon: duotone.LayerGroup },
  {
    name: "Finance 1",
    path: "/dashboard/finance",
    icon: duotone.MessagesDollar,
  },
  {
    name: "Finance 2",
    path: "/dashboard/finance-2",
    icon: duotone.PersonCircleCheck,
  },

  { type: "label", label: "Management" },
  { name: "Profiles", icon: duotone.UserProfile, path: "/dashboard/profile" },
  { name: "Accounts", icon: duotone.Accounts, path: "/dashboard/account" },
  {
    name: "Users",
    icon: duotone.UserList,
    children: [
      { name: "Add User", path: "/dashboard/add-user" },
      { name: "User List 1", path: "/dashboard/user-list" },
      { name: "User Grid 1", path: "/dashboard/user-grid" },
      { name: "User List 2", path: "/dashboard/user-list-2" },
      { name: "User Grid 2", path: "/dashboard/user-grid-2" },
    ],
  },
  {
    name: "Products",
    icon: duotone.AdminEcommerce,
    children: [
      { name: "Product List", path: "/dashboard/product-list" },
      { name: "Product Grid", path: "/dashboard/product-grid" },
      { name: "Create Product", path: "/dashboard/create-product" },
      { name: "Product Details", path: "/dashboard/product-details" },
    ],
  },
  {
    name: "Invoice",
    icon: duotone.Invoice,
    children: [
      { name: "Invoice List", path: "/dashboard/invoice-list" },
      { name: "Invoice Details", path: "/dashboard/invoice-details" },
      { name: "Create Invoice", path: "/dashboard/create-invoice" },
    ],
  },
  {
    name: "Ecommerce",
    icon: duotone.Ecommerce,
    children: [
      { name: "Cart", path: "/dashboard/cart" },
      { name: "Payment", path: "/dashboard/payment" },
      { name: "Billing Address", path: "/dashboard/billing-address" },
      { name: "Payment Complete", path: "/dashboard/payment-complete" },
    ],
  },
  {
    name: "Data Table",
    icon: duotone.DataTable,
    children: [{ name: "Data Table 1", path: "/dashboard/data-table-1" }],
  },

  { type: "label", label: "Apps" },
  {
    name: "Todo List",
    icon: duotone.TodoList,
    path: "/dashboard/todo-list",
  },
  {
    name: "Chats",
    icon: duotone.Chat,
    path: "/dashboard/chat",
  },
  {
    name: "Email",
    icon: duotone.Inbox,
    children: [
      { name: "Inbox", path: "/dashboard/mail/all" },
      { name: "Email Details", path: "/dashboard/mail/details" },
      { name: "Create Email", path: "/dashboard/mail/compose" },
    ],
  },
  {
    name: "Sessions",
    icon: duotone.Session,
    children: [
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" },
      { name: "Forget Password", path: "/forget-password" },
    ],
  },
  {
    name: "Pages",
    icon: duotone.Pages,
    children: [
      { name: "About", path: "/dashboard/about" },
      { name: "Career", path: "/dashboard/career" },
      { name: "Career Apply", path: "/dashboard/career-apply" },
      { name: "Support", path: "/dashboard/support" },
      { name: "Create Ticket", path: "/dashboard/create-ticket" },
      { name: "File Manager", path: "/dashboard/file-manager" },
    ],
  },
  {
    type: "extLink",
    name: "Documentation",
    icon: duotone.FileCircleQuestion,
    path: "https://essence-doc.vercel.app/",
  },

  { type: "label", label: "Others" },
  {
    path: "https://essence-doc.vercel.app/",
    name: "Item Disabled",
    icon: duotone.Folder,
    disabled: true,
  },
  {
    name: "Multi Level Item",
    icon: duotone.Apps,
    children: [
      { name: "Level A", path: "#dashboard/cart" },
      {
        iconText: "B",
        name: "Level B",
        path: "#dashboard/payment",
        children: [
          { name: "Level B1", path: "#dashboard/payment" },
          {
            iconText: "B",
            name: "Level B2",
            path: "#dashboard/payment",
            children: [
              { name: "Level B21", path: "#dashboard/payment" },
              { name: "Level B22", path: "#dashboard/payment" },
            ],
          },
        ],
      },
    ],
  },
];

export const navigations: Navigations[] = [
  ...adminNavigations,
  // ...agentNavigations1,
  // ...navigationsExample
]
