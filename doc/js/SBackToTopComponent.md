# SBackToTopComponent

Provide an easy to use 'back to top' component that let you total control over the display

### Example

```html
<s-back-to-top>
  <!-- your back to top display here -->
</s-back-to-top>
```

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)

Extends **SWebComponent**

## Attributes

Here's the list of available attribute(s).

### displayScrollHeight

Specify the display scroll height. This is the scroll amount after which the 'back to top' component will be displayed.
If this is `null`, the innerHeight of the window will be used

Type : **{ Integer }**

Default : **null**

### displayed

Specify if the 'back to top' component is displayed or not.
This property if managed by the component itself and it's a 'physicalProp' to
simplify the styling

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**

### duration

Specify the scroll duration in ms

Type : **{ Integer }**

Default : **500**

### easing

Specify an easing function to use for the scroll

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **easeInOutQuint**

### enabled

Specify if the component is enabled or not. Useful if you don't want the back-to-top component on mobile for example.

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) , [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **true**

## Methods

### isEnabled

Check if is enabled or not

Return **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }** true if enabled, false if not
