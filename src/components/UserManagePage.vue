<template>
  <div class="mainbody">
    <div class="w-100 p-4">
      <h1 class="text-center mb-4">User Management Page</h1>
      <table class="table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Account Status</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.userLevel }}</td>
            <td>{{ user.email }}</td>
            <td>{{ getAccountStatus(user.pending) }}</td>
            <td>{{ formatDate(user.created) }}</td>
            <!-- Add actions for each user -->
            <td>
              <button
                v-if="user.pending === 'no'"
                class="action-button suspend"
                @click="suspendUser(user.id)"
              >
                Suspend
              </button>
              <button
                v-if="user.pending === 'yes'"
                class="action-button reactivate"
                @click="reactivateUser(user.id)"
              >
                Reactivate
              </button>
              <b-dropdown text="Modify Role" class="rounded-dropdown">
                <b-dropdown-item
                  v-for="role in roles"
                  :key="role"
                  @click="changeRole(user.id, user.name, role)"
                >
                  {{ role }}
                </b-dropdown-item>
              </b-dropdown>
              <button class="action-button delete" @click="deleteUser(user.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import instance from "../axios";
import { BDropdown, BDropdownItem } from "bootstrap-vue";

export default {
  name: "manageUser",
  data() {
    return {
      users: [],
      roles: [
        "App Admin",
        "Organization",
        "Parent/Caretaker",
        "Specialist",
        "Statistician/Analyst",
        "Super Admin",
        "Developer",
        "App User",
      ],
    };
  },
  components: {
    BDropdown,
    BDropdownItem,
  },
  mounted: function() {
    instance
      .get("api/auth/get-all-users")
      .then((response) => {
        this.users = response.data;
        console.log("response data = ", response.data);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    },
    getAccountStatus(pending) {
      return pending === "yes" ? "Inactive" : "Active";
    },
    suspendUser(id) {
      if (confirm("Are you sure you want to suspend this user?")) {
        instance
          .put(`api/user/${id}`, { pending: "yes" })
          .then(() => {
            // Update the local user list to reflect the change
            const index = this.users.findIndex((user) => user.id === id);
            if (index !== -1) {
              this.users[index].pending = "yes";
            }
            console.log("User suspended successfully");
          })
          .catch((error) => {
            console.error("Error suspending user:", error);
            alert("Failed to suspend user. Please try again later.");
          });
      }
    },
    reactivateUser(id) {
      if (confirm("Are you sure you want to reactivate this user?")) {
        instance
          .put(`api/user/${id}`, { pending: "no" })
          .then(() => {
            // Update the local user list to reflect the change
            const index = this.users.findIndex((user) => user.id === id);
            if (index !== -1) {
              this.users[index].pending = "no";
            }
            console.log("User reactivated successfully");
          })
          .catch((error) => {
            console.error("Error reactivating user:", error);
            alert("Failed to reactivate user. Please try again later.");
          });
      }
    },
    deleteUser(id) {
      if (confirm("Are you sure you want to delete this user?")) {
        instance
          .delete(`api/user/${id}`)
          .then(() => {
            // If successful, remove the user from the list
            this.users = this.users.filter((user) => user.id !== id);
            console.log("User deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again later.");
          });
      }
    },
    changeRole(id, name, newRole) {
      if (
        confirm(
          `Are you sure you want to change the role of ${name} to ${newRole}?`
        )
      ) {
        instance
          .put(`api/user/role/${id}`, { user_level: newRole })
          .then(() => {
            // Update the local user list to reflect the change
            const index = this.users.findIndex((user) => user.id === id);
            if (index !== -1) {
              this.users[index].userLevel = newRole;
            }
            console.log(`Role changed successfully for user ${id}`);
          })
          .catch((error) => {
            console.error(`Error changing role for user ${id}:`, error);
            alert("Failed to change role. Please try again later.");
          });
      }
    },
  },
};
</script>

<style lang="scss">
.mainbody {
  margin-top: 75px;
  margin-bottom: 97px;
  font-family: "Roboto", sans-serif;
  color: #000000;
  min-height: 80vh;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0; /* Ensure no spacing between cells */
  border: 2px solid #dddddd; /* External border color */
}

.table td {
  padding: 8px;
  border-bottom: 1px solid #dddddd;
  text-align: center;
  color: #000000; /* Text color */
  border-right: 1px solid #dddddd;
}

.table th {
  background-color: #eeaa56; /* Orange background */
  text-align: center;
  border-right: 1px solid #dddddd;
}

.action-button {
  background-color: #eeaa56; /* Orange color */
  color: #ffffff; /* White text */
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 8px; /* Add margin between buttons */
  width: 120px;
}

.action-button:last-child {
  margin-right: 0; /* Remove margin from last button */
}
.action-button.delete {
  background-color: #ff6347; /* Reddish tone */
  margin-left: 8px;
}
.rounded-dropdown .dropdown-toggle {
  background-color: #eeaa56; /* Orange color */
  color: #ffffff; /* White text */
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 130px;
  height: 45px;
  font-size: 18px;
  margin-bottom: 4px;
}

.action-button:hover {
  background-color: #555;
}
</style>
