// next.config.js
const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
  reactStrictMode: true,
  swcMinify: true, 
});

module.exports = {
  images: {
    unoptimized: true, 
  },
};
