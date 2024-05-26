<template>
  <CHeader fixed with-subheader light id="bigcontainer" class="navbar-text">
    <CHeaderNav>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/">
          <CNavbarBrand href="#">
            <img
              src="@/assets/nlc_logo.png"
              height="80px"
              width="80px"
              class="d-inline-block align-top"
              alt="NeuroLeap Corp"
            />
          </CNavbarBrand>

          <CNavbarBrand
            v-if="
              $route.name == 'adminDashboard' ||
                $route.name == 'newapp' ||
                $route.name == 'viewapp' ||
                $route.name == 'editapp' ||
                $route.name == 'previewApp'
            "
            ><router-link to="/adminDashboard" class="text-dark navbar-text"
              >Application Administration</router-link
            >
          </CNavbarBrand>
          <CNavbarBrand v-else href="#">
            <router-link to="/" class="navbar-text neuroleap-text"
              >NeuroLeap</router-link
            >
          </CNavbarBrand>

          <CToggler
            in-header
            class="ml-3 d-lg-none"
            @click="$store.commit('toggleSidebarMobile')"
          />
          <CToggler
            in-header
            class="ml-3 d-md-down-none"
            @click="$store.commit('toggleSidebarDesktop')"
          />
          <CHeaderBrand class="mx-auto d-sm-none" to="/">
            <CIcon name="logo" height="48" alt="Logo" />
          </CHeaderBrand>
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>

    <CHeaderNav id="navMiddle-container">
      <CHeaderNavItem class="links d-md-down-none mx-2">
        <router-link to="/" class="navbar-text">Home</router-link>
      </CHeaderNavItem>
      <CHeaderNavItem class="links d-md-down-none mx-2">
        <router-link to="/aboutUs" class="navbar-text">About Us</router-link>
      </CHeaderNavItem>
      <CHeaderNavItem class="links d-md-down-none mx-2">
        <router-link to="/reportsStatistics" class="navbar-text"
          >Reports/Statistics</router-link
        >
      </CHeaderNavItem>
      <CHeaderNavItem class="links d-md-down-none mx-2">
        <router-link to="/rolesPage" class="navbar-text">Roles</router-link>
      </CHeaderNavItem>
      <CHeaderNavItem class="links d-md-down-none mx-2">
        <router-link to="/" class="navbar-text">App Admin</router-link>
      </CHeaderNavItem>
      <CHeaderNavItem
        class="links d-md-down-none mx-2"
      >
        <router-link to="/rolesPage/viewAllApplications" class="navbar-text">Applications</router-link>
      </CHeaderNavItem>
      <CHeaderNavItem v-if="isSuperAdmin" class="links d-md-down-none mx-2">
        <router-link to="/userManagePage" class="navbar-text"
          >Manage User</router-link
        >
      </CHeaderNavItem>
      <!--       <CHeaderNavItem v-if="$route.name == 'Register'" class="links mx-2">
        <a href="#name">Name</a></CHeaderNavItem
      >
      <CHeaderNavItem
        v-if="$route.name == 'Register'"
        class="links d-md-down-none mx-2"
      >
        <a href="#work">Work</a>
      </CHeaderNavItem>
      <CHeaderNavItem
        v-if="$route.name == 'Register'"
        class="links d-md-down-none mx-2"
      >
        <a href="#location">Location</a>
      </CHeaderNavItem>
      <CHeaderNavItem
        v-if="$route.name == 'Register'"
        class="links d-md-down-none mx-2"
      >
        <a href="#createLogin">Create Login</a>
      </CHeaderNavItem>

      <CHeaderNavItem
        v-if="$route.name == 'Login'"
        class="links d-md-down-none mx-2"
      >
        <a href="#login">Login</a></CHeaderNavItem
      >
      <CHeaderNavItem
        v-if="$route.name == 'Login'"
        class="links d-md-down-none mx-2"
      >
        <a href="#forgotpassword">Forgot Password</a>
      </CHeaderNavItem>

      <CHeaderNavItem
        v-if="$route.name == 'Login'"
        class="links d-md-down-none mx-2"
      >
        <a href="#resetpassword">Reset Password</a>
      </CHeaderNavItem>

      <CHeaderNavItem v-if="$route.name == 'viewapp'" class="links mx-2">
        <a href="#general">General</a></CHeaderNavItem
      >
      <CHeaderNavItem
        v-if="$route.name == 'viewapp'"
        class="links d-md-down-none mx-2"
      >
        <a href="#media">Media</a>
      </CHeaderNavItem>
      <CHeaderNavItem
        v-if="$route.name == 'viewapp'"
        class="links d-md-down-none mx-2"
      >
        <a href="#answers">Answers</a>
      </CHeaderNavItem>

      <CHeaderNavItem
        v-if="$route.name == 'viewapp'"
        class="links d-md-down-none mx-2"
      >
        <a href="#timelimits">Time limits</a>
      </CHeaderNavItem>
      <CHeaderNavItem
        v-if="$route.name == 'viewapp'"
        class="links d-md-down-none mx-2"
      >
        <a href="#prompts">Prompts</a>
      </CHeaderNavItem>
      <CHeaderNavItem
        v-if="$route.name == 'viewapp'"
        class="links d-md-down-none mx-2"
      >
        <a href="#custom">Custom</a>
      </CHeaderNavItem> -->
    </CHeaderNav>

    <CHeaderNav>
      <!--       <div class="border border-dark w-50">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></span>
          </b-input-group-prepend>
          <b-form-input class="LoginInput" size="sm" placeholder="Search">
          </b-form-input>
        </b-input-group>
      </div> -->
      <div class="rounded-pill border border-dark">
        <div class="d-flex justify-content-center align-items-center w-100">
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            size="xs"
            class="w-25"
          />
          <input
            id="searchApp"
            placeholder="Search"
            size="sm"
            class="border-0 rounded-pill w-50"
          />
        </div>
      </div>

      <CHeaderNav
        v-if="
          $route.name == 'Register' ||
            $route.name == 'Login' ||
            $route.name == 'landingPage'
        "
      >
        <b-dropdown
          variant="none"
          :text="getEmail()"
          size="sm"
          class="rounded-pill header-dropdownContainer border border-dark"
        >
          <b-dropdown-item @click="routeRegister">
            <span class="header-dropdownText">Register</span>
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>

          <b-dropdown-item v-if="displayWebsite" @click="routeLogin">
            <span class="header-dropdownText">Login</span>
          </b-dropdown-item>

          <b-dropdown-item v-else @click="logout">
            <span class="header-dropdownText">Logout</span>
          </b-dropdown-item>
          <br />
        </b-dropdown>
      </CHeaderNav>

      <CHeaderNav v-else>
        <CHeaderNavItem
          v-if="
            $route.name == 'adminDashboard' ||
              $route.name == 'updateUserLevel' ||
              $route.name == 'newapp' ||
              $route.name == 'viewapp' ||
              $route.name == 'editapp' ||
              $route.name == 'previewApp' ||
              $route.name == 'viewApplication' ||
              $route.name == 'cloneApp' ||
              $route.name == 'reportsStatistics' ||
              $route.name == undefined
          "
          class="linkItemClass"
        >
          <!-- <b-dropdown-item v-if="isSuperuser" @click="routeUpdateUserLevel">
            <span class="header-dropdownText">Manage Users</span>
          </b-dropdown-item> -->
          <!-- <b-dropdown-divider v-if="isSuperuser"></b-dropdown-divider> -->
          <b-dropdown
            variant="none"
            :text="getEmail()"
            size="sm"
            class="rounded-pill header-dropdownContainer border border-dark"
          >
            <b-dropdown-item @click="routeNewApp">
              <span class="header-dropdownText">New Application</span>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item @click="routeLoadApp">
              <span class="header-dropdownText">Load Application</span>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item @click="logout">
              <span class="header-dropdownText">Logout</span>
            </b-dropdown-item>
            <br />
          </b-dropdown>
        </CHeaderNavItem>
      </CHeaderNav>
    </CHeaderNav>
  </CHeader>
