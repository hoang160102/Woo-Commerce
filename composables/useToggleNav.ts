export default function (width: number) {
  const isShowNav = ref<boolean>(false);
  const toggleMenu = (): void => {
    isShowNav.value = true;
  };
  const handleClickOutside = (): void => {
    isShowNav.value = false;
  };
  const resizeWindow = (): void => {
    window.addEventListener("resize", (): void => {
      if (window.innerWidth > width) {
        isShowNav.value = false;
      }
    });
  };
  return {
    isShowNav,
    toggleMenu,
    handleClickOutside,
    resizeWindow,
  };
}
