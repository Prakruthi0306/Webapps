<template>
    <div>
        <CContainer class="mb-3">
            <CRow class="bg-warning">
                <CCol class="col-2 d-flex flex-column justify-content-center id-area">
                    <div>{{ applicationSystemItem.app_name }}</div>
                </CCol>
                <CCol class="col-8 d-flex flex-column justify-content-center info-area-1">
                    <div class="info-area-1-item">
                        <span class="float-left">Occasions</span>
                        <span class="float-right">{{ applicationSystemItem.occasion }} per month</span>
                    </div>
                    <div class="info-area-1-item">
                        <span class="float-left">Average Duration</span>
                        <span class="float-right">{{ applicationSystemItem.avg_duration }} hours</span>
                    </div>
                    <div class="info-area-1-item">
                        <span class="float-left">Average Frequency</span>
                        <span class="float-right">{{ applicationSystemItem.avg_frequency }} min</span>
                    </div>
                </CCol>
                <CCol class="col-2 d-flex flex-column justify-content-center">
                    <div class="info-area-2-item">
                        <span v-if="applicationSystemItem.is_up_to_date === true">
                            <span class="dot active-dot"></span>
                            <span>Up to date</span>
                        </span>
                        <span v-else>
                            <span class="dot inactive-dot"></span>
                            <span>Need Update</span>
                        </span>
                        
                    </div>
                    <div class="info-area-2-item">
                        <span>Version:</span>
                        <span>{{ applicationSystemItem.version }}</span>
                    </div>
                    <div class="info-area-2-item">
                        <span>Build:</span>
                        <span>{{ applicationSystemItem.build }}</span>
                    </div>
                    <div class="info-area-2-item">
                        <router-link :to="'/'">
                            <button type="button" class="btn btn-light btn-sm">View</button>
                        </router-link>
                    </div>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
export default {
    name: "ApplicationSystemItem",
    props: ["applicationSystemItem"],
};
</script>

<style scoped>
    .id-area {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        text-align: center;
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

    .info-area-2-item {
        font-size: 13px;
        margin: 4px;
    }


    .dot {
        position: relative;
        top: 4px;
        margin-right: 10px;
        height: 18px;
        width: 18px;
        
        border-radius: 50%;
        display: inline-block;
    }

    .active-dot {
        background-color: #19E619;
    }

    .inactive-dot {
        background-color: yellow;
    }
</style>
