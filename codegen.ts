module.exports = {
  overwrite: true,
  schema:'https://countries.trevorblades.com/graphql',
  documents: [
    '*/**/*.graphql',
  ],
  generates: {
    'src/api/__generated__/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ]
    }
  }
};
