export default defineNuxtRouteMiddleware((to, from) => {
    const user: any = useCookie("currentUser").value
    if (!user?.isAdmin) {
        return useRouter().push('/'); // Redirect to home or an error page if not admin
      }
    else {
        console.log(user.isAdmin)
    }
})