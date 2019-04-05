const fonts = `
  @font-face {
    font-family: 'RoadRage';
    src: url('${
      process.env.STATIC_LOCATION
    }/fonts/RoadRage.otf') format("opentype"),
          url('${
            process.env.STATIC_LOCATION
          }/fonts/RoadRage.woff2') format('woff2'),
          url('${
            process.env.STATIC_LOCATION
          }/fonts/RoadRage.woff') format('woff'),
          url('${
            process.env.STATIC_LOCATION
          }/fonts/RoadRage.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

export default fonts;
