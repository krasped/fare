import { lazy } from "react";
import { Outlet } from "react-router-dom";
// CUSTOM COMPONENTS
import Loadable from "./Loadable";
import { AuthGuard, RoleBasedGuard } from "@/components/auth";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { Roles } from "@/components/auth/RoleBasedGuard";

// ALL DASHBOARD PAGES
const Home = Loadable(lazy(() => import("@/pages/agent/home")));

// const MySales = Loadable(lazy(() => import("@/pages/agent/dashboard/my-sales")));
// const AgencySales = Loadable(lazy(() => import("@/pages/agent/dashboard/agency-sales")));

// const Orders = Loadable(lazy(() => import("@/pages/agent/orders/orders")));
// const ManageOrders = Loadable(lazy(() => import("@/pages/agent/orders/manage")));
// const CreateInvoice = Loadable(lazy(() => import("@/pages/agent/orders/create-invoice")));
// const InvoiceDetails = Loadable(lazy(() => import("@/pages/agent/orders/invoice")));
// const InvoicesVouchers = Loadable(lazy(() => import("@/pages/agent/orders/invoices-vouchers")));

// const MyLeads = Loadable(lazy(() => import("@/pages/agent/leads/my-leads")));
// const LeadsMarketplace = Loadable(lazy(() => import("@/pages/agent/leads/leadsmall")));
// const OrderHistory = Loadable(lazy(() => import("@/pages/agent/leads/history")));

// const FutureWithdrawals = Loadable(lazy(() => import("@/pages/agent/reports/future-withdrawals")));
// const WithdrawalHistory = Loadable(lazy(() => import("@/pages/agent/reports/withdrawal-history")));

// const Chats = Loadable(lazy(() => import("@/pages/agent/app/chats")));
// const Email = Loadable(lazy(() => import("@/pages/agent/app/email")));
// const Calendar = Loadable(lazy(() => import("@/pages/agent/app/calendar")));
// const Todo = Loadable(lazy(() => import("@/pages/agent/app/todo")));

// const Courses = Loadable(lazy(() => import("@/pages/agent/tools/courses")));

// const MyCourses = Loadable(lazy(() => import("@/pages/agent/courses/my-courses")));
// const CourseDetails = Loadable(lazy(() => import("@/pages/agent/courses/course")));

// const OpenTickets = Loadable(lazy(() => import("@/pages/agent/support/open-tickets")));
// const NewTicket = Loadable(lazy(() => import("@/pages/agent/support/new-ticket")));
// const TicketHistory = Loadable(lazy(() => import("@/pages/agent/support/ticket-history")));
// const Contact = Loadable(lazy(() => import("@/pages/agent/support/contact")));
// const FAQ = Loadable(lazy(() => import("@/pages/agent/support/faq")));

const Profile = Loadable(lazy(() => import("@/pages/agent/account/profile")));
// const Settings = Loadable(lazy(() => import("@/pages/agent/account/settings")));
// const ManageAgents = Loadable(lazy(() => import("@/pages/agent/account/manage-agents")));
// const Accountant = Loadable(lazy(() => import("@/pages/agent/account/accountant")));

// const Search = Loadable(lazy(() => import("@/pages/agent/search/search")));

// const Hotels = Loadable(lazy(() => import("@/pages/agent/hotels/hotels")));
// const FindMyHotel = Loadable(lazy(() => import("@/pages/agent/hotels/find")));
// const HotelDetails = Loadable(lazy(() => import("@/pages/agent/hotels/id")));
// const BookingConfirmation = Loadable(lazy(() => import("@/pages/agent/hotels/booking-confirmation")));
// const Checkout = Loadable(lazy(() => import("@/pages/agent/hotels/checkout")));

// const Quotation = Loadable(lazy(() => import("@/pages/agent/quotation")));
// const BestPriceFlights = Loadable(lazy(() => import("@/pages/agent/flights")));
// const ConnectionNetwork = Loadable(lazy(() => import("@/pages/agent/network")));

export const AgentRoutes = [
  {
    path: "agent",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <RoleBasedGuard roles={[Roles.agent]}>
            <Outlet />
          </RoleBasedGuard>
        </DashboardLayout>
      </AuthGuard>
    ),
    // { index: true, element: <Analytics /> },
    children: [
      { index: true, element: <Home /> },
      // {
      //   path: "/dashboard",
      //   children: [
      //     { path: "my-sales", element: <MySales /> },
      //     { path: "agency-sales", element: <AgencySales /> },
      //   ],
      // },
      // {
      //   path: "/orders",
      //   children: [
      //     { path: "", element: <Orders /> },
      //     { path: "manage", element: <ManageOrders /> },
      //     { path: "create-invoice", element: <CreateInvoice /> },
      //     { path: "invoice/:id", element: <InvoiceDetails /> },
      //     { path: "invoices-vouchers", element: <InvoicesVouchers /> },
      //   ],
      // },
      // {
      //   path: "/leads",
      //   children: [
      //     { path: "my-leads", element: <MyLeads /> },
      //     { path: "leadsmall", element: <LeadsMarketplace /> },
      //     { path: "history", element: <OrderHistory /> },
      //   ],
      // },
      // {
      //   path: "/reports",
      //   children: [
      //     { path: "future-withdrawals", element: <FutureWithdrawals /> },
      //     { path: "withdrawal-history", element: <WithdrawalHistory /> },
      //   ],
      // },
      // {
      //   path: "/app",
      //   children: [
      //     { path: "chats", element: <Chats /> },
      //     { path: "email", element: <Email /> },
      //     { path: "calendar", element: <Calendar /> },
      //     { path: "todo", element: <Todo /> },
      //   ],
      // },
      // {
      //   path: "/tools",
      //   children: [
      //     { path: "courses", element: <Courses /> },
      //   ],
      // },
      // {
      //   path: "/courses",
      //   children: [
      //     { path: "my-courses", element: <MyCourses /> },
      //     { path: ":id", element: <CourseDetails /> },
      //   ],
      // },

      // {
      //   path: "/support",
      //   children: [
      //     { path: "open-tickets", element: <OpenTickets /> },
      //     { path: "new-ticket", element: <NewTicket /> },
      //     { path: "ticket-history", element: <TicketHistory /> },
      //     { path: "contact", element: <Contact /> },
      //     { path: "faq", element: <FAQ /> },
      //   ],
      // },
      {
        path: "account",
        children: [
          { path: "profile", element: <Profile /> },
          // { path: "settings", element: <Settings /> },
          // { path: "manage-agents", element: <ManageAgents /> },
          // { path: "accountant", element: <Accountant /> },
        ],
      },
      // {
      //   path: "/search",
      //   children: [
      //     { path: "", element: <Search /> },
      //     { path: "hotels", element: <Hotels /> },// from hotels
      //   ],
      // },
      // {
      //   path: "/hotels",
      //   children: [
      //     { path: "", element: <Hotels /> }, 
      //     { path: "find", element: <FindMyHotel /> },
      //     { path: ":id", element: <HotelDetails /> },
      //     { path: "booking-confirmation", element: <BookingConfirmation /> },
      //     { path: "checkout", element: <Checkout /> },
      //   ],
      // },
      // { path: "/quotation", element: <Quotation /> },
      // { path: "/flights/best-price", element: <BestPriceFlights /> },
      // { path: "/network", element: <ConnectionNetwork /> },
    ],
  },
];
