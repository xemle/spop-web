angular
  .module('app')
  .directive('visible', [
    '$parse',
    '$elementVisibility',
    function($parse, $elementVisibility) {
      return {
        link: function(scope, $element, attrs) {
          var showExp = $parse(attrs.visible || attrs.onShow),
              hideExp = $parse(attrs.onHide),
              optionsExpr = $parse(attrs.visibleOptions),
              options = optionsExpr(scope) || {};

          function onShow() {
            console.log('show', scope.$id, scope);
            showExp(scope);
          }
          function onHide() {
            hideExp(scope);
          }

          $elementVisibility.add($element[0], onShow, onHide, options);

          scope.$on('$destroy', function() {
            $elementVisibility.remove($element[0]);
          });
        }
      };
    }
  ]);
