const sonarqubeScanner = require('sonarqube-scanner');

require('dotenv').config();
const token = process.env.REACT_APP_SONAR_TOKEN;

sonarqubeScanner({
	serverUrl: 'https://sonarcloud.io',
	token: token,
	options: {
		'sonar.sources': 'src',
		'sonar.exclusions': 'src/tests/**',
		'sonar.tests': 'src/tests',
		'sonar.test.inclusions':
			'src/tests/**/*.test.tsx,./src/tests/**/*.test.ts',
		'sonar.coverage.exclusions':
			'src/tests/components/**/*,src/tests/components/**/*',
		'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
		'sonar.testExecutionReportPaths': 'reports/test-report.xml',
		'sonar.organization': 'eccoar',
		'sonar.projectKey': 'Eccoar_2020.2-eccoar_front-end',
	},
});