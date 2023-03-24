/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/js/PostFetcher.js":
/*!**************************************!*\
  !*** ./assets/src/js/PostFetcher.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostFetcher)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PostFetcher = /*#__PURE__*/function () {
  function PostFetcher() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PostFetcher);

    this.defaults = {
      post_type: 'post',
      taxonomy: 'category',
      categories: '',
      // comma separated list of category slugs: 'test,another-test'
      per_page: 10,
      current_page: 1,
      image_size: 'thumbnail',
      show_excerpt: false // false shows full content

    }; // Merge the default values with the provided arguments

    this.options = _objectSpread(_objectSpread({}, this.defaults), args);
    this.taxListeners();
    this.paginationListeners();
  }

  _createClass(PostFetcher, [{
    key: "fetchPosts",
    value: function fetchPosts() {
      var _this = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // Update the options with any new arguments provided
      this.options = _objectSpread(_objectSpread({}, this.options), args);
      console.log(this.options); // Create a URL object and append the search parameters

      var url = new URL('/wp-content/plugins/ru-post-archive/ajax-tips.php', window.location.origin);

      for (var key in this.options) {
        url.searchParams.append(key, this.options[key]);
      } // Make a Fetch request to the PHP file


      fetch(url).then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.text();
      }).then(function (html) {
        // Update the content of a DOM element with the response
        document.querySelector('#ru-post-archive').innerHTML = html; // Add click event to pagination links

        document.querySelectorAll('.pagination-link').forEach(function (link) {
          link.addEventListener('click', function (e) {
            e.preventDefault();
            var page = e.currentTarget.getAttribute('data-page');

            _this.fetchPosts({
              current_page: page
            });
          });
        });
      })["catch"](function (error) {
        console.error('An error occurred while fetching the posts:', error);
      });
    }
  }, {
    key: "taxListeners",
    value: function taxListeners() {
      var _this2 = this;

      jQuery('#ru-post-archive').on('click', '.post-category', function (event) {
        event.preventDefault();
        _this2.options.current_page = 1; // if data-filter-multi="true" add the category else replace the category

        if (jQuery(event.currentTarget).data('filter-multi') === true) {
          var previousCategories = _this2.options.categories ? _this2.options.categories + ',' : '';
          var newCategory = jQuery(event.currentTarget).data('category-slug');
          _this2.options.categories = previousCategories + newCategory;
        } else {
          _this2.options.categories = jQuery(event.currentTarget).data('category-slug');
        }

        _this2.fetchPosts();
      });
    }
  }, {
    key: "paginationListeners",
    value: function paginationListeners() {
      var _this3 = this;

      jQuery('#ru-post-archive').on('click', '.pagination-link', function (event) {
        event.preventDefault();
        var pageNumber = jQuery(event.currentTarget).data('page');
        _this3.options.current_page = pageNumber;

        _this3.fetchPosts();
      });
    }
  }]);

  return PostFetcher;
}();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./assets/src/js/index.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostFetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostFetcher */ "./assets/src/js/PostFetcher.js");

var postFetcher = new _PostFetcher__WEBPACK_IMPORTED_MODULE_0__["default"]({
  post_type: 'tips',
  taxonomy: 'tips_category',
  categories: '',
  // comma separated list of category slugs: 'test,another-test'
  per_page: 3,
  image_size: 'thumbnail',
  show_excerpt: false // false shows full content

});
postFetcher.fetchPosts();
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*************************************!*\
  !*** ./assets/src/scss/styles.scss ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map