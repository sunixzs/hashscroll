"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashScroll = void 0;
/**
 * Binds all links which targets the own page and have a hash-anchor.
 */
var HashScroll = /** @class */ (function () {
    /**
     * @param topOffset Either a number: 'space to top window border' or an element to get the height from before scrolling.
     * @param linkElementsOrSelector Either anchor elements or a selector string link "nav a"
     */
    function HashScroll(topOffsetOrElement, linkElementsOrSelector) {
        if (topOffsetOrElement === void 0) { topOffsetOrElement = 0; }
        if (linkElementsOrSelector === void 0) { linkElementsOrSelector = "a"; }
        this._topOffset = topOffsetOrElement;
        this.links =
            typeof linkElementsOrSelector === "string"
                ? document.querySelectorAll(linkElementsOrSelector)
                : linkElementsOrSelector;
        this._checkInitialHash();
        this._initLinks();
    }
    /**
     * Setter for 'space to top'
     * @param topOffsetOrElement Either a number: 'space to top window border' or an element to get the height from before
     */
    HashScroll.prototype.setTopOffset = function (topOffsetOrElement) {
        this._topOffset = topOffsetOrElement;
        return this;
    };
    /**
     * Checks if there is an initial hash in url and tries to scroll to the section
     */
    HashScroll.prototype._checkInitialHash = function () {
        // scroll to position when target is set in url
        if (location && location.hash) {
            var target_1 = document.querySelector(location.hash);
            if (!target_1) {
                return;
            }
            // give the page a litte bit time
            var _this_1 = this;
            window.setTimeout(function () {
                _this_1.scrollTo(target_1);
            }, 1000);
        }
    };
    /**
     * Checks, if the hash in href of a link has a target element.
     * @param link
     */
    HashScroll.prototype.linkTarget = function (link) {
        var href = link.hasAttribute("href") ? link.getAttribute("href") : "";
        if (!href) {
            return null;
        }
        var hrefSplit = href.split("#");
        if (!hrefSplit[1]) {
            return null;
        }
        var target = document.querySelector("#" + hrefSplit[1]);
        if (!target) {
            return null;
        }
        return target;
    };
    /**
     * checks all links on page which have a hash to an existing element and binds them to scroll
     */
    HashScroll.prototype._initLinks = function () {
        var _this = this;
        for (var l = 0; l < this.links.length; l++) {
            if (!this.linkTarget(this.links[l])) {
                continue;
            }
            this.links[l].addEventListener("click", function (event) {
                var target = _this.linkTarget(this);
                if (target) {
                    event.preventDefault();
                    _this.scrollTo(target);
                }
            }, false);
        }
    };
    /**
     * Scrolls the page to the target element.
     * @param target
     */
    HashScroll.prototype.scrollTo = function (target) {
        if (!target) {
            return;
        }
        var top = target.getBoundingClientRect().top;
        top += window.scrollY;
        if (this._topOffset) {
            top -=
                typeof this._topOffset === "number"
                    ? this._topOffset
                    : this._topOffset.clientHeight;
        }
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    };
    return HashScroll;
}());
exports.HashScroll = HashScroll;
