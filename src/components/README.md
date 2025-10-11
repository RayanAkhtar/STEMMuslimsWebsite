## How to use the components

Not every attribute has to be filled out - most have values.

Remember to import the related modules on top of the page!

To use colours just type $ and see what comes up - e.g., $stemm-blue, $stone, etc. to find more colours, check styles/globals.modules.scss

## Button

Found in (src/components/button.js)


Use either a link (in href) or a function for what you want your button to do. 

Please use the clamp function for passing in width!

```js
<Button label="Our Committee" href="/about/committee" onClick={alternative_function} width="clamp(200px, 20vw, 400px)" />
```

## Image Holder 

Found in (src/components/imageHolder.js)


alt= is the text that shows when the image doesn't load - i.e., "isoc logo", so users know what's there, and also good for accessibilty

You don't have to include height/width if you dont want to

Useful images may be found in public/logos folder!

```js
<ImageHolder src="/logos/whatsapp.svg" alt="ISOC LOGO" width= "clamp(300px, 30vw, 600px)" height= "clamp(300px, 30vw, 600px)"/>
```

## Sticker
Found in (src/components/sticker.js)


Pretty self explanatory, just takes text and size of a sticker. Again, please remember to use clamp()

```js
<Sticker text="This is a sticker!" size="clamp(100px, 20vw, 200px)" />
```
