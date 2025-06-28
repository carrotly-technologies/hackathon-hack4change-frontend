module.exports = {
  overwrite: true,
  schema:'https://h4c-api.rabbithole.carrotly.tech/graphql',
  documents: [
    '**/*.graphql',
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
