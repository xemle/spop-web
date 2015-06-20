angular
  .module('app')
  .factory('$elementVisibility', [
    '$window',
    '$document',
    '$rootScope',
    '$timeout',
    'debounce',
    'throttle',
    function($window, $document, $rootScope, $timeout, debounce, throttle) {
      var elements = [],
          newElements = [],
          visibleView = getVisibleView(),
          documentSize = getDocumentSize();

      // from http://www.javascripter.net/faq/browserw.htm
      function getViewport() {
        var width, height;
        if ($document.body && $document.body.offsetWidth) {
          width = $document.body.offsetWidth;
          height = $document.body.offsetHeight;
        } else if ($document.compatMode === 'CSS1Compat' && $document.documentElement && $document.documentElement.offsetWidth ) {
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
        var body = $document[0].body,
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

      function isElementVisible(element, visibleView) {
         return !(element.rect.bottom < visibleView.top ||
            element.rect.top > visibleView.bottom ||
            element.rect.right < visibleView.left ||
            element.rect.left > visibleView.right);
      }

      function getElementRect(element, options) {
        var left, top, right, bottom, rect;
        if (element.offsetLeft) {
          left = element.offsetLeft;
          top = element.offsetTop;
          right = element.offsetLeft + element.offsetWidth;
          bottom = element.offsetTop + element.offsetHeight;
        } else {
          rect = element.getBoundingClientRect();
          left = rect.left;
          top = rect.top;
          right = rect.left + rect.width;
          bottom = rect.top + rect.height;
        }
        return {
          left: left - (options.left || 0),
          top: top - (options.top || 0),
          right: right + (options.right || 0),
          bottom: bottom + (options.bottom || 0)
        };
      }

      /**
       * Evaluate element visibilities and call callback functions
       */
      function evaluateVisiblity() {
        visibleView = getVisibleView();
        angular.forEach(elements, function(e) {
          var isVisible = isElementVisible(e, visibleView);
          if (e.isVisible && !isVisible) {
            e.hide(e.element);
            e.isVisible = isVisible;
          } else if (!e.isVisible && isVisible) {
            e.show(e.element);
            e.isVisible = isVisible;
          }
        });
      }

      function recalculateRects() {
        angular.forEach(elements, function(e) {
          e.rect = getElementRect(e.element, e.options);
        });
      }

      function deferAdd() {
        angular.forEach(newElements, function(e) {
          e.rect = getElementRect(e.element, e.options),
          e.isVisible = isElementVisible(e.rect, visibleView);
          if (e.isVisible) {
            e.show(e.element);
          } else {
            e.hide(e.element);
          }
          elements.push(e);
        });
        newElements = [];
      }

      $window.on('scroll', throttle(function() {
        evaluateVisiblity();
      }, 250, true)).on('resize', debounce(function() {
        recalculateRects();
        evaluateVisiblity();
      }));
      $rootScope.$watch(getDocumentSize, debounce(function() {
        recalculateRects();
        evaluateVisiblity();
      }));

      return {
        /**
         * Add a DOM element to visibility serivce.
         *
         * @param {DOM} element
         * @param {function} showCb Callback function if element becomes visible
         * @param {function} hideCb Callback function if element becomes hidden
         * @param {object} options
         *  - top: Offset of elements top position. E.g. {top: 100} gives reduces
         *    the top position by 100 and the showCb function is called ealier
         *  - left: Offset of elements left position
         *  - right: Offset of elements right position
         *  - bottom: Offset of elements bottom position
         * @returns {function} Function to remove element form visibility check.
         * This is helpful to remove the element from visibility service on
         * scope's destroy function
         */
        add: function(element, showCb, hideCb, options) {
          options = options || {};

          // Evaluation of element rect is expensive. We defer the evaluation
          // on the next event loop to save time for current loop. This have
          // positive impact for larger ng-repeat loops
          if (!newElements.length) {
            $timeout(deferAdd);
          }

          newElements.push({
            element: element,
            options: options,
            rect: false,
            isVisible: false,
            show: showCb,
            hide: hideCb
          });

          return this.remove.bind(this, element);
        },
        /**
         * Remove DOM element from visibility serivce
         *
         * @param {DOM} element
         */
        remove: function(element) {
          elements = elements.filter(function(e) {
            return e.element !== element;
          });
        }
      };
    }
  ]);
