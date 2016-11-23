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
            all: {
                files:{
                    'app/static/js/app.min.js':'.tmp/app.js'
                },
                options:{
                    report:'min',
                    mangle:false
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js','client/js/*.js']
        },
        cssmin:{
            options: {
                shorthandCompacting: false,
                roudingPrecision:-1
            },
            all:{
                files:
                {
                    'app/static/css/main.min.css': 'app/static/css/main.css'
                }
            }
        },
        watch :{
            all:{
                files:['Gruntfile.js', 'client/js/*.js','client/stylesheet/*.less','client/templates/*.html'],
                tasks:['clean','jshint', 'concat','uglify', 'less','cssmin' ,'copy'],
                options:{
                    atBegin:true
                }
            },
        },
        copy:{
            main:{
                expand:true,
                cwd:'client/templates',
                src:'*.html',
                dest:'app/static/templates/'
            }
        },
        concat: {
            dist: {
                src: ['client/js/*.js'],
                dest: '.tmp/app.js',
            }
        },
        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'app/static/css/main.min.css',
                        'app/templates/']
                },
                options:{
                    baseDir:'app/templates'
                }
            }
        },
        clean: [".tmp/", "app/static/templates/"],
        less:
        {
            all: {
                options: {
                    compress: true,
                    report:true
                },
                files: {
                    'app/static/css/main.css':'client/stylesheet/*.less'
                    
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
    grunt.loadNpmTasks('grunt-contrib-copy');
     grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['jshint','concat','copy','uglify','less','cssmin']);

};
