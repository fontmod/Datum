module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),
		jshint: {

			all: "src/*.js"
		},
		jscs: {

			src: "src/*.js",
			options: {

				config: ".jscsrc",
 				esnext: false,
				verbose: true,
				fix: false,
				requireCurlyBraces: []
			}
		},
		concat: {

			options: {

				separator: "\n",
			},
			dist: {

				src: [

					"src/Registry.js", 
					"src/Subscriber.js", 
					"src/UniqueRoot.js", 
					"src/*.js"
				],
				dest: "target/Datum.js"
			}
		},
		uglify: {

			my_target: {

				files: {

					"target/Datum.min.js": [
		
						"src/Registry.js",
						"src/Subscriber.js", 
						"src/UniqueRoot.js", 
						"src/*.js"
					]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint", "jscs", "concat", "uglify"]);
};
