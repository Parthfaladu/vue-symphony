<template>
	<div class="container login-container">
    	<div class="row">
      		<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        		<div class="card card-signin my-5">
          			<div class="card-body">
            			<h5 class="card-title text-center">Sign In</h5>
			            <form class="form-signin">
			            	<img src="@assets/images/logo.png" width="50px">
			            	{{welcomeMsg}}
			              	<div class="form-label-group">
			                	<input id="inputEmail" type="email" class="form-control mb-3" placeholder="Email address" required autofocus>
			              	</div>

			              	<div class="form-label-group">
			                	<input id="inputPassword" type="password" class="form-control mb-4" placeholder="Password" required>
			              	</div>

			              	<div class="custom-control custom-checkbox mb-3">
			                	<input id="customCheck1" type="checkbox" class="custom-control-input">
			                	<label class="custom-control-label" for="customCheck1">Remember password</label>
			              	</div>

			              	<button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
			              	<hr class="my-4">
			              	<button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
			              	<button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
			            </form>
          			</div>
        		</div>
      		</div>
    	</div>
  	</div>
</template>
<script>
import authApi from '@services/api/authApi';

export default {
	name: 'LoginForm',
	data() {
		return {
			welcomeMsg: null,
		}
	},
	async mounted() {
		const res = await authApi.getDetail();
		this.welcomeMsg = res.data;
	}
}
</script>

<style lang="scss">
body {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
}

.login-container {
	.card-signin {
	  border: 0;
	  border-radius: 1rem;
	  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
	}

	.card-signin .card-title {
	  margin-bottom: 2rem;
	  font-weight: 300;
	  font-size: 1.5rem;
	}

	.card-signin .card-body {
	  padding: 2rem;
	}

	.form-signin {
	  width: 100%;
	}

	.form-signin .btn {
	  font-size: 80%;
	  border-radius: 5rem;
	  letter-spacing: .1rem;
	  font-weight: bold;
	  padding: 1rem;
	  transition: all 0.2s;
	}
	.btn-google {
	  color: white;
	  background-color: #ea4335;
	}

	.btn-facebook {
	  color: white;
	  background-color: #3b5998;
	}
}
</style>