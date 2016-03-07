module.exports = function (grunt) {

	// Config
	grunt.initConfig({

		// watch
		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				options: {reload: true}
			},
			js: {
				files: ['app/*.coffee', 'app/components/**/*.coffee', 'app/shared/**/*.coffee'],
				tasks: ['coffee'],
				options: {livereload: true}
			},
			css: {
				files: ['app/assets/css/*.scss'],
				tasks: ['sass'],
				options: {livereload: true}
			},
			html: {
				files: ['app/*.html',  'app/shared/**/*.html', 'app/components/**/*.html'],
				options: {livereload: true}
			}
		},

		// coffee
		coffee: {
			compile: {
				files: {
					'app/assets/js/app.js' : ['app/*.coffee', 'app/components/**/*.coffee', 'app/shared/**/*.coffee']
				}
			}
		},

		// sass
		sass: {
			dist: {
				options: {
					update: true
				},
				files: {
					'app/assets/css/main.css' : 'app/assets/css/main.scss'
				}
			}
		},

		// connect (server)
		connect: {
			server: {
				options: {
					port: 8989,
					host: 'localhost',
					base: 'app/',
					keepalive: true,
					open: 'localhost:8989/app/index.html'
				}
			}
		},

		// concurrent (simultaneuos tasks)
		concurrent: {
			build: {
				tasks: ['connect:server', 'watch'], 
				options: {
					logConcurrentOutput: true
				}
			}
		}
	})
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-connect');


	grunt.registerTask('default', ['coffee', 'sass'])
	grunt.registerTask('serve', ['default', 'concurrent:build'])

}