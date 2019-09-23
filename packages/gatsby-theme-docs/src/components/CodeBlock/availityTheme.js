export default {
  plain: {
    backgroundColor: '#f8f8f8',
    color: '#232323',
    fontSize: 13,
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
  },
  styles: [
    {
      types: ['comment', 'doctype', 'cdata', 'prolog'],
      style: {
        color: '#93a1a1',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#999999',
      },
    },
    {
      types: [
        'property',
        'tag',
        'boolean',
        'number',
        'constant',
        'symbol',
        'deleted',
      ],
      style: {
        color: '#990055',
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: '#669900',
      },
    },
    {
      types: ['operator', 'entity', 'url'],
      style: {
        color: '#a67f59',
      },
    },
    {
      types: ['attr-value'],
      style: {
        color: '#0077aa',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#dd4a68',
      },
    },
    {
      types: ['regex', 'important', 'variable'],
      style: {
        color: '#ee9900',
      },
    },
  ],
};
