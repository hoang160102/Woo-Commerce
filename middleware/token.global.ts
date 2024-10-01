export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessToken = useCookie("accessToken").value;
  const refreshToken = useCookie("refreshToken").value;
  if (refreshToken) {
    if (!accessToken) {
      try {
        const response: any = await useFetch("/api/users/auth/refresh", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const accessToken = useCookie("accessToken", {
          maxAge: 300,
          secure: false,
          httpOnly: false,
          path: "/",
        });
        accessToken.value = response.data.value.accessToken;
        const refreshToken = useCookie("refreshToken", {
          maxAge: 365 * 24 * 60 * 60,
          secure: false,
          httpOnly: false,
          path: "/",
        });
        refreshToken.value = response.data.value.newRefreshToken;
        console.log(refreshToken.value + "new token");
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (process.client) {
    setInterval(async () => {
      if (refreshToken) {
        if (!accessToken) {
          try {
            const response: any = await useFetch("/api/users/auth/refresh", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const accessToken = useCookie("accessToken", {
              maxAge: 300,
              secure: false,
              httpOnly: false,
              path: "/",
            });
            accessToken.value = response.data.value.accessToken;
            const refreshToken = useCookie("refreshToken", {
              maxAge: 365 * 24 * 60 * 60,
              secure: false,
              httpOnly: false,
              path: "/",
            });
            refreshToken.value = response.data.value.newRefreshToken;
            console.log(refreshToken.value + "new token");
          } catch (err) {
            console.log(err);
          }
        }
      }
    }, 10000 * 30);
  }
});
