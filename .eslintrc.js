module.exports = {
  extends: [require.resolve('eslint-config-ali/typescript/react')],
  rules: {
    'import/no-cycle': 0,
    'react/prop-types': 0,
    'generator-star-spacing': 0,
  },
};
