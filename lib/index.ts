/**
 * Binds all links which targets the own page and have a hash-anchor.
 */
export class HashScroll {
    /**
     * @param topOffset Either a number: 'space to top window border' or an element to get the height from before scrolling.
     * @param linkElementsOrSelector Either anchor elements or a selector string link "nav a"
     */
    constructor(
        topOffsetOrElement: number | Element = 0,
        linkElementsOrSelector: NodeListOf<HTMLAnchorElement> | string = "a"
    ) {
        this._topOffset = topOffsetOrElement;
        this.links =
            typeof linkElementsOrSelector === "string"
                ? document.querySelectorAll(linkElementsOrSelector)
                : linkElementsOrSelector;
        this._checkInitialHash();
        this._initLinks();
    }

    /**
     * Space to top window border
     */
    private _topOffset: number | Element;

    /**
     * Links to watch
     */
    private links: NodeListOf<HTMLAnchorElement>;

    /**
     * Setter for 'space to top'
     * @param topOffsetOrElement Either a number: 'space to top window border' or an element to get the height from before
     */
    public setTopOffset(topOffsetOrElement: number | Element): this {
        this._topOffset = topOffsetOrElement;
        return this;
    }

    /**
     * Checks if there is an initial hash in url and tries to scroll to the section
     */
    private _checkInitialHash(): void {
        // scroll to position when target is set in url
        if (location && location.hash) {
            let target = document.querySelector(location.hash);
            if (!target) {
                return;
            }

            // give the page a litte bit time
            let _this = this;
            window.setTimeout(function () {
                _this.scrollTo(target);
            }, 1000);
        }
    }

    /**
     * Checks, if the hash in href of a link has a target element.
     * @param link
     */
    public linkTarget(link: Element): Element | null {
        let href = link.hasAttribute("href") ? link.getAttribute("href") : "";
        if (!href) {
            return null;
        }

        let hrefSplit = href.split("#");
        if (!hrefSplit[1]) {
            return null;
        }

        let target = document.querySelector("#" + hrefSplit[1]);
        if (!target) {
            return null;
        }

        return target;
    }

    /**
     * checks all links on page which have a hash to an existing element and binds them to scroll
     */
    private _initLinks(): void {
        let _this = this;
        for (let l = 0; l < this.links.length; l++) {
            if (!this.linkTarget(this.links[l])) {
                continue;
            }

            this.links[l].addEventListener(
                "click",
                function (event: Event) {
                    let target = _this.linkTarget(this);
                    if (target) {
                        event.preventDefault();
                        _this.scrollTo(target);
                    }
                },
                false
            );
        }
    }

    /**
     * Scrolls the page to the target element.
     * @param target
     */
    public scrollTo(target: Element | null): void {
        if (!target) {
            return;
        }
        let top: number = target.getBoundingClientRect().top;
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
    }
}
