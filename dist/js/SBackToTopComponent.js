'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

var _SWebComponent2 = _interopRequireDefault(
  require('coffeekraken-sugar/js/core/SWebComponent')
)

var _addEventListener = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/addEventListener')
)

var _scrollTop = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/scrollTop')
)

var _throttle = _interopRequireDefault(
  require('coffeekraken-sugar/js/utils/functions/throttle')
)

var _scrollTo = _interopRequireDefault(
  require('coffeekraken-sugar/js/dom/scrollTo')
)

var _easeInOutQuint = _interopRequireDefault(
  require('coffeekraken-sugar/js/easings/easeInOutQuint')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }
  return _typeof(obj)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return self
}

function _get(target, property, receiver) {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property)
      if (!base) return
      var desc = Object.getOwnPropertyDescriptor(base, property)
      if (desc.get) {
        return desc.get.call(receiver)
      }
      return desc.value
    }
  }
  return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object)
    if (object === null) break
  }
  return object
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

/**
 * Provide an easy to use 'back to top' component that let you total control over the display
 * @example    html
 * <s-back-to-top>
 *   <!-- your back to top display here -->
 * </s-back-to-top>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SBackToTopComponent =
  /*#__PURE__*/
  (function(_SWebComponent) {
    _inherits(SBackToTopComponent, _SWebComponent)

    function SBackToTopComponent() {
      _classCallCheck(this, SBackToTopComponent)

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(SBackToTopComponent).apply(this, arguments)
      )
    }

    _createClass(
      SBackToTopComponent,
      [
        {
          key: 'componentMount',

          /**
           * Mount component
           * @definition    SWebComponent.componentMount
           * @protected
           */
          value: function componentMount() {
            _get(
              _getPrototypeOf(SBackToTopComponent.prototype),
              'componentMount',
              this
            ).call(this)

            this.style.display = 'block' // listen for scroll

            this._removeScrollEventHandler = (0, _addEventListener.default)(
              window,
              'scroll',
              (0, _throttle.default)(this._scrollEventHandler.bind(this), 250)
            ) // listen for click

            this._removeClickEventHandler = (0, _addEventListener.default)(
              this,
              'click',
              this._clickEventHandler.bind(this)
            ) // first check

            this._scrollEventHandler()
          }
          /**
           * Component unmount
           * @definition    SWebComponent.componentUnmount
           * @protected
           */
        },
        {
          key: 'componentUnmount',
          value: function componentUnmount() {
            _get(
              _getPrototypeOf(SBackToTopComponent.prototype),
              'componentUnmount',
              this
            ).call(this)

            if (this._removeScrollEventHandler) this._removeScrollEventHandler()
            if (this._removeClickEventHandler) this._removeClickEventHandler()
          }
          /**
           * Click event handler
           */
        },
        {
          key: '_clickEventHandler',
          value: function _clickEventHandler() {
            // scroll to top
            ;(0, _scrollTo.default)(
              document.body,
              this.props.duration,
              this.props.easing
            )
          }
          /**
           * Scroll event handler
           */
        },
        {
          key: '_scrollEventHandler',
          value: function _scrollEventHandler() {
            // get the displayScrollHeight
            var displayScrollHeight = !this.props.displayScrollHeight
              ? window.innerHeight
              : this.props.displayScrollHeight // check if we have a scroll larger than the display scroll height

            if (
              (0, _scrollTop.default)() > displayScrollHeight &&
              this.isEnabled()
            ) {
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
        },
        {
          key: 'isEnabled',
          value: function isEnabled() {
            if (typeof this.props.enabled === 'function')
              return this.props.enabled()
            return this.props.enabled
          }
        }
      ],
      [
        {
          key: 'defaultCss',

          /**
           * Css
           * @protected
           */
          value: function defaultCss(componentName, componentNameDash) {
            return '\n      '
              .concat(
                componentNameDash,
                ' {\n        display : none;\n        position: fixed;\n        bottom: 0; right: 0;\n        opacity: 0;\n        pointer-events: none;\n        transform: translateY(100%);\n        transition: all 0.4s cubic-bezier(1,0,0,1) 0s;\n      }\n      '
              )
              .concat(
                componentNameDash,
                '[displayed] {\n        opacity: 1;\n        pointer-events: all;\n        transform: translateY(0);\n      }\n    '
              )
          }
        },
        {
          key: 'defaultProps',

          /**
           * Default props
           * @definition    SWebComponent.defaultProps
           * @protected
           */
          get: function get() {
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
              easing: _easeInOutQuint.default,

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
        },
        {
          key: 'physicalProps',
          get: function get() {
            return ['displayed']
          }
        }
      ]
    )

    return SBackToTopComponent
  })(_SWebComponent2.default)

exports.default = SBackToTopComponent
