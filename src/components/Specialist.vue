<template>
  <div class="specialist">
    <Header />
    <SpecialistDashboards />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import SpecialistDashboards from '@/components/SpecialistDashboards.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Specialist',
  components: {
    SpecialistDashboards,
    Header,
    Footer
  }
}
</script>
