module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
    'max-len': [2, 150, 4], // increase page width
    semi: [2, 'never'], // remove semicolons
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off', // Next.js magically includes
    'react/jsx-one-expression-per-line': 'off', // too vertical
  },
  env: {
    jest: true,
  },
}
