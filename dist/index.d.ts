/**
 * Binds all links which targets the own page and have a hash-anchor.
 */
export declare class HashScroll {
    /**
     * @param topOffset Either a number: 'space to top window border' or an element to get the height from before scrolling.
     * @param linkElementsOrSelector Either anchor elements or a selector string link "nav a"
     */
    constructor(topOffsetOrElement?: number | Element, linkElementsOrSelector?: NodeListOf<HTMLAnchorElement> | string);
    /**
     * Space to top window border
     */
    private _topOffset;
    /**
     * Links to watch
     */
    private links;
    /**
     * Setter for 'space to top'
     * @param topOffsetOrElement Either a number: 'space to top window border' or an element to get the height from before
     */
    setTopOffset(topOffsetOrElement: number | Element): this;
    /**
     * Checks if there is an initial hash in url and tries to scroll to the section
     */
    private _checkInitialHash;
    /**
     * Checks, if the hash in href of a link has a target element.
     * @param link
     */
    linkTarget(link: Element): Element | null;
    /**
     * checks all links on page which have a hash to an existing element and binds them to scroll
     */
    private _initLinks;
    /**
     * Scrolls the page to the target element.
     * @param target
     */
    scrollTo(target: Element | null): void;
}
