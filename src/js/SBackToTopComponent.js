import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import addEventListener from 'coffeekraken-sugar/js/dom/addEventListener'
import scrollTop from 'coffeekraken-sugar/js/dom/scrollTop'
import throttle from 'coffeekraken-sugar/js/utils/functions/throttle'
import scrollTo from 'coffeekraken-sugar/js/dom/scrollTo'
import easeInOutQuint from 'coffeekraken-sugar/js/easings/easeInOutQuint'

/**
 * Provide an easy to use 'back to top' component that let you total control over the display
 * @example    html
 * <s-back-to-top>
 *   <!-- your back to top display here -->
 * </s-back-to-top>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SBackToTopComponent extends SWebComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
    return {
      /**
       * Specify the display scroll height. This is the scroll amount after which the 'back to top' component will be displayed.
       * If this is `null`, the innerHeight of the window will be used
       * @prop
       * @type    {Integer}
       */
      displayScrollHeight: null,

      /**
       * Specify if the 'back to top' component is displayed or not.
       * This property if managed by the component itself and it's a 'physicalProp' to
       * simplify the styling
       * @prop
       * @type    {Boolean}
       */
      displayed: false,

      /**
       * Specify the scroll duration in ms
       * @prop
       * @type    {Integer}
       */
      duration: 500,

      /**
       * Specify an easing function to use for the scroll
       * @prop
       * @type    {Function}
       */
      easing: easeInOutQuint,

      /**
       * Specify if the component is enabled or not. Useful if you don't want the back-to-top component on mobile for example.
       * @prop
       * @type    {Boolean|Function}
       */
      enabled: true
    }
  }

  /**
   * Physical props
   * @definition    SWebComponent.physicalProps
   * @protected
   */
  static get physicalProps() {
    return ['displayed']
  }

  /**
   * Css
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display : none;
        position: fixed;
        bottom: 0; right: 0;
        opacity: 0.0001;
        pointer-events: none;
        transform: translateY(100%);
        transition: all 0.4s cubic-bezier(1,0,0,1) 0s;
      }
      ${componentNameDash}[displayed] {
        opacity: 1;
        pointer-events: all;
        transform: translateY(0);
      }
    `
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount() {
    super.componentMount()

    this.style.display = 'block'

    // listen for scroll
    this._removeScrollEventHandler = addEventListener(
      window,
      'scroll',
      throttle(this._scrollEventHandler.bind(this), 250)
    )

    // listen for click
    this._removeClickEventHandler = addEventListener(
      this,
      'click',
      this._clickEventHandler.bind(this)
    )

    // first check
    this._scrollEventHandler()
  }

  /**
   * Component unmount
   * @definition    SWebComponent.componentUnmount
   * @protected
   */
  componentUnmount() {
    super.componentUnmount()
    if (this._removeScrollEventHandler) this._removeScrollEventHandler()
    if (this._removeClickEventHandler) this._removeClickEventHandler()
  }

  /**
   * Click event handler
   */
  _clickEventHandler() {
    // scroll to top
    scrollTo(document.body, this.props.duration, this.props.easing)
  }

  /**
   * Scroll event handler
   */
  _scrollEventHandler() {
    // get the displayScrollHeight
    const displayScrollHeight = !this.props.displayScrollHeight
      ? window.innerHeight
      : this.props.displayScrollHeight
    // check if we have a scroll larger than the display scroll height
    if (scrollTop() > displayScrollHeight && this.isEnabled()) {
      if (!this.props.displayed) {
        this.setProp('displayed', true)
      }
    } else if (this.props.displayed) {
      this.setProp('displayed', false)
    }
  }

  /**
   * Check if is enabled or not
   * @return    {Boolean}    true if enabled, false if not
   */
  isEnabled() {
    if (typeof this.props.enabled === 'function') return this.props.enabled()
    return this.props.enabled
  }
}
