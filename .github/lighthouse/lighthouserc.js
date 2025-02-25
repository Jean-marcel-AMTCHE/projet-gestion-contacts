module.exports = {
    ci: {
      collect: {
        numberOfRuns: 3,
      },
      assert: {
        preset: 'lighthouse:recommended',
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };
