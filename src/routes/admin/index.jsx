import React from "react";
import { Navigate } from "react-router-dom";

// Pages Component
import Chat from "@pages/admin/Chat/Chat";

// // File Manager
import FileManager from "@pages/admin/FileManager/index";

// // Profile
import UserProfile from "@pages/admin/Authentication/user-profile";

// Pages Calendar
import Calendar from "@pages/admin/Calendar/index";

// // //Tasks
import TasksList from "@pages/admin/Tasks/tasks-list";
import TasksCreate from "@pages/admin/Tasks/tasks-create";
import TasksKanban from "@pages/admin/Tasks/tasks-kanban";

// // //Projects
import ProjectsGrid from "@pages/admin/Projects/projects-grid";
import ProjectsList from "@pages/admin/Projects/projects-list";
import ProjectsOverview from "@pages/admin/Projects/ProjectOverview/projects-overview";
import ProjectsCreate from "@pages/admin/Projects/projects-create";

// // //Ecommerce Pages
import EcommerceProducts from "@pages/admin/Ecommerce/EcommerceProducts";
import EcommerceProductDetail from "@pages/admin/Ecommerce/EcommerceProductDetail/index";
import EcommerceOrders from "@pages/admin/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "@pages/admin/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "@pages/admin/Ecommerce/EcommerceCart";
import EcommerceCheckout from "@pages/admin/Ecommerce/EcommerceCheckout";
import EcommerceShops from "@pages/admin/Ecommerce/EcommerceShops/index";
import EcommerenceAddProduct from "@pages/admin/Ecommerce/EcommerceAddProduct";

// //Email
import EmailInbox from "@pages/admin/Email/email-inbox";
import EmailRead from "@pages/admin/Email/email-read";
import EmailBasicTemplte from "@pages/admin/Email/email-basic-templte";
import EmailAlertTemplte from "@pages/admin/Email/email-template-alert";
import EmailTemplateBilling from "@pages/admin/Email/email-template-billing";

// //Invoices
import InvoicesList from "@pages/admin/Invoices/invoices-list";
import InvoiceDetail from "@pages/admin/Invoices/invoices-detail";

// // Authentication related pages
import Login from "@pages/admin/Authentication/Login";
import Logout from "@pages/admin/Authentication/Logout";
import Register from "@pages/admin/Authentication/Register";
import ForgetPwd from "@pages/admin/Authentication/ForgetPassword";

// //  // Inner Authentication
import Login1 from "@pages/admin/AuthenticationInner/Login";
import Login2 from "@pages/admin/AuthenticationInner/Login2";
import Register1 from "@pages/admin/AuthenticationInner/Register";
import Register2 from "@pages/admin/AuthenticationInner/Register2";
import Recoverpw from "@pages/admin/AuthenticationInner/Recoverpw";
import Recoverpw2 from "@pages/admin/AuthenticationInner/Recoverpw2";
import ForgetPwd1 from "@pages/admin/AuthenticationInner/ForgetPassword";
import ForgetPwd2 from "@pages/admin/AuthenticationInner/ForgetPassword2";
import LockScreen from "@pages/admin/AuthenticationInner/auth-lock-screen";
import LockScreen2 from "@pages/admin/AuthenticationInner/auth-lock-screen-2";
import ConfirmMail from "@pages/admin/AuthenticationInner/page-confirm-mail";
import ConfirmMail2 from "@pages/admin/AuthenticationInner/page-confirm-mail-2";
import EmailVerification from "@pages/admin/AuthenticationInner/auth-email-verification";
import EmailVerification2 from "@pages/admin/AuthenticationInner/auth-email-verification-2";
import TwostepVerification from "@pages/admin/AuthenticationInner/auth-two-step-verification";
import TwostepVerification2 from "@pages/admin/AuthenticationInner/auth-two-step-verification-2";

// // Dashboard
import Dashboard from "@pages/admin/Dashboard/index";
import DashboardSaas from "@pages/admin/Dashboard-saas/index";
import DashboardCrypto from "@pages/admin/Dashboard-crypto/index";
import Blog from "@pages/admin/Dashboard-Blog/index";
import DashboardJob from "@pages/admin/DashboardJob/index";

// //Crypto
import CryptoWallet from "@pages/admin/Crypto/CryptoWallet/crypto-wallet";
import CryptoBuySell from "@pages/admin/Crypto/crypto-buy-sell";
import CryptoExchange from "@pages/admin/Crypto/crypto-exchange";
import CryptoLending from "@pages/admin/Crypto/crypto-lending";
import CryptoOrders from "@pages/admin/Crypto/CryptoOrders";
import CryptoKYCApplication from "@pages/admin/Crypto/crypto-kyc-application";
import CryptoIcoLanding from "@pages/admin/Crypto/CryptoIcoLanding/index";

// // Charts
import ChartApex from "@pages/admin/Charts/Apexcharts";
import ChartjsChart from "@pages/admin/Charts/ChartjsChart";
import EChart from "@pages/admin/Charts/EChart";
import SparklineChart from "@pages/admin/Charts/SparklineChart";
import ChartsKnob from "@pages/admin/Charts/charts-knob";
import ReCharts from "@pages/admin/Charts/ReCharts";

