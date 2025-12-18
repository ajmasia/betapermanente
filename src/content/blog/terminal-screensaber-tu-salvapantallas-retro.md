---
title: "Terminal Screensaver: Tu salvapantallas retro"
description: "Un salvapantallas para terminal con arte ASCII animado, inspirado en Omarchy y adaptado para GNOME en Debian/Ubuntu"
date: "Dec 18 2025"
author: "ajmasia"
heroImage: "/images/blog/terminal-screensaver-tu-salvapantallas-retro.png"
showHeroImage: true
tags: ["linux", "gnome", "proyectos", "open-source", "debian"]
lang: es
draft: false
---

¿Recuerdas los salvapantallas de los 90? Esas animaciones hipnóticas que aparecían cuando dejabas el ordenador un rato sin usar. **Terminal Screensaver** trae esa nostalgia a tu escritorio Linux, pero con un toque moderno y minimalista: arte ASCII animado directamente en tu terminal.

Tengo que admitir que la idea no es mía. Todo empezó cuando me tropecé con [Omarchy](https://omarchy.org), un proyecto de DHH (David Heinemeier Hansson, creador de Ruby on Rails) que incluía un salvapantallas para terminales en entornos Hyprland. Me pareció una idea genial. En la actualidad suelo usar GNOME en Debian, así que decidí portarlo y adaptarlo para que funcione de forma similar.

Lo que comenzó como un simple port se ha convertido en un proyecto personal, el cual iré mejorando poco a poco. La idea es mantenerlo simple, funcional y divertido.

## ¿Qué hace exactamente?

Cuando dejas tu maquina inactiva durante un tiempo configurable (por defecto 2 minutos), se abre una terminal a pantalla completa mostrando arte ASCII con efectos visuales animados, basándose en una banner definido en la configuración `banner.txt`. Los efectos van rotando aleatoriamente gracias a la bilioteca de Python [Terminal Text Effects](https://github.com/ChrisBuilds/terminaltexteffects). Si pulsas cualquier tecla estando el screensaver activo, vuelves a tu escritorio recuperando su estado inicial, mostrando el desbloque de sesión si ha trasncurrido el tiempo establecido en Gnome para tal situación, así de simple.

## Cómo instalarlo

Necesitas un sistema Debian 13+ o Ubuntu 22.04+ con GNOME y uno de estos terminales: Alacritty, GNOME Terminal o Ptyxis.

**Instalación rápida (una línea):**

```bash
curl -fsSL https://raw.githubusercontent.com/ajmasia/terminal-screensaver/main/scripts/install.sh | bash
```

Desde el código fuente:

```bash
git clone https://github.com/ajmasia/terminal-screensaver.git
cd terminal-screensaver
./scripts/install.sh
```

El instalador se encarga de todo: dependencias, configuración y el servicio de monitorización de inactividad.

## Cómo usarlo

Una vez instalado, el salvapantallas se activa automáticamente tras el tiempo de inactividad configurado. Pero también tienes estos comandos:

| Comando                        | Qué hace                                    |
| ------------------------------ | ------------------------------------------- |
| terminal-screensaver           | Lanza el salvapantallas manualmente         |
| terminal-screensaver-toggle    | Activa o desactiva la activación automática |
| terminal-screensaver-update    | Actualiza a la última versión               |
| terminal-screensaver-uninstall | Desinstala el proyecto                      |

## Personalización

Puedes personalizar el banner ASCII editando el archivo `~/.config/terminal-screensaver/banner.txt`. El proyecto incluye algunos banners predefinidos (Debian, Trixie...) o puedes crear el tuyo propio con herramientas como [taag](https://patorjk.com/software/taag/). También puedes ajustar el tiempo de espera y otros parámetros en `~/.config/terminal-screensaver/screensaver.conf`.

## Cómo funciona

La arquitectura es sencilla:

- Un monitor en segundo plano pregunta a GNOME cuánto tiempo llevas sin tocar el ratón o teclado.
- Cuando superas el tiempo configurado, se lanza una terminal a pantalla completa.
- La terminal ejecuta un bucle que muestra el arte ASCII con efectos aleatorios.
- Al pulsar una tecla o bloquear la sesión, todo se cierra limpiamente.

Todo está escrito en Bash, salvo la biblioteca de efectos que es Python. Puedes ver el código completo en el [repositorio](https://github.com/ajmasia/terminal-screensaver).

## Cómo Contribuir

Si quieres aportar algo al proyecto:

1. Haz fork del [repositorio](https://github.com/ajmasia/terminal-screensaver).
2. Crea una rama para tu cambio.
3. Envía un Pull Request a la rama develop.

Toda ayuda es bienvenida: desde reportar bugs hasta añadir nuevas funcionalidades o mejorar la documentación.

## Estado del proyecto

**Terminal Screensaver** está en modo **beta permanente.**. Funciona, lo uso a diario, pero siempre hay cosas que mejorar y pulir. Si encuentras algún bug o tienes ideas, las contribuciones son bienvenidas. Tengo alguna mejoras en mente como migrar a un servicio `systemd` para la gestion del `idle` y algunas mejoras tambien más estéticas e incluso de configuración.

Te dejo por aquí algunos enlaces de ineters relacionados con este proyecto.

- Repositorio: <https://github.com/ajmasia/terminal-screensaver>
- Terminal Text Effects: <https://github.com/ChrisBuilds/terminaltexteffects>
- Omarchy (proyecto original): <https://omarchy.org>

## Aprendizajes

Para mi los proyecctos personales tiene sentido por el hecho de seguir aprendiendo al margen de que me puedan resultar de interes para mi como para cualquier personal que decida probarlo. En este caso destacaríá los siguientes aprendizajes:

- He potenciado mis habilidades en el desarrollo de scripts en bash y tangecialmente en Python.
- He ampliado mis conocimientos sobre Linux en general, Debian en particular y sobre todo sobre el funcinamiento del standard XDG para el uso de carpetas y ficheros dentro del ámbito del usuario.
- Y como no, sí, he usado IA para agilizar el desarrollo de muchas de las tareas del proyecto. En este caso he usado Claude Code y la verdad es que tengo que decir que me ha sorprendido mucho.

Para terminar me gustaria decir que este proyecto no existiría sin [Omarchy](https://omarchy.org). Gracias a DHH y al equipo de Basecamp por compartir su trabajo como código abierto y por inspirar ideas como esta. Omarchy demuestra que un entorno de terminal bien cuidado puede ser tan atractivo como funcional. Si usas Hyprland, te recomiendo echarle un vistazo.

---

Terminal Screensaver es software libre bajo [licencia GPL-3.0](https://github.com/ajmasia/terminal-screensaver?tab=GPL-3.0-1-ov-file).
