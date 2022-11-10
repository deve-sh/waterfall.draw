<p align="center">
  <img src="./Screenshot.png" title="Waterfall.Draw" style="border: 1px solid #efefef">
</p>

A simple Framework and Library Agnostic library to draw a waterfall chart of network requests.

### Installation

```
npm i waterfall.draw
```

or

```html
<script type="text/javascript" src="https://unpkg.com/waterfall.draw"></script>
```

Add CSS:

```javascript
import "waterfall.draw/styles.min.css";
```

```html
<link rel="stylesheet" href="https://unpkg.com/waterfall.draw/styles.min.css"></link>
```

### Get Started

```javascript
import waterfall from "waterfall.draw";

const now = new Date().getTime();

const requests = [
	{
		url: "/api/v1/a",
		startedAt: new Date(now),
		endedAt: new Date(now + 5000),
        method: 'GET'
	},
	{
		url: "/api/v2/b",
		startedAt: new Date(now + 5000),
		endedAt: new Date(now + 10000),
        method: 'POST'
	},
	{
		url: "/api/v2/c",
		startedAt: new Date(now + 2000),
		endedAt: new Date(now + 5000),
        method: 'PUT'
	},
	{
		url: "/api/v2/d",
		startedAt: new Date(now + 6500),
		endedAt: new Date(now + 7000),
        method: 'DELETE'
	},
];

waterfall(
    "#elementselector" or document.getElementById('elementselector'),
    requests
);
```
