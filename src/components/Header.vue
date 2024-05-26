<template>
 <nav class="navbar navbar-expand-lg navbar-light">
   <img id='account_icon' src='@/assets/menu_icon.png' style='width: 2%'>
   <img id="nclogo" src='@/assets/nlc_logo.png'>
  <a class="navbar-brand" href="#">Neuro Leap</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
    <ul class="navbar-nav">
      
    </ul>
    <ul class="navbar-nav">
      <li class="nav-item">
    <a class="btn btn-outline-warning my-1" hred="#"><i class="cil-user">Register Now</i></a></li>
    <li class="nav-link">Company Confidential</li>
    <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Add Child</button>
    <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
  <li class="nav-item">
  <a class="nav-link" href="#"><i class="cil-account-logout">Logout</i></a></li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
    name:"Header"
}
</script>

<style scoped>
nav{
    position: relative;
    background-color: #F7F7F7;
    border-style: ridge;
    top: 0;
}
a{
  font-size:20px;
}

#nclogo {
  height: 5%;
  width: 5%;
}

</style>