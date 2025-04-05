const { default: sonarqubeScanner } = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000', 
    token: 'sqp_dd362436330569c00b0881c3b4056028a6751ede', 
    options: {
      'sonar.projectKey': 'Frontend', 
      'sonar.projectName': 'Frontend', 
      'sonar.sources': 'src', 
      'sonar.exclusions': 'src/**/*.test.js', 
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info', 
    },
  },
  () => {
    console.log('SonarQube analysis completed');
    process.exit();
  }
);