// // Maps
import MapsGoogle from "@pages/admin/Maps/MapsGoogle";

// //Icons
import IconBoxicons from "@pages/admin/Icons/IconBoxicons";
import IconDripicons from "@pages/admin/Icons/IconDripicons";
import IconMaterialdesign from "@pages/admin/Icons/IconMaterialdesign";
import IconFontawesome from "@pages/admin/Icons/IconFontawesome";

// //Tables
import BasicTables from "@pages/admin/Tables/BasicTables";
import DatatableTables from "@pages/admin/Tables/DatatableTables";

// //Blog
import BlogList from "@pages/admin/Blog/BlogList/index";
import BlogGrid from "@pages/admin/Blog/BlogGrid/index";
import BlogDetails from "@pages/admin/Blog/BlogDetails";

//Job
import JobGrid from "@pages/admin/JobPages/JobGrid/index";
import JobDetails from "@pages/admin/JobPages/JobDetails";
import JobCategories from "@pages/admin/JobPages/JobCategories";
import JobList from "@pages/admin/JobPages/JobList/index";
import ApplyJobs from "@pages/admin/JobPages/ApplyJobs/index";
import CandidateList from "@pages/admin/JobPages/CandidateList";
import CandidateOverview from "@pages/admin/JobPages/CandidateOverview";

// // Forms
import FormElements from "@pages/admin/Forms/FormElements";
import FormLayouts from "@pages/admin/Forms/FormLayouts";
import FormAdvanced from "@pages/admin/Forms/FormAdvanced/index";
import FormEditors from "@pages/admin/Forms/FormEditors";
import FormValidations from "@pages/admin/Forms/FormValidations";
import FormMask from "@pages/admin/Forms/FormMask";
import FormRepeater from "@pages/admin/Forms/FormRepeater";
import FormUpload from "@pages/admin/Forms/FormUpload";
import FormWizard from "@pages/admin/Forms/FormWizard";
import DualListbox from "@pages/admin/Tables/DualListbox";

// //Ui
import UiAlert from "@pages/admin/Ui/UiAlerts/index";
import UiButtons from "@pages/admin/Ui/UiButtons/index";
import UiCards from "@pages/admin/Ui/UiCard/index";
import UiCarousel from "@pages/admin/Ui/UiCarousel";
import UiColors from "@pages/admin/Ui/UiColors";
import UiDropdown from "@pages/admin/Ui/UiDropdown/index";
import UiOffCanvas from "@pages/admin/Ui/UiOffCanvas";

import UiGeneral from "@pages/admin/Ui/UiGeneral";
import UiGrid from "@pages/admin/Ui/UiGrid";
import UiImages from "@pages/admin/Ui/UiImages";
import UiLightbox from "@pages/admin/Ui/UiLightbox";
import UiModal from "@pages/admin/Ui/UiModal/index";

import UiTabsAccordions from "@pages/admin/Ui/UiTabsAccordions";
import UiTypography from "@pages/admin/Ui/UiTypography";
import UiVideo from "@pages/admin/Ui/UiVideo";
import UiSessionTimeout from "@pages/admin/Ui/UiSessionTimeout";
import UiRating from "@pages/admin/Ui/UiRating";
import UiRangeSlider from "@pages/admin/Ui/UiRangeSlider";
import UiNotifications from "@pages/admin/Ui/UINotifications";

import UiPlaceholders from "@pages/admin/Ui/UiPlaceholders";
import UiToasts from "@pages/admin/Ui/UiToast";
import UiUtilities from "@pages/admin/Ui/UiUtilities";

// //Pages
import PagesStarter from "@pages/admin/Utility/pages-starter";
import PagesMaintenance from "@pages/admin/Utility/pages-maintenance";
import PagesComingsoon from "@pages/admin/Utility/pages-comingsoon";
import PagesTimeline from "@pages/admin/Utility/pages-timeline";
import PagesFaqs from "@pages/admin/Utility/pages-faqs";
import PagesPricing from "@pages/admin/Utility/pages-pricing";
import Pages404 from "@pages/admin/Utility/pages-404";
import Pages500 from "@pages/admin/Utility/pages-500";

