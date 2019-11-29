<script>
export let playerInfo={};
</script>

<style>
.card {
  box-shadow: none;
  max-width: 300px;
  text-align: center;
  height: 35vh;
  background-color: transparent;
  padding-top: 50px;
}

.card img {
  height: 40px;
  width: 40px;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>

<div class="card">
  <img src="images/football-icon.png" alt="John">
  <h1>{playerInfo.username}</h1>
  <!-- <p class="title">CEO & Founder, Example</p>
  <p>Harvard University</p>-->
  <button>About</button> 
</div>
