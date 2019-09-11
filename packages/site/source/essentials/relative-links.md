---
title: Relative Links to Pages
---

When creating a link from one page to another, its not the exact same as writing standard markdown. Instead, consider the following folder structure:

```folder
/my-package/
|-- source
|   |-- index.md
|   |-- getting-started.md
| -- package.json
| -- gatsby-config.js
```

`index.md`

```mdx
---
title: Intro
---

Some Content

## Some Anchor
```

If we wanted to create a link `getting-started` to link to the anchor tag in the `index.md` file we would do the below.

`getting-started.md`

```mdx
---
title: Getting Started
---

If you haven't read the [introduction](/index/#some-anchor) then go back.
```

You can also hover over the anchored header when its rendered to get the anchor's name.
