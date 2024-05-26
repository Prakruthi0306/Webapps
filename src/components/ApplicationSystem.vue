<template>
    <div class="body">
        <CContainer class="mb-3 background">
            <h1><b>Application Status</b></h1>
            <div class="customer-infoarea-content">
                <div>
                    <span class="customer-infoarea-field">Customer ID:</span>
                    <span class="customer-infoarea-text">{{ customer.customer_id }}</span>
                </div>
                <div>
                    <span class="customer-infoarea-field">Date:</span>
                    <span class="customer-infoarea-text">{{ customer.date }}</span>
                </div>
                <div>
                    <span class="customer-infoarea-field">Unique ID:</span>
                    <span class="customer-infoarea-text">{{ $route.params.hubid }}</span>
                </div>
                <div>
                    <span class="customer-infoarea-field">Customer Location ID:</span>
                    <span class="customer-infoarea-text">{{ customer.location_id }}</span>
                </div>
            </div>
            <div class="content">
                <button type="button btn-outline-secondary" class="btn icon" data-toggle="modal" data-target="#addNewHubModal">
                    <img class="icon" src="../assets/suitcase icon_1.svg" alt="">
                </button>
                <div class="modal fade" id="addNewHubModal" tabindex="-1" role="dialog" aria-labelledby="addNewHubModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addNewHubModalLabel">Add a New Hub</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="admin-id" class="col-form-label">Admin Id:</label>
                                    <input type="number" class="form-control" id="admin-id">
                                </div>
                                <div class="form-group">
                                    <label for="admin-username" class="col-form-label">Admin Username:</label>
                                    <input type="text" class="form-control" id="admin-username">
                                </div>
                                <div class="form-group">
                                    <label for="admin-password" class="col-form-label">Admin Password:</label>
                                    <input type="password" class="form-control" id="admin-password">
                                </div>
                                <div class="form-group">
                                    <label for="location" class="col-form-label">Location:</label>
                                    <input type="text" class="form-control" id="location">
                                </div>
                                <div class="form-group">
                                    <label for="date" class="col-form-label">Purchase Date:</label>
                                    <input type="date" class="form-control" id="date">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Confirm</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="system-title"> installed application usage overview</div>
                <dir v-bind:key="applicationSystemItem.id" v-for="applicationSystemItem in applicationSystemItems">
                    <ApplicationSystemItem v-bind:applicationSystemItem="applicationSystemItem" />
                </dir>
            </div>
        </CContainer>

        
        
    </div>
</template>

<script>
const customer = {
    system_name: "Sunnyvale school district",
    customer_id: 1586713,
    date: "06/09/2020",
    location_id: 121,

};

const applicationSystemItems = [
    {
        id: 1,
        app_name: "NLL-A",
        occasion: 50,
        avg_duration: 2.5,
        avg_frequency: 22,
        is_up_to_date: true,
        version: "2.1",
        build: "113",
    },
    {
        id: 2,
        app_name: "NLR-A",
        occasion: 50,
        avg_duration: 3,
        avg_frequency: 36,
        is_up_to_date: false,
        version: "2.1",
        build: "113",
    },
    {
        id: 3,
        app_name: "NLM-A",
        occasion: 50,
        avg_duration: 7.4,
        avg_frequency: 13,
        is_up_to_date: false,
        version: "2.1",
        build: "113",
    },
    {
        id: 4,
        app_name: "NLC-A",
        occasion: 50,
        avg_duration: 2.5,
        avg_frequency: 22,
        is_up_to_date: true,
        version: "2.1",
        build: "113",
    },
];

import ApplicationSystemItem from "./ApplicationSystemItem.vue"

export default {
    name: "ApplicationSystem",
    components: {
        ApplicationSystemItem,
    },
    data() {
        return {
            applicationSystemItems: applicationSystemItems,
            customer: customer,
        };
    },
};
</script>

<style scoped>
    .background {
        position: relative;
    }
    
    .content {
        position: relative;
        background-color: #f3ddbd;
        padding: 50px;
    }

    .customer-infoarea-content {
        width: 350px;
        border: 2px solid black;
        padding: 20px;
        margin-bottom: 20px;
    }
    
    .customer-infoarea-field {
        font-weight: bold;
    }

    .customer-infoarea-text {
        position: absolute;
        left: 220px;
    }

    .system-title {
        font-size: 26px;
        font-weight: bold;
        white-space: nowrap;
        margin: 10px;
        text-transform: uppercase;
    }

    .icon {
        position: relative;
        padding-left: 20px;
        float: right;
        width: 70px;
        height: auto;
    }

</style>