import { css } from 'docz-plugin-css';

export default {
  title: 'React Morph - Docs',
  typescript: true,
	files: 'docs/**/*.{md,markdown,mdx}',
	public: 'docs/public',
  plugins: [
    css({ preprocessor: 'postcss' }),
  ],
  themeConfig: {
    styles: {
      container: {
        width: ['100%', '100%', 1920],
        padding: ['20px', '0 40px 40px'],
      },
    },
    ordering: 'ascending',
    colors: {
      primary: '#00C0FF',
    },
  },
};
