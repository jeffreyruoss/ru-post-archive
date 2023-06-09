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
      show_excerpt: false,
      // false shows full content
      ajax_url: ''
    }; // Merge the default values with the provided arguments

    this.options = _objectSpread(_objectSpread({}, this.defaults), args);
    this.archiveListeners();
  }

  _createClass(PostFetcher, [{
    key: "fetchPosts",
    value: function fetchPosts() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // Update the options with any new arguments provided
      this.options = _objectSpread(_objectSpread({}, this.options), args); // Check for query parameters in the URL

      var queryParams = new URLSearchParams(window.location.search); // Override options with query parameters if they exist

      if (queryParams.has('categories')) {
        this.options.categories = queryParams.get('categories');
      }

      if (queryParams.has('current_page')) {
        this.options.current_page = parseInt(queryParams.get('current_page'), 10);
      } // Create a URL object and append the search parameters


      var url = new URL(this.options.ajax_url, window.location.origin);

      for (var key in this.options) {
        url.searchParams.append(key, this.options[key]);
      } // Make a Fetch request to the PHP file


      fetch(url).then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.text();
      }).then(function (html) {
        var ruPostArchive = document.querySelector("#ru-post-archive");
        var postElements = ruPostArchive.querySelectorAll(".ru-archive__post"); // Add the "hidden" class to the existing post elements

        postElements.forEach(function (element) {
          element.classList.add("hidden");
        }); // Wait for the fade-out transition to complete

        setTimeout(function () {
          // Update the content of the DOM element with the response
          ruPostArchive.innerHTML = html; // Remove the "hidden" class from the new post elements after a short delay

          var newPostElements = ruPostArchive.querySelectorAll(".ru-archive__post");
          newPostElements.forEach(function (element) {
            setTimeout(function () {
              element.classList.remove("hidden");
            }, 50);
          });
        }, 100);
      })["catch"](function (error) {
        console.error('An error occurred while fetching the posts:', error);
      });
    }
  }, {
    key: "archiveListeners",
    value: function archiveListeners() {
      var _this = this;

      var postArchive = document.getElementById("ru-post-archive");
      postArchive.addEventListener("click", function (event) {
        var target = event.target;
        event.preventDefault(); // Check if the target matches the '.post-category' selector

        if (target.closest(".post-category") || target.closest(".post-category span.close-x")) {
          _this.handleCategoryClick(target);
        } // Check if the target matches the '.pagination-link' selector
        else if (target.closest(".pagination-link")) {
          _this.handlePaginationClick(target);
        }
      });
    }
  }, {
    key: "handleCategoryClick",
    value: function handleCategoryClick(target) {
      // if target has class close-x, set target to parent
      if (target.classList.contains("close-x")) {
        target = target.parentNode;
      }

      if (target.classList.contains("post-category")) {
        event.preventDefault();
        this.options.current_page = 1; // if data-filter-multi="true" add the category else replace the category

        if (target.dataset.filterMulti === "true") {
          var newCategory = target.dataset.categorySlug;
          var categoriesArray = this.options.categories ? this.options.categories.split(",") : []; // Check if the category is already in the categories array

          var categoryIndex = categoriesArray.indexOf(newCategory);

          if (categoryIndex === -1) {
            // If it's not in the array, add it
            categoriesArray.push(newCategory);
          } else {
            // If it's already in the array, remove it
            categoriesArray.splice(categoryIndex, 1);
          } // Convert the array back to a comma-separated string


          this.options.categories = categoriesArray.join(",");
        } else {
          this.options.categories = target.dataset.categorySlug;
        }

        this.updateUrl();
        this.fetchPosts();
      }
    }
  }, {
    key: "handlePaginationClick",
    value: function handlePaginationClick(target) {
      if (target.classList.contains("pagination-link")) {
        event.preventDefault();
        var pageNumber = parseInt(target.dataset.page, 10);
        this.options.current_page = pageNumber;
        this.updateUrl();
        this.fetchPosts();
      }
    }
  }, {
    key: "updateUrl",
    value: function updateUrl() {
      var url = new URL(window.location.href);
      var params = new URLSearchParams(url.search);
      params.set('categories', this.options.categories);
      params.set('current_page', this.options.current_page);
      url.search = params.toString();
      window.history.pushState({}, '', url);
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
  show_excerpt: false,
  // false shows full content
  ajax_url: '/wp-content/plugins/ru-post-archive/ajax-tips.php'
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