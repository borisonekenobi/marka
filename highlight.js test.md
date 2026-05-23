# Highlight.js Theme Showcase

## TypeScript / JavaScript

```ts
// comment + doctag + keyword + built_in + literal + number + operator
/**
 * @param name string value
 * @returns greeting
 */

const MAX_FILES = 100;
let count = 42;
const enabled = true;
const nothing = null;

class Animal {
	public species: string;

	constructor(species: string) {
		this.species = species;
	}

	speak(sound: string): string {
		return `${this.species}: ${sound}\n`;
	}
}

class Dog extends Animal {
	constructor() {
		super('dog');
	}
}

const dog = new Dog();

console.log(dog.speak('woof'));

const regex = /^[A-Z_]+\d*$/gi;

const message = `Hello ${dog.species}`;

const obj = {
	field: 'value',
	nested: {
		number: 123,
	},
};

obj.nested.number++;

const sym = Symbol('token');

function greet(name: string, ...args: string[]): void {
	console.log(name, args);
}

greet('Boris');

this.window?.alert?.('test');
```

## HTML

```html
<!-- comment -->

<section id="main" class="container highlighted">
	<h1 data-theme="dark">
		Heading
	</h1>

	<input
		type="text"
		disabled
		placeholder="hello"
	/>

	<a
		href="https://example.com"
		target="_blank"
	>
		Link
	</a>

	<custom-widget
		data-value="123"
		aria-label="widget"
	></custom-widget>
</section>
```

## CSS

```css
/* comment */

:root {
	--main-color: #57aaf7;
	--spacing: 10px;
}

body,
.container {
	background: #1e1f22;
	color: var(--main-color);
}

#main {
	margin: calc(10px + 2em);
}

.container[data-theme='dark']:hover {
	border: 1px solid red;
}

input[type='text']::placeholder {
	color: gray;
}
```

## JSON / Config

```json
{
	"name": "marka",
	"version": 1,
	"enabled": true,
	"path": "C:\\Users\\Boris",
	"tags": [
		"markdown",
		"editor"
	]
}
```

## XML

```xml
<?xml version="1.0"?>

<book id="123">
	<title lang="en">
		Marka Guide
	</title>

	<chapter index="1">
		Introduction
	</chapter>
</book>
```

## Shell / REPL

```bash
$ echo "hello"
$ export PATH="/usr/bin"
$ npm run build
$ git status
```

## Markdown

```md
# Section Heading

- bullet one
- bullet two

> quoted text

**strong text**

*emphasis text*

`inline code`

[link](https://example.com)

$$
E = mc^2
$$
```

## Diff

```diff
+ inserted line
- deleted line
 unchanged line
```

## Template / Handlebars

```handlebars
{{#if user}}
	Hello {{user.name}}
{{else}}
	Guest
{{/if}}
```

## SQL

```sql
-- comment

SELECT user_id,
       COUNT(*) AS total
FROM users
WHERE enabled = TRUE
GROUP BY user_id
ORDER BY total DESC;
```

## YAML

```yaml
version: 1
theme: jetbrains
enabled: true
colors:
	keyword: "#CF8E6D"
	string: "#6AAB73"
```

## Rust (good for types + traits + macros)

```rust
// comment

const MAX_SIZE: usize = 100;

trait Speak {
    fn speak(&self);
}

struct Dog {
    name: String,
}

impl Speak for Dog {
    fn speak(&self) {
        println!("woof {}", self.name);
    }
}

fn main() {
    let dog = Dog {
        name: String::from("Max"),
    };

    dog.speak();
}
```