// //Contacts
import ContactsGrid from "@pages/admin/Contacts/contacts-grid";
import ContactsList from "@pages/admin/Contacts/ContactList/contacts-list";
import ContactsProfile from "@pages/admin/Contacts/ContactsProfile/index";
import UiProgressbar from "@pages/admin/Ui/UiProgressbar";
// import UiProgressbar from "../../src/pages/Ui/UiProgressbar"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/dashboard-saas", component: <DashboardSaas /> },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },
  { path: "/blog", component: <Blog /> },
  { path: "/dashboard-job", component: <DashboardJob /> },

  //   //Crypto
  { path: "/crypto-wallet", component: <CryptoWallet /> },
  { path: "/crypto-buy-sell", component: <CryptoBuySell /> },
  { path: "/crypto-exchange", component: <CryptoExchange /> },
  { path: "/crypto-landing", component: <CryptoLending /> },
  { path: "/crypto-orders", component: <CryptoOrders /> },
  { path: "/crypto-kyc-application", component: <CryptoKYCApplication /> },

  //chat
  { path: "/chat", component: <Chat /> },

  //File Manager
  { path: "/apps-filemanager", component: <FileManager /> },

  // //calendar
  { path: "/calendar", component: <Calendar /> },

  //   // //profile
  { path: "/profile", component: <UserProfile /> },

  //   //Ecommerce
  {
    path: "/ecommerce-product-detail/:id",
    component: <EcommerceProductDetail />,
  },
  { path: "/ecommerce-products", component: <EcommerceProducts /> },
  { path: "/ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/ecommerce-cart", component: <EcommerceCart /> },
  { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
  { path: "/ecommerce-shops", component: <EcommerceShops /> },
  { path: "/ecommerce-add-product", component: <EcommerenceAddProduct /> },

  //   //Email
  { path: "/email-inbox", component: <EmailInbox /> },
  { path: "/email-read/:id?", component: <EmailRead /> },
  { path: "/email-template-basic", component: <EmailBasicTemplte /> },
  { path: "/email-template-alert", component: <EmailAlertTemplte /> },
  { path: "/email-template-billing", component: <EmailTemplateBilling /> },

  //   //Invoices
  { path: "/invoices-list", component: <InvoicesList /> },
  { path: "/invoices-detail", component: <InvoiceDetail /> },
  { path: "/invoices-detail/:id?", component: <InvoiceDetail /> },

  //   // Tasks
  { path: "/tasks-list", component: <TasksList /> },
  { path: "/tasks-create", component: <TasksCreate /> },
  { path: "/tasks-kanban", component: <TasksKanban /> },

  //   //Projects
  { path: "/projects-grid", component: <ProjectsGrid /> },
  { path: "/projects-list", component: <ProjectsList /> },
  { path: "/projects-overview", component: <ProjectsOverview /> },
  { path: "/projects-overview/:id", component: <ProjectsOverview /> },
  { path: "/projects-create", component: <ProjectsCreate /> },

  //   //Blog
  { path: "/blog-list", component: <BlogList /> },
  { path: "/blog-grid", component: <BlogGrid /> },
  { path: "/blog-details", component: <BlogDetails /> },

  { path: "/job-grid", component: <JobGrid /> },
  { path: "/job-details", component: <JobDetails /> },
  { path: "/job-categories", component: <JobCategories /> },
  { path: "/job-list", component: <JobList /> },
  { path: "/job-apply", component: <ApplyJobs /> },
  { path: "/candidate-list", component: <CandidateList /> },
  { path: "/candidate-overview", component: <CandidateOverview /> },

  // Contacts
  { path: "/contacts-grid", component: <ContactsGrid /> },
  { path: "/contacts-list", component: <ContactsList /> },
  { path: "/contacts-profile", component: <ContactsProfile /> },

  //   //Charts
  { path: "/apex-charts", component: <ChartApex /> },
  { path: "/chartjs-charts", component: <ChartjsChart /> },
  { path: "/e-charts", component: <EChart /> },
  { path: "/sparkline-charts", component: <SparklineChart /> },
  { path: "/charts-knob", component: <ChartsKnob /> },
  { path: "/re-charts", component: <ReCharts /> },

  //   // Icons
  { path: "/icons-boxicons", component: <IconBoxicons /> },
  { path: "/icons-dripicons", component: <IconDripicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },

  //   // Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-datatable", component: <DatatableTables /> },

  //   // Maps
  { path: "/maps-google", component: <MapsGoogle /> },

  //   // Forms
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-layouts", component: <FormLayouts /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editors", component: <FormEditors /> },
  { path: "/form-mask", component: <FormMask /> },
  { path: "/form-repeater", component: <FormRepeater /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-wizard", component: <FormWizard /> },
  { path: "/form-validation", component: <FormValidations /> },
  { path: "/dual-listbox", component: <DualListbox /> },

  //   // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-offcanvas", component: <UiOffCanvas /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  { path: "/ui-rating", component: <UiRating /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-notifications", component: <UiNotifications /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-toasts", component: <UiToasts /> },
  { path: "/ui-utilities", component: <UiUtilities /> },

  //   //Utility
  { path: "/pages-starter", component: <PagesStarter /> },
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-faqs", component: <PagesFaqs /> },
  { path: "/pages-pricing", component: <PagesPricing /> },

  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
  { path: "/crypto-ico-landing", component: <CryptoIcoLanding /> },

  //   // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  { path: "/pages-login-2", component: <Login2 /> },
  { path: "/pages-register", component: <Register1 /> },
  { path: "/pages-register-2", component: <Register2 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  { path: "/pages-forgot-pwd", component: <ForgetPwd1 /> },
  { path: "/pages-forgot-pwd-2", component: <ForgetPwd2 /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
  { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  { path: "/page-confirm-mail", component: <ConfirmMail /> },
  { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  {
    path: "/auth-two-step-verification-2",
    component: <TwostepVerification2 />,
  },
];

// export { authProtectedRoutes, publicRoutes };
export { authProtectedRoutes, publicRoutes };