</template>

<style lang="scss" scoped>
@use 'sharedSCSS/globalSharedVariables';

.nav-links {
  display: inline-block;
  margin: 0 auto;
  padding-top: 8px;
}
.links a {
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 8px;
  padding-top: 8px;
  color: black;
  text-decoration: none;
}
.links a:hover {
  background-color: #ddd;
  color: black;
}

.links a:active {
  border-bottom: #ff930f;
  text-decoration: none;
}

#bigcontainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: globalSharedVariables.$navbar-height;
  margin: 0;
}

.header-dropdownContainer {
  background-color: #eeaa56;
}

.navbar-text {
  font-family: "Roboto", serif;
  font-weight: 700;
  font-size: 15px;
  color: #000000;
}

.neuroleap-text {
  font-family: "Lucida Console"; /* Change the font family */
  font-weight: 700; /* Change the font weight */
  color: #000000; /* Change the text color */
  font-size: 16px;
  text-decoration: none; /* Add text decoration */
}

.c-header-toggler-icon {
  height: 2rem;
}

#navMiddle-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
</style>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    displayWebsite() {
      return this.$store.getters.isLoggedIn;
    },

    isSuperuser() {
      return this.$store.getters.getUserLevel;
    },
    isSuperAdmin() {
      var user_role = this.$store.getters.getUserLevel;
      if (user_role == "Super Admin" || user_role == "Developer") {
        return true;
      }
      return false;
    },
  },

  methods: {
    routeRegister() {
      this.$router.push("/register");
    },

    routeLogin() {
      this.$router.push("/login");
    },

    routeNewApp() {
      this.$router.push("/newapp");
    },
    routeLoadApp() {
      this.$router.push("/selectApp");
    },

    routeUpdateUserLevel() {
      this.$router.push("/updateUserLevel");
    },

    getEmail() {
      var email = this.$store.getters.getCurrentEmail;

      if (email) {
        return email;
      } else {
        return "Log in / Sign up";
      }
    },
    logout() {
      var empty = [];
      this.$store.commit("setApplications", empty);
      this.$store.commit("setApplicationsOnSale", empty);
      this.$store.commit("setUserLevel", "");

      this.$store.commit("setAuthUser", null);
      this.$store.commit("setCurrentEmail", null);

      this.$router.push("/");
    },
  },
};
</script>
