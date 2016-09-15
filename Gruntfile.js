// Gruntfile.js
// наша функция-обёртка (требуется для Grunt и его плагинов)
// все настройки располагаются внутри этой функции
module.exports = function(grunt) {

    // ===========================================================================
    // НАСТРОЙКА GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({
        // получить конфигурацию из package.json 
        // так мы можем использовать штуки вроде name и version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // вся наша конфигурация будет здесь
        
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files:{
                    'app/static/js/main.min.js':'app/assets/js/*.js'
                }
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js','app/assets/js/*.js']
        },
        cssmin:{
            options: {
                shorthandCompacting: false,
                roudingPrecision:-1
            },
            target:{
                files:
                {
                    'app/static/css/main.min.css': 'app/assets/stylesheet/main.css'
                }
            }
        },
        less:
        {
            development: {
                options: {
                    compress: true,
                    report:true
                },
                files: {
                    'app/assets/stylesheet/main.css':'app/assets/stylesheet/main.less'
                    
                }
            }
        }
    });
    
    // ===========================================================================
    // ЗАГРУЗКА ПЛАГИНОВ GRUNT ===================================================
    // ===========================================================================
    // мы можем их загрузить, только если они находятся в нашем package.json
    // убедитесь, что вы запустили npm install, чтобы наше приложение могло их найти
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('main-bower-files');

    grunt.registerTask('default', ['jshint']);

};
