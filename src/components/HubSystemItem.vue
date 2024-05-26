<template>
    <div>
        <CContainer class="mb-3">
            <CRow class="bg-warning">
                <CCol class="col-2 d-flex flex-column justify-content-center id-area">
                    <div>ID: {{ hubSystemItem.id }}</div>
                    <div>Location: {{ hubSystemItem.location_name }}</div>
                    <div>
                        <router-link :to="'/hubSystem/' + hubSystemItem.id">
                            <button type="button" class="btn btn-light btn-sm">View</button>
                        </router-link>
                    </div>
                </CCol>
                <CCol class="col-6 d-flex flex-column justify-content-center info-area-1">
                    <div class="info-area-1-item">
                        <span class="float-left">Occasions</span>
                        <span class="float-right">{{ hubSystemItem.occasion }} per month</span>
                    </div>
                    <div class="info-area-1-item">
                        <span class="float-left">Average Duration</span>
                        <span class="float-right">{{ hubSystemItem.avg_duration }} hours</span>
                    </div>
                    <div class="info-area-1-item">
                        <span class="float-left">Average Frequency</span>
                        <span class="float-right">{{ hubSystemItem.avg_frequency }} min</span>
                    </div>
                </CCol>
                <CCol class="col-2 d-flex flex-column justify-content-center info-area-2">
                    <div><b>Hardware Version:</b> {{ hubSystemItem.hardware_version }}</div>
                    <div><b>OS Version:</b> {{ hubSystemItem.os_version }}</div>
                    <div><b>Framework Version:</b> {{ hubSystemItem.framework_version }}</div>
                </CCol>
                <CCol class="col-2">
                    <CRow >
                        <span v-if="hubSystemItem.is_active === true">
                            <span class="dot active-dot"></span>
                            <span class="button-text">Active</span>
                        </span>
                        <span v-else>
                            <span class="dot inactive-dot"></span>
                            <span class="button-text">Inactive</span>
                        </span>
                        
                    </CRow>
                    <CRow>
                        <label class="c-switch c-switch-pill c-switch-success" size="sm">
                            <input v-if="hubSystemItem.is_active === true" type="checkbox" class="c-switch-input" checked>
                            <input v-else type="checkbox" class="c-switch-input">
                            <span class="c-switch-slider"></span>
                        </label>
                        <span class="button-text">Deactivate</span>
                    </CRow>
                    <CRow>
                        <label class="c-switch c-switch-pill c-switch-success" size="sm">
                            <input type="checkbox" class="c-switch-input" checked>
                            <span class="c-switch-slider"></span>
                        </label>
                        <span class="button-text">Reboot</span>
                    </CRow>
                    <CRow>
                        <label class="c-switch c-switch-pill c-switch-success" size="sm">
                            <input type="checkbox" class="c-switch-input" checked>
                            <span class="c-switch-slider"></span>
                        </label>
                        <span class="button-text">Disconnect</span>
                    </CRow>
                    <CRow>
                        <label class="c-switch c-switch-pill c-switch-success" size="sm">
                            <input type="checkbox" class="c-switch-input" checked>
                            <span class="c-switch-slider"></span>
                        </label>
                        <span class="button-text">Reprogram</span>
                    </CRow>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
export default {
    name: "HubSystemItem",
    props: ["hubSystemItem"],
};
</script>

<style scoped>
    .id-area {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }

    .btn {
        font-family: 'Lexia', arial;
        padding-left: 20px;
        padding-right: 20px;
    }

    .info-area-1 {
        font-size: 17px;
    }

    .info-area-1-item {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        margin: 6px
    }

    .info-area-2 {
        font-size: 13px;
    }

    .button-text {
        margin-left: 5px;
    }

    .dot {
        position: relative;
        top: 4px;
        left: 3px;
        margin-right: 20px;
        height: 20px;
        width: 20px;
        
        border-radius: 50%;
        display: inline-block;
    }

    .active-dot {
        background-color: #19E619;
    }

    .inactive-dot {
        background-color: #bbb;
    }
</style>
