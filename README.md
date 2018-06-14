# Smacc
The simple accordion with no dependencies.

## How to use it
It's really simple:
```JS
new Smacc('.class');
```
or
```JS
new Smacc('#id');
```
Keep in mind that Smacc doesn't support complex CSS selectors (it has to be class or id), for example:
```CSS
.class .class2
```
won't work.
