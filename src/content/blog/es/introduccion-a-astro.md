---
title: "Introducción a Astro"
date: "Oct 15 2025"
heroImage: "/assets/blog-placeholder-1.jpg"
tags: ["dev", "astro"]
lang: es
draft: false
---

# Introducción a Astro

Astro es un framework moderno para construir sitios web incríblemente rápidos. Su filosofía principal se resume en **“Menos JavaScript, más velocidad”**, ya que genera HTML estático en el servidor y solo carga el JavaScript que realmente necesita en el navegador.

A diferencia de otros frameworks SPA, Astro separa el contenido del comportamiento. Puedes usar componentes de **React**, **Vue**, **Svelte**, **Solid** o incluso **Web Components** dentro de un mismo proyecto, sin penalizar el rendimiento. Todo se compila a HTML estático por defecto, pero puedes **hidratar** solo los componentes interactivos cuando sea necesario.

Además, Astro tiene una integración nativa con **Markdown** y **MDX**, ideal para blogs o documentación técnica. Su sistema de **collections** y **content schemas** facilita la gestión de artículos con tipos seguros en TypeScript.

## Ejemplo básico de componente Astro

A continuación, un ejemplo sencillo de componente `.astro` que muestra un saludo dinámico:

```astro
---
// src/components/Greeting.astro
const { name = "Mundo" } = Astro.props;
---

<h2 class="text-xl font-semibold">¡Hola, {name}! 👋</h2>
```

Y podrías usarlo así en una página:

```astro
---
import Greeting from "../components/Greeting.astro";
---

<main>
  <Greeting name="Astro Developer" />
</main>
```

## Ejemplo de uso con React

Astro también permite importar componentes de React directamente:

```astro
---
import Counter from "../components/Counter.jsx";
---

<section>
  <h3>Componente React dentro de Astro</h3>
  <Counter client:load />
</section>
```

Con el archivo `Counter.jsx` así:

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="rounded bg-blue-600 px-3 py-1 text-white"
      onClick={() => setCount(count + 1)}
    >
      Contador: {count}
    </button>
  );
}
```

## Conclusión

Astro combina la simplicidad del HTML estático con la potencia de los frameworks modernos. Puedes construir sitios rápidos, modulares y fáciles de mantener, con una sintaxis clara y herramientas que se adaptan a tu flujo de trabajo. ✨
