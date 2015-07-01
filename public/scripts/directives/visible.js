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
              options = optionsExpr(scope) || {},
              element = $element[0];

          function onShow() {
            showExp(scope);
          }
          function onHide() {
            hideExp(scope);
          }

          $elementVisibility.add(element, onShow, onHide, options);

          scope.$on('$destroy', function() {
            $elementVisibility.remove(element);
          });
        }
      };
    }
  ]);
