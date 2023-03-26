rm -rf /Users/docheck/Desktop/coba/allure-results/*
npx wdio
rm -rf /Users/docheck/Desktop/coba/allure-report/*
npx allure generate allure-results
npx allure open
