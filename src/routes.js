import newApplicationForm from "./components/newApplicationForm";
import ViewApp from "./components/ViewApp";
import EditApp from "./components/EditApp";
import Dashboard from "./components/Dashboard";
import PreviewApp from "./components/PreviewApp";
import Specialist from "./components/Specialist.vue";
import SpecialistDashboard from "./components/SpecialistDashboard.vue";
import SpecialistCompare from "./components/SpecialistCompare.vue";
import landingPage from "./components/landingPage";
import Register from "./components/Register";
import loginPage from "./components/loginPage";
import SelectApplicationPage from "./components/SelectApplicationPage";
import RunApplication from "./components/RunApplication";
import DashboardSetting from "./components/DashboardSetting.vue";
import Settings from "./components/Settings.vue";
import Dummy from "./components/Dummy.vue";
import HubSystem from "./components/HubSystem";
import ApplicationSystem from "./components/ApplicationSystem";
import UpdateUserLevel from "./components/UpdateUserLevel";
import ReportsStatistics from "./components/ReportsStatistics";
import ConfigureReport from "./components/ConfigureReport";
import AboutUs from "./components/AboutUs.vue";
import UserManagePage from "./components/UserManagePage.vue";
import RolesPage from "./components/RolesPage.vue";
import SearchAppAdminApps from "./components/SearchAppAdminApps.vue";
import ViewAppAdminApps from "./components/ViewAppAdminApps.vue";
import ViewAllApplications from "./components/ViewAllApplications.vue";
import CloneApplication from "./components/CloneApplication";
import NewApplicationCard from "./components/NewApplicationCard.vue";
import ApplicationConfig from "./components/ApplicationConfig.vue";

export default [
  { path: "/", name: "landingPage", component: landingPage },
  { path: "/newapp", name: "newapp", component: newApplicationForm, props: true},
  { path: "/viewapp", name: "viewapp", component: ViewApp, props: true},

  { path: "/editapp", name: "editapp", component: EditApp, props: true },

  { path: "/selectApp", name: "selectApp", component: SelectApplicationPage, props: true},
  { path: "/updateUserLevel", name: "updateUserLevel", component: UpdateUserLevel, props: true },

  { path: "/runApp", name: "runApp", component: RunApplication, props: true },

  { path: "/previewApp", name: "previewApp", component: PreviewApp, props: true },

  { path: "/adminDashboard", name: "adminDashboard", component: Dashboard },

  { name: "Specialist", path: "/specialist", component: Specialist },
  { name: "SpecialistDashboard", path: "/specialistDashboard", component: SpecialistDashboard, props: true},
  { name: "SpecialistCompare", path: "/specialistCompare", component: SpecialistCompare, props: true},

  { name: "Register", path: "/register", component: Register},
  { name: "Login",path: "/login", component: loginPage},
  { path: "/dashboardSetting", component: DashboardSetting },
  { path: "/pageNotAvailable", component: Dummy },
  { path: "/settings", component: Settings},
  { path: "/aboutUs", component: AboutUs},
  { path: "/userManagePage", component: UserManagePage },
  { path: "/rolesPage", name:"rolesPage", component: RolesPage},
  { path: "/rolesPage/viewAllApplications", name:"viewAllApplications", component: ViewAllApplications},
  { path: "/rolesPage/searchAppAdminApps", name:"searchAppAdminApps", component: SearchAppAdminApps},
  { path: "/rolesPage/searchAppAdminApps/viewAppAdminApps", name:"viewAppAdminApps", component: ViewAppAdminApps},
  { path: "/rolesPage/searchAppAdminApps/viewAppAdminApps/cloneAppName", name:"cloneApp", component: CloneApplication }, //query param of application_id
  { path: "/rolesPage/searchAppAdminApps/viewAppAdminApps/newAppCard", name:"NewAppCard", component: NewApplicationCard},
  { path: "/rolesPage/searchAppAdminApps/viewAppAdminApps/newAppCard/:applicationID", name:"ApplicationConfig", component: ApplicationConfig },

  { path: "/reportsStatistics", name: "reportsStatistics", component: ReportsStatistics },
  { path: "/individualReport", name: "configureReport", component: ConfigureReport },

  { path: "/hubSystem", component: HubSystem },
  { path: "/hubSystem/:hubid", component: ApplicationSystem }
];
