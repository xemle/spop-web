angular
  .module('app')
  .factory('$elementVisibility', [
    '$window',
    '$document',
    '$rootScope',
    'debounce',
    'throttle',
    function($window, $document, $rootScope, debounce, throttle) {
      var elements = [],
          visibleView = getVisibleView(),
          documentSize = getDocumentSize();

      // from http://www.javascripter.net/faq/browserw.htm
      function getViewport() {
        var width, height;
        if ($document.body && $document.body.offsetWidth) {
          width = $document.body.offsetWidth;
          height = $document.body.offsetHeight;
        } else if ($document.compatMode === 'CSS1Compat' &&    $document.documentElement && $document.documentElement.offsetWidth ) {
          width = $document.documentElement.offsetWidth;
          height = $document.documentElement.offsetHeight;
        } else if ($window.innerWidth && $window.innerHeight) {
          width = $window.innerWidth;
          height = $window.innerHeight;
        }
        return {
          width: width,
          height: height
        };
      };

      function getScrollPosition() {
        var top, left;
        if ($window.hasOwnProperty('pageXOffset')) {
          left = $window.pageXOffset;
          top = $window.pageYOffset;
        } else if ($document.documentElement && $document.documentElement.scrollLeft) {
          left = $document.documentElement.scrollLeft;
          top = $document.documentElement.scrollRight;
        }
        return {
          left: left,
          top: top
        };
      };

      function getVisibleView() {
        var viewport = getViewport(),
            scroll = getScrollPosition();
        return {
          left: scroll.left,
          top: scroll.top,
          right: scroll.left + viewport.width,
          bottom: scroll.top + viewport.height
        };
      }

      function getDocumentSize() {
        var d = $document[0],
            body = d.body,
            width, height;
        if (body.offsetHeight) {
          height = body.offsetHeight;
          width = body.offsetWidth;
        }
        if (!documentSize || documentSize.width !== width || documentSize.height !== height) {
          documentSize = {
            height: height,
            width: width
          };
        }
        return documentSize;
      }

      function isRectVisible(rect, visibleView) {
         return !(rect.bottom < visibleView.top ||
            rect.top > visibleView.bottom ||
            rect.right < visibleView.left ||
            rect.left > visibleView.right);
      }

      function getElementRect(element, options) {
        options = options || {};
        var left, top, right, bottom, rect;
        if (element.offsetLeft) {
          left = element.offsetLeft - (options.left || 0);
          top = element.offsetTop - (options.top || 0);
          right = element.offsetLeft + element.offsetWidth + (options.right || 0);
          bottom = element.offsetTop + element.offsetHeight + (options.bottom || 0);
        } else {
          rect = element.getBoundingClientRect();
          left = rect.left - (options.left || 0);
          top = rect.top - (options.top || 0);
          right = rect.left + rect.width + (options.right || 0);
          bottom = rect.top + rect.height + (options.bottom || 0);
        }
        return {
          left: left,
          top: top,
          right: right,
          bottom: bottom
        };
      }

      function evaluate() {
        visibleView = getVisibleView();
        angular.forEach(elements, function(e) {
          var isVisible = isRectVisible(e.rect, visibleView);
          if (e.isVisible && !isVisible) {
            e.hide(e.element);
            e.isVisible = isVisible;
          } else if (!e.isVisible && isVisible) {
            e.show(e.element);
            e.isVisible = isVisible;
          }
        });
      }

      function calculateRects() {
        angular.forEach(elements, function(e) {
          e.rect = getElementRect(e.element, e.options);
        })
      }

      angular.element($window).on('scroll', throttle(function() {
        evaluate();
      }, 250, true)).on('resize', debounce(function() {
        calculateRects();
        evaluate();
      }));
      $rootScope.$watch(getDocumentSize, debounce(function() {
        calculateRects();
        evaluate();
      }));

      return {
        add: function(element, showCb, hideCb, options) {
          options = options || {};
          var rect = getElementRect(element, options),
              isVisible = isRectVisible(rect, visibleView);

          elements.push({
            element: element,
            options: options,
            rect: rect,
            show: showCb,
            hide: hideCb,
            isVisible: isVisible
          });
          if (isVisible) {
            showCb(element);
          } else {
            hideCb(element);
          }
        },
        remove: function(element) {
          elements = elements.filter(function(e) {
            return e.element !== element;
          });
        }
      };
    }
  ]);
