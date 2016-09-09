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

      jshint:{
          options:{
              reporter: require('jshint-stylish')
          },
          build: ['Gruntfile.js', 'app/gallery/static/js/*.js']
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

};
