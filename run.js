const { execSync } = require('child_process');

(async () => {
	try {
		await execSync('git pull')
		await execSync('git add menu-memory/*.json')
		await execSync('git commit -m "Save Memory"')
		await execSync('git push')
	} catch (e) {
		console.log(e)
	}
	await execSync('npm ci')
	await require('./deploy-commands.js')
	await require('./index.js')
})();

