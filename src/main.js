import Vue from "vue";
import Vuex from "vuex";

import VModal from "vue-js-modal";
import Webcam from "vue-web-cam";
import { BootstrapVue } from "bootstrap-vue/dist/bootstrap-vue.esm";
import vueCountryRegionSelect from "vue-country-region-select";
import ToggleButton from "vue-js-toggle-button";

import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/scss/custom.scss";
import "vue-slider-component/theme/antd.css";
import CoreuiVue from "@coreui/vue";
import VuePapaParse from "vue-papa-parse";

import axios from "axios";
import VueAxios from "vue-axios";

import { cilAccountLogout } from "@coreui/icons";
import JwPagination from 'jw-vue-pagination';

//Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
const vuetify = new Vuetify()


//font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faClone, faEye, faSortDown, 
  faCircleRight, faCircleLeft, faCaretDown, faMagnifyingGlass,
  faPlus, faX, faQuestionCircle, faCircleInfo, faHeadphones,
  faCamera, faCaretLeft, faCaretRight, faCloudArrowDown, faCloudArrowUp, faFileArrowDown, 
  faEnvelope, faCircleXmark, faAngleDown, faCheck, faBars, faVideo, faTableCells, faTableList,
  faPencil, faFileArrowUp, faUser, faMicroscope, faGaugeSimpleHigh, faChartLine,
  faBarsStaggered, faFaceSmile
} from '@fortawesome/free-solid-svg-icons'

import {
  faFilePdf, faCircleQuestion, faTrashCan, faPenToSquare, faFolder, faClipboard
} from '@fortawesome/free-regular-svg-icons'

//use icons in application
library.add(faClone, faEye, faTrashCan, faSortDown, 
  faCircleRight, faCircleLeft, faCaretDown, faMagnifyingGlass,
  faPlus, faX, faQuestionCircle, faCircleInfo, faHeadphones,
  faCamera, faCaretLeft, faCaretRight, faCloudArrowUp, faCloudArrowDown, faFileArrowDown,
  faEnvelope, faCircleXmark, faAngleDown, faCheck, faBars, faFilePdf, faPenToSquare,
  faCircleQuestion, faVideo, faTableCells, faTableList, faPencil, faFolder, faClipboard, faFileArrowUp,
  faUser, faMicroscope, faGaugeSimpleHigh, faChartLine, faClipboard, faBarsStaggered, faFaceSmile)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('jw-pagination', JwPagination);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Webcam);
Vue.use(vueCountryRegionSelect);
Vue.use(ToggleButton);
Vue.use(Vuex);
Vue.use(VModal);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.use(CoreuiVue);
Vue.use(VuePapaParse);

const store = new Vuex.Store({
  mounted: function() {
    /*axios
      .get("http://localhost:8080/api/appAdmin")
      .then((response) => {
        console.log("main.js getting apps from backend"),
          this.applications.push(response.data);
      })
      .catch((error) => console.log(error));*/
  },

  data: {
    apps: null,
  },
  state: {
    applications: [],
    applicationsOnSale: [],
    sidebarShow: "responsive",
    sidebarMinimize: true,
    user: null,
    email: null,
    userLevel: "",
    loading: false,
    loadingForgotPassword: false,
    loadingResetPassword: false,
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user;
    },

    setCurrentEmail(state, email) {
      state.email = email;
    },

    setUserLevel(state, userLevel) {
      state.userLevel = userLevel;
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    setLoadingForgotPassword(state, loadingForgotPassword) {
      state.loadingForgotPassword = loadingForgotPassword;
    },
    setLoadingResetPassword(state, loadingResetPassword) {
      state.loadingResetPassword = loadingResetPassword;
    },

    addApplication(state, application) {
      state.applications.push(application);
      //console.log(state.applications);
    },

    addApplicationForSale(state, applicationOnSale) {
      state.applicationsOnSale.push(applicationOnSale);
      //console.log(state.applications);
    },

    setApplications(state, applications) {
      state.applications = applications;
    },

    setApplicationsOnSale(state, applicationsOnSale) {
      state.applicationsOnSale = applicationsOnSale;
    },

    removeApplication(state, application) {


        var index = state.applications.indexOf(application);
        if (index > -1) {
          state.applications.splice(index, 1);
        }

    },

    toggleSidebarDesktop(state) {
      const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
      state.sidebarShow = sidebarOpened ? false : "responsive";
    },
    toggleSidebarMobile(state) {
      const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
      state.sidebarShow = sidebarClosed ? true : "responsive";
    },
    set(state, [variable, value]) {
      state[variable] = value;
    },
  },
  getters: {
    getApplications(state) {

      return state.applications;
    },

    getUserLevel(state) {
      return state.userLevel;
    },

    getOnSaleApplications(state) {
      return state.applicationsOnSale;
    },

    isLoggedIn(state) {
      return state.user !== null;
    },

    getCurrentUser(state) {
      return state.user;
    },

    getCurrentEmail(state) {
      return state.email;
    },

    getLoadStatus(state) {
      return state.loading;
    },

    getLoadStatusForgotPassword(state) {
      return state.loadingForgotPassword;
    },

    getLoadStatusResetPassword(state) {
      return state.loadingResetPassword;
    },
  },
});

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

new Vue({
  render: (h) => h(App),
  vuetify,
  router: router,
  store: store,
  icons: { cilAccountLogout },
}).$mount("#app");
