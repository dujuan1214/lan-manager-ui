module.exports = {
  hooks: {
    "pre-commit": "pretty-quick --staged && npm run tslint",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
  },
};
