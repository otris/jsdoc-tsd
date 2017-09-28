module.exports = function(grunt) {
	grunt.initConfig({
		jsdoc: {
			default: {
				src: "exampleProject",
				options: {
					destination: "dist/docs",
					recurse: true
				}
			}
		}
	});

	// Load NPM tasks
	grunt.loadNpmTasks("grunt-jsdoc");

	// Register tasks
	grunt.registerTask("jsdoc", "jsdoc");
};
