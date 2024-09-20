<template>
  <div class="verification-page">
    <div v-if="loading" class="loading-message">Verifying your email...</div>

    <div v-if="!loading && success" class="success-message">
      <h2>Email Verified Successfully!</h2>
      <p>Your email has been successfully verified. You can now log in.</p>
      <button @click="goToLogin" class="login-button">Go to Login</button>
    </div>

    <div v-if="!loading && !success" class="error-message">
      <h2>Verification Failed</h2>
      <p>{{ message }}</p>
      <button @click="goToHome" class="home-button">Go to Home</button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const success = ref(false);
const message = ref("");
const loading = ref(true);
async function run() {
  const token = route.query.auth;
  if (!token) {
    message.value = "Token is missing.";
    loading.value = false;
    return;
  }

  try {
    const { data, error } = await useFetch(`/api/users/auth/verify?token=${token}`);
    if (data.value.success) {
      success.value = true;
      message.value = data.value.message;
    } else {
      success.value = false;
      message.value = data.value.message;
    }
  } catch (error) {
    success.value = false;
    message.value = "An error occurred. Please try again later.";
  }

  loading.value = false;
}
run()

const goToLogin = () => {
  router.push("/login");
};

const goToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.verification-page {
  text-align: center;
  padding: 50px;
}

.loading-message {
  font-size: 20px;
}

.success-message,
.error-message {
  margin-top: 20px;
}

.login-button,
.home-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.login-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
}

.home-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
