---
title: Modifiying Codeblocks
---

The codeblocks rendered in the markdown are using custom code blocks with some custom configurations.

## Adding Attributes

When beginning to write a codeblock, you first start with the "\`\``". After specifying the language you can input custom attributes starting immediately afterwords.

<br />

The below code block will not have a copy button because we passed `hideCopy` to the codeblock

```json hideCopy=true
// Test Hiding copy
```

````markdown header=hideCopy.md
```json hideCopy=true
// Test Hiding copy
`\``
```
````

<br />

## Configurations

| Attribute name | Type    | Description                                                              |
| -------------- | ------- | ------------------------------------------------------------------------ |
| live           | boolean | Whether or not to run the snippet in live preview mode.                  |
| hideCopy       | boolean | If true, will hide the `copy` button.                                    |
| header         | string  | Header text to go alongside the code block. Only works with code blocks. |
