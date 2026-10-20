import nextConfig from 'eslint-config-next'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // Archive du site d'origine (code du collègue, conservé comme source) : hors lint.
  { ignores: ['docs/legacy-v0/**'] },
  ...nextConfig,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Convention standard : paramètres préfixés _ sont intentionnellement inutilisés
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
]

export default eslintConfig
