export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only
        'style',    // Formatting changes (whitespace, semicolons, etc)
        'refactor', // Code refactoring without functionality changes
        'perf',     // Performance improvements
        'test',     // Add or modify tests
        'chore',    // Maintenance (deps, config, build)
        'revert',   // Revert previous commit
        'ci',       // CI/CD changes
      ],
    ],
    'subject-case': [0], // Disable case validation
    'header-max-length': [2, 'always', 100],
  },
};
