---
title: "Integrando Tmux en nuestro flujo de trabajo"
description: "Guía práctica para entender, instalar y configurar Tmux, el multiplexor de terminal que mejora la productividad y organización de desarrolladores y usuarios avanzados de Linux o MacOS."
date: "Nov 26 2025"
author: "ajmasia"
heroImage: "/images/blog/integrando-tmux-en-nuestro-flujo-de-trabajo_portada.png"
showHeroImage: true
tags: ["tools", "tmux"]
lang: es
draft: false
---

Si eres desarrollador o tu día a día transcurre en la terminal, deberías plantearte el integrar [Tmux](https://github.com/tmux/tmux) en tu flujo de trabajo.

[Tmux](https://github.com/tmux/tmux) es un **multiplexor** que permite gestionar múltiples **sesiones** de terminal, ventanas y paneles desde una sola ventana de terminal. Esto nos da una flexibilidad absoluta debido a que desde un mismo lugar podemos gestionar multiples procesos sin tener que tener abiertas infinidad de instancias de nuestra aplicación de terminal.

Antes de ver qué es exactamente [Tmux](https://github.com/tmux/tmux), voy a desglosar algunos conceptos.

_¿Qué es una sesión de terminal?_ Cada vez que abrimos una instancia de una aplicación de terminal (como GNOME Terminal, Alacritty, Kitty, etc.), se crea un nuevo contexto de interacción que incluye, normalmente, el inicio de un proceso de shell (por ejemplo, bash o zsh). Ese proceso de shell ejecuta su configuración habitual (como .bashrc, .zshrc, etc.) y a partir de él se lanzan todos los procesos que iniciemos dentro de esa terminal. A este conjunto, el proceso de la terminal junto con el shell que corre dentro, lo llamamos sesión de terminal.

Entonces, _¿qué es un multiplexor?_ Sencillamente se trata de una aplicación que permite gestionar múltiples sesiones de terminal dentro de una única ventana, proporciona además la capacidad de crear varias terminales virtuales mediante el uso de ventanas y paneles (divisiones dentro de una misma ventana), facilitando así la organización del trabajo. Todo esto puede controlarse desde un único lugar y, como ventaja adicional, las sesiones permanecen activas en segundo plano incluso si cerramos nuestra aplicación de terminal.

Por lo tanto _¿qué es [Tmux](https://github.com/tmux/tmux)?_ [Tmux](https://github.com/tmux/tmux) es un multiplexor de terminal moderno, potente y altamente configurable que implementa todas estas capacidades: permite crear y gestionar múltiples sesiones, ventanas y paneles dentro de un mismo entorno, mantenerlas activas aunque cerremos la terminal y reconectarnos más tarde sin perder nada. En esencia, [Tmux](https://github.com/tmux/tmux) actúa como una capa superior que nos da un control avanzado y persistente sobre nuestras sesiones de terminal.

## Porqué deberías usar Tmux en tu flujo de trabajo

En primer lugar, porque te permite mantener la persistencia de tus sesiones de trabajo. Si levantas servidores, estableces conexiones SSH o ejecutas proyectos en tu entorno local, todos esos procesos seguirán funcionando en segundo plano incluso si cierras la terminal. Siempre podrás volver exactamente al punto donde los dejaste.

En segundo lugar, porque simplifica la organización de tu entorno. Sin [Tmux](https://github.com/tmux/tmux), gestionar múltiples procesos te obligaría a mantener varias ventanas o pestañas de terminal abiertas. Con [Tmux](https://github.com/tmux/tmux) puedes estructurar tu trabajo en ventanas y paneles dentro de una misma sesión, manteniendo todo ordenado y accesible.

Y por último, porque facilita la gestión remota de manera flexible y robusta. [Tmux](https://github.com/tmux/tmux) permite crear sesiones persistentes a las que puedes reconectar desde cualquier lugar, y también compartirlas con otros ingenieros del equipo. Esto resulta especialmente útil para mantener procesos críticos activos sin depender directamente del cliente SSH o de la disponibilidad de una conexión continua.

## Instalado Tmux en entornos Linux y MacOS

```bash
# Debian based Linux
sudo apt update && sudo apt install tmux

# Fedora based Linux
sudo dnf install tmux

# Arch based Linux
sudo pacman -S tmux

# MacOS
brew install tmux
```

## Configurando Tmux

Aunque es posible usar [Tmux](https://github.com/tmux/tmux) con su configuración por defecto, lo cierto es que puede mejorarse enormemente mediante la personalización: desde redefinir atajos de teclado hasta habilitar el uso del ratón, integración con el portapapeles, colores avanzados y muchas otras opciones que enriquecen el flujo de trabajo.

[Tmux](https://github.com/tmux/tmux) carga la configuración personal del usuario desde un único archivo:

```
~/.tmux.conf
```

Si realizas cambios en este archivo y quieres aplicarlos sin reiniciar [Tmux](https://github.com/tmux/tmux), puedes recargar la configuración con el siguiente comando:

```bash
tmux source-file ~/.tmux.conf
```

## Mi configuración base

Esta es la configuración que uso actualmente y que creo es lo suficientemente simple y potente a la vez:

```bash
# PREFIX AND RELOAD
# Unbind tmux default prefix (Ctrl+b)
unbind C-b

# Use Ctrl+x as the new prefix
set -g prefix C-x

# Reload configuration with Prefix + r
# Displays a message in the status bar when reloaded
bind r source-file ~/.tmux.conf \; display-message "Configuration reloaded!"

# TERMINAL AND PERFORMANCE
# Advertise a 256-color capable terminal inside tmux
set -g default-terminal "tmux-256color"

# Enable truecolor (RGB) support when using xterm-256color outside tmux
set -ag terminal-overrides ",xterm-256color:RGB"

# Status bar refresh interval (seconds)
set -g status-interval 1

# Reduce escape-sequence timeout
# Improves responsiveness in Vim/Neovim when pressing Esc
set -sg escape-time 0

# Extend repeat time for repeatable key bindings
set -g repeat-time 600

# Increase scrollback history limit for each pane
set -g history-limit 10000

# COPY MODE AND NAVIGATION
# Use Vim-style keys in copy mode
setw -g mode-keys vi

# Copy-mode key bindings (copy-mode-vi):
#   v       -> begin selection
#   y       -> copy selection and exit copy mode
#   Escape  -> cancel and exit copy mode
bind -T copy-mode-vi v       send-keys -X begin-selection
bind -T copy-mode-vi y       send-keys -X copy-selection-and-cancel
bind -T copy-mode-vi Escape  send-keys -X cancel

# MOUSE AND CLIPBOARD
# Enable mouse support:
#   - Click to select panes
#   - Scroll wheel triggers scrollback
#   - Drag to resize panes
set -g mouse on

# Integrate tmux with the system clipboard (if supported)
set -g set-clipboard on

# Allow clipboard passthrough (requires tmux ≥ 3.3)
set -g allow-passthrough on

# INDEXING, WINDOWS, AND PANES
# Start window numbering at 1 instead of 0
set -g base-index 1

# Start pane numbering at 1
setw -g pane-base-index 1

# Renumber windows automatically after closing one
set -g renumber-windows on

# Move between panes using Alt + Left/Right arrow keys
bind -n M-Left  select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up    select-pane -U
bind -n M-Down  select-pane -D

# PANE SPLITTING
# Split vertically with '-' and preserve current working directory
bind - split-window -v -c "#{pane_current_path}"

# Split horizontally with '|' and preserve current working directory
bind | split-window -h -c "#{pane_current_path}"

# Unbind tmux default split keys ('%' and '"')
unbind %
unbind '"'
```

## Atajos básicos para el uso de Tmux

| Acción                                 | Tu atajo                    | Notas                             |
| -------------------------------------- | --------------------------- | --------------------------------- |
| **Prefijo principal**                  | `Ctrl + x`                  | Reemplaza al Ctrl+b por defecto   |
| **Cambiar de sesión (menú)**           | Prefix + `s`                | Igual que listar, permite navegar |
| **Desconectarse (detach)**             | Prefix + `d`                | Mantiene la sesión viva           |
| **Renombrar sesión**                   | Prefix + `$`                | Cambia nombre de sesión actual    |
| **Nueva ventana**                      | Prefix + `c`                | Se abre en el mismo directorio    |
| **Renombrar ventana**                  | Prefix + `,`                | Muy útil para organizar proyectos |
| **Cambiar ventana anterior/siguiente** | Prefix + `p` / Prefix + `n` | Navegación clásica                |
| **Ir a una ventana por número**        | Prefix + `1–9`              | Empiezas en 1 (no 0) por config   |
| **Dividir panel horizontal**           | Prefix + `-`                | Redefinido                        |
| **Dividir panel vertical**             | Prefix + `\|`               | Redefinido                        |
| **Cerrar panel actual**                | Prefix + `x`                | Pide confirmación                 |
| **Moverse entre paneles**              | Alt + Flechas               | Mouse también habilitado          |
| **Redimensionar paneles**              | Prefix + `Ctrl` + Flechas   | O arrastrar con ratón             |
| **Entrar en copy-mode**                | Prefix + `[`                | Para navegar historial            |
| **Empezar selección (copy-mode)**      | `v`                         | Redefinido a estilo Vim           |
| **Copiar selección (copy-mode)**       | `y`                         | Copia + sale del modo             |
| **Cancelar copy-mode**                 | `Escape`                    | Según tu binding personalizado    |
| **Recargar configuración**             | Prefix + `r`                | Muestra mensaje de confirmación   |

## Comandos básicos para la gestión de tmux

| Comando                              | Acción                                       |
| ------------------------------------ | -------------------------------------------- |
| `tmux`                               | Crea una nueva sesión                        |
| `tmux new -s nombre`                 | Nueva sesión con nombre                      |
| `tmux ls`                            | Listar sesiones                              |
| `tmux attach`                        | Conectarse a la última sesión                |
| `tmux attach -t nombre`              | Conectarse a una sesión concreta             |
| `tmux switch -t nombre`              | Cambiar a otra sesión (desde dentro de tmux) |
| `tmux kill-session -t nombre`        | Cerrar una sesión                            |
| `tmux kill-server`                   | Cerrar _todas_ las sesiones                  |
| `tmux rename-session -t viejo nuevo` | Renombrar una sesión                         |
| `tmux list-windows -t sesion`        | Listar ventanas de una sesión                |
| `tmux source-file ~/.tmux.conf`      | Recargar configuración                       |
| `tmux display-message "texto"`       | Mostrar mensaje en la barra de estado        |

Aquí tienes una versión **más clara, fluida y pulida** del texto, respetando tu intención, tono y estructura, pero con redacción más profesional y coherente. También he corregido pequeños errores tipográficos y mejorado la explicación.

## Embelleciendo Tmux

El tema por defecto de [Tmux](https://github.com/tmux/tmux) es bastante espartano. Aunque puede modificarse directamente desde el archivo de configuración, la experiencia mejora muchísimo si utilizamos **plugins** que ya incluyen esquemas de color y estilos predefinidos.

El mundo de los plugins de [Tmux](https://github.com/tmux/tmux) da para un artículo completo, así que lo abordaré en detalle en otro post. Aún así te dejo un enlace a un gestor de uso muy común en la comunidad, [Tmux Plugin Manager](https://github.com/tmux-plugins/tpm).

Personalmente soy muy fan de la paleta de colores **Catppuccin**, así que te voy a mostrar cómo añadir este tema a la configuración de [Tmux](https://github.com/tmux/tmux) que hemos visto antes de forma rápida y sencilla.

Los plugins suelen instalarse en la siguiente carpeta:

```bash
~/.tmux/plugins
```

Para instalar [Catppuccin](https://catppuccin.com/):

```bash
git clone https://github.com/omerxx/catppuccin-tmux.git ~/.tmux/plugins/catppuccin-tmux
```

Una vez instalado, añadimos la configuración mínima necesaria para activar el tema. Para ello, editamos nuestro archivo `~/.tmux.conf` y añadimos al final el siguiente bloque:

```bash
# THEME: CATPPUCCIN (catppuccin-tmux plugin)
# Repository: https://github.com/omerxx/catppuccin-tmux

# Installation:
# git clone https://github.com/omerxx/catppuccin-tmux.git ~/.tmux/plugins/catppuccin-tmux

# Plugin location (standard tmux plugins directory):
#   ~/.tmux/plugins/catppuccin-tmux

# Set the status bar at the top of the terminal
set-option -g status-position top

# Add here your custom Catppuccin flavour if needed
set -g @catppuccin_window_default_text "#W"
set -g @catppuccin_window_current_text "#W"

set -g @catppuccin_status_modules_right "session host"

# Load Catppuccin theme
run-shell ~/.tmux/plugins/catppuccin-tmux/catppuccin.tmux
```

Y voilà, [Tmux](https://github.com/tmux/tmux) ya está funcionando con el tema [Catppuccin](https://github.com/omerxx/catppuccin-tmux), mucho más atractivo y agradable que la configuración por defecto.

![Tema catppuccin aplicado a tmux](/images/blog/integrando-tmux-en-nuestro-flujo-de-trabajo_image01.png)

En sucesivos posts iremos viendo cómo potenciar el uso de las sesiones de trabajo, el uso de plugins,etc.

> Integrar Tmux en tu día a día te permitirá trabajar de forma más organizada, eficiente y robusta, especialmente si gestionas múltiples procesos o trabajas en entornos remotos.
