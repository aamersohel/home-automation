<script setup lang="ts">
const router = useRouter();

const errorMessage = ref("");

const loginInfo = reactive({
  appId: "",
  name: "",
  password: "",
});

async function signIn() {
  try {
    const { token } = await $fetch("/api/auth/login", {
      method: "POST",
      body: loginInfo,
    });
    localStorage.setItem("Authorization", "Bearer " + token);
    await router.replace("/");
  } catch (e) {
    errorMessage.value = "Invalid credentials, please try again";
  }
}
</script>

<template>
  <div class="text-center">
    <form class="form-signin" @submit.prevent="signIn">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input
        v-model="loginInfo.appId"
        type="text"
        id="inputApp"
        class="form-control"
        placeholder="App"
        required
        autofocus
      />
      <input
        v-model="loginInfo.name"
        type="text"
        id="inputUser"
        class="form-control"
        placeholder="User"
        required
        autofocus
      />
      <input
        v-model="loginInfo.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />

      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>

      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021-2022</p>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
#inputApp {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

#inputUser {
  border-radius: 0;
  margin-bottom: -1px;
}

#inputPassword {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

button {
  width: 100%;
}
</style>
