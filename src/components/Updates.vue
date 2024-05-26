<template>
  <div>
    <CRow alignVertical="center" alignHorizontal="center">
      <CCol col="12" md="6">
        <CCard color="light">
          <CBadge
            @click="cardCollapse = !cardCollapse"
            class="btn text-center"
            width="100px"
            color="light"
          >
            <strong class="h5 text-secondary">Updates</strong>
          </CBadge>
          <CCollapse :show="cardCollapse">
            <CCardBody color="light" class="m-1">
              <CListGroup>
                <CListGroupItem
                  color="light"
                  v-for="update in updates"
                  :key="update.update_id"
                >
                  {{ update.update_message }}
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: "Updates",
  data() {
    return {
      collapse: false,
      cardCollapse: true,
      innerCollapse: false,
      updates: [
        { update_id: 1, update_message: "Update One" },
        { update_id: 2, update_message: "Update Two" },
        { update_id: 3, update_message: "Update Three" },
        { update_id: 4, update_message: "Update Four" },
      ],
    };
  },
};
</script>
