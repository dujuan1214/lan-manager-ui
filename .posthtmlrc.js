module.exports = {
  plugins: {
    "posthtml-include": { root: "src" },
    "posthtml-git-describe": { longSemver: true },
  },
};
