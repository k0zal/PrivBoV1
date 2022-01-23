
const sizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    tabletC: "863px",
    laptop: '1080px',
    laptopM: "1280px",
    laptopL: '1440px',
    desktopM: "1920px",
    desktop: '2560px',
    desktopL: "3840px",
  };



    const device = {
    primaryFont: "Titillium Web, sans-serif",
    primaryBlue: "rgb(87, 124, 246)",
    mobileS: `(max-width: ${sizes.mobileS})`,
    tabletC: `(max-width: ${sizes.mobileS})`,
    mobileM: `(max-width: ${sizes.mobileM})`,
    mobileL: `(max-width: ${sizes.mobileL})`,
    tablet: `(max-width: ${sizes.tablet})`,
    laptop: `(max-width: ${sizes.laptop})`,
    laptopL: `(mAX-width: ${sizes.laptopL})`,
    desktop: `(max-width: ${sizes.desktop})`,
    desktopM: `(max-width: ${sizes.desktop})`,
    desktopL: `(max-width: ${sizes.desktopL})`,
  };

  export default device