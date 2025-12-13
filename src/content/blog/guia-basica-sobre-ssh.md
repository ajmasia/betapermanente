---
title: "Guía básica del uso de SSH"
description: "Introducción práctica y progresiva a SSH: claves, ssh-agent, Bitwarden y configuración de ~/.ssh/config explicados de forma clara para personas con poca experiencia."
date: "Dec 13 2025"
author: "ajmasia"
heroImage: "/images/blog/guia-basica-sobre-ssh.png"
showHeroImage: true
tags: ["ssh", "seguridad", "git", "bitwarden", "tools"]
lang: es
draft: false
---

No sé si te ocurre a ti, pero cuando empecé a usar SSH me encontré con una mezcla de conceptos que no terminaba de entender: claves públicas y privadas, agentes, configuraciones en `~/.ssh/config`, passphrases… Todo parecía un poco confuso. Por eso me apetecía escribir una guía básica que explicase SSH desde cero, de forma clara y progresiva.

Antes de entrar en comandos y configuraciones, merece la pena entender **de dónde viene SSH y por qué existe**. Esto ayuda mucho a comprender por qué funciona como funciona y por qué es tan estricto con ciertos aspectos.

En los años 90, el acceso remoto a servidores se hacía principalmente con herramientas como **Telnet** o **rlogin**. El problema es que estas herramientas enviaban todo en texto plano: usuarios, contraseñas y comandos podían ser interceptados fácilmente en la red.

Para solucionar este problema, en 1995 se creó **SSH (Secure Shell)**, cuyo objetivo principal era muy claro: **proporcionar acceso remoto seguro mediante criptografía**. Desde el principio, SSH se diseñó para cifrar toda la comunicación y permitir autenticación fuerte mediante claves criptográficas.
Con el tiempo, SSH no solo sustituyó a Telnet, sino que se convirtió en un estándar para:

- Administración remota de sistemas
- Transferencia segura de archivos
- Autenticación en servicios de desarrollo

Como puedes comprobar, seguimos usando tecnologías diseñadas hace casi 30 años porque siguen siendo efectivas y seguras para proteger conexiones remotas. SSH fue creado para reemplazar protocolos inseguros que enviaban información en texto plano, y lo hizo implementando criptografía fuerte. Entender este origen ayuda a comprender por qué SSH da tanta importancia a las claves, a los permisos de los archivos y al uso de agentes para gestionar claves, y por qué sigue siendo el estándar de facto en administración de sistemas y desarrollo moderno.

## Qué es SSH y por qué su uso está tan extendido

**SSH** es un protocolo que permite conectarse de forma segura a otro ordenador a través de una red. Es la forma estándar de acceder a servidores Linux, administrar sistemas remotos y autenticarte en servicios como GitHub o GitLab.

Lo importante de SSH no es solo que permite conectarse remotamente, sino que **toda la comunicación va cifrada**. Esto evita que contraseñas, comandos o datos viajen en claro por la red.

En la práctica, SSH se usa entre otras cosas para:

- Acceder a servidores remotos
- Administrar sistemas Linux
- Trabajar con repositorios Git
- Automatizar tareas de forma segura
- Protección criptográfica de activos digitales.

## Autenticación en SSH: por qué no se usan contraseñas

Aunque SSH permite usar usuario y contraseña, en la práctica casi siempre se utilizan **claves SSH**. El motivo es simple: las claves son mucho más seguras y cómodas.

Una clave SSH no es una contraseña larga, sino un **par de claves criptográficas** que trabajan juntas.

- La **clave privada** se queda en tu ordenador
- La **clave pública** se copia en el servidor o servicio remoto

Cuando te conectas, el servidor comprueba que posees la clave privada correcta sin que tengas que enviarla. Por eso la clave privada **nunca debe compartirse**.

## Tipos de claves SSH y cuál elegir según el caso

Existen varios algoritmos de claves SSH, pero hoy en día la recomendación es clara.

- **Ed25519** es el algoritmo moderno recomendado. Es rápido, seguro y soportado por prácticamente todos los servicios actuales.
- **RSA** solo se usa cuando es necesario por compatibilidad con sistemas antiguos.
- **DSA** está obsoleto y no debe usarse.

Si no tienes una razón concreta para elegir otro, **Ed25519 es siempre la mejor opción**.

## Crear tu primera clave SSH

Crear una clave SSH es un proceso sencillo, pero es importante entender qué ocurre.

En Linux o macOS, abre una terminal y ejecuta:

```bash
ssh-keygen -t ed25519 -C "my email or description"
```

Este comando genera un nuevo par de claves. Durante el proceso se te pedirá una **passphrase**.

La passphrase es una contraseña que protege tu clave privada. No es obligatoria, pero **es muy recomendable usarla**, especialmente si trabajas en un portátil o equipo compartido.

## Archivos que se crean y qué significan

Tras generar la clave, aparecerán dos archivos en el directorio `~/.ssh/`:

- `id_ed25519`: la clave privada
- `id_ed25519.pub`: la clave pública

La clave pública es la que se copia en servicios como GitHub o GitLab. La clave privada **nunca debe salir de tu equipo**.

## Para qué usaremos la clave pública

La clave pública se registra en los servicios o servidores a los que quieras acceder.

Por ejemplo:

- En GitHub o GitLab se añade en la sección de SSH keys
- En un servidor se añade al archivo `~/.ssh/authorized_keys`

Una vez añadida, el servidor reconocerá tu equipo como autorizado.

## Cómo conectarse a un servidor usando solo claves SSH

Una de las ventajas principales de SSH es poder conectarse a un servidor **sin usar contraseñas**, únicamente con claves SSH. De hecho, en muchos servidores modernos el acceso por contraseña está deshabilitado por seguridad.

Para que esto funcione deben cumplirse dos cosas:

1. Tu equipo debe tener la **clave privada**
2. El servidor debe tener tu **clave pública** autorizada

### Paso 1: Tener una clave SSH en tu equipo

Si aún no la tienes, crea una clave Ed25519:

```bash
ssh-keygen -t ed25519 -C "server access"
```

Esto generará una clave privada y una clave pública en `~/.ssh/`.

### Paso 2: Copiar la clave pública al servidor

La forma más sencilla es usar `ssh-copy-id`:

```bash
ssh-copy-id user@server.example.com
```

Este comando añade automáticamente tu clave pública al archivo `~/.ssh/authorized_keys` del servidor.

Si `ssh-copy-id` no está disponible, puedes hacerlo manualmente:

```bash
cat ~/.ssh/id_ed25519.pub | ssh user@server.example.com "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Paso 3: Conectarse al servidor

Una vez copiada la clave pública, la conexión se realiza simplemente con:

```bash
ssh user@server.example.com
```

Si todo está correctamente configurado:

- No se pedirá contraseña del servidor
- Solo se usará la clave SSH
- Puede pedirse la passphrase de la clave (o gestionarse con un SSH Agent)

### Uso con ~/.ssh/config

Para simplificar aún más, puedes definir el servidor en `~/.ssh/config`:

```bash
Host my-server
    HostName server.example.com
    User user
    IdentityFile ~/.ssh/id_ed25519
```

Y conectarte simplemente con:

```bash
ssh my-server
```

Este flujo es el estándar en servidores modernos y es mucho más seguro que el acceso por contraseña.

## El problema de la passphrase y el SSH Agent

Si tu clave tiene passphrase, SSH te la pediría cada vez que te conectas. Esto es seguro, pero poco práctico.

Aquí es donde entra el **SSH Agent**.

Un SSH Agent es un proceso que mantiene tus claves **desbloqueadas en memoria**. Introduces la passphrase una vez y, mientras el agente esté activo, SSH puede usar la clave sin volver a pedirla.

Es importante entender que el agente **no elimina la seguridad**, solo mejora la experiencia de uso.

## Usar el SSH Agent nativo en Linux

Un **SSH Agent** es un pequeño programa que se encarga de guardar tus claves SSH en memoria para que no tengas que escribir la passphrase cada vez que te conectas a un servidor o usas Git. Piensa en él como un “llavero digital” que desbloqueas una vez y que después se encarga de abrir puertas por ti mientras trabajas.

En lugar de enviar tu clave privada a ningún sitio, el agente se queda con ella guardada y solo crea las **firmas necesarias** cuando SSH se lo pide. Así, tu clave nunca sale de tu equipo y sigue protegida, pero tú no tienes que repetir pasos cada vez.

Gracias al agente SSH, puedes usar claves seguras con passphrase sin que sea incómodo, trabajar con varias claves a la vez (por ejemplo, personal y trabajo) y conectar de forma más fluida a servidores y plataformas como GitHub o GitLab. Es comodidad y seguridad al mismo tiempo.

La mayoría de sistemas Linux incluyen `ssh-agent` de forma nativa.

Para iniciarlo manualmente:

```bash
eval "$(ssh-agent -s)"
```

Para añadir una clave al agente:

```bash
ssh-add ~/.ssh/id_ed25519
```

A partir de ese momento, las conexiones SSH usarán esa clave sin pedir la passphrase de nuevo.

## Bitwarden como SSH Agent

Si ya utilizas Bitwarden como gestor de contraseñas, puedes ir un paso más allá y usarlo como **SSH Agent**.

En este caso, Bitwarden se encarga de almacenar las claves SSH cifradas dentro de la bóveda y de responder a las peticiones de SSH cuando es necesario.

Esto tiene varias ventajas:

- Las claves no tienen que estar almacenadas como archivos locales
- La seguridad depende del desbloqueo de la bóveda
- Es especialmente útil si trabajas en varios dispositivos

## Qué necesitas para usar Bitwarden como SSH Agent

Para que esto funcione correctamente necesitas:

- **Bitwarden Desktop** instalado (la extensión del navegador no es suficiente)
- Un cliente SSH funcional en el sistema

Una vez instalado, Bitwarden puede exponer un socket compatible con `ssh-agent`.

## Guardar una clave SSH en Bitwarden

Puedes usar una clave existente o crear una nueva:

```bash
ssh-keygen -t ed25519 -C "bitwarden ssh key"
```

Después, en Bitwarden Desktop:

- Crea un nuevo ítem de tipo **SSH Key**
- Pega la clave privada
- Añade la passphrase si existe
- Opcionalmente indica el host (por ejemplo `github.com`)

Bitwarden cifra automáticamente la clave antes de guardarla.

## Conectar SSH con el agente de Bitwarden

Para que SSH sepa que debe usar Bitwarden como agente, necesita conocer la ubicación del socket. Esto se hace mediante la variable de entorno `SSH_AUTH_SOCK`.

En muchos casos Bitwarden la configura automáticamente. Puedes comprobarlo con:

```bash
echo $SSH_AUTH_SOCK
```

Si no aparece nada, puedes definirla manualmente y hacerla persistente en tu shell.

## El archivo ~/.ssh/config: cuando tienes más de una clave

A medida que usas SSH en más contextos, es normal acabar con varias claves: una personal, otra de trabajo, otra para servidores.

El archivo `~/.ssh/config` permite definir **qué clave usar en cada caso**, evitando errores y comportamientos impredecibles.

Cada bloque del archivo describe cómo debe comportarse SSH al conectarse a un host concreto.

## Ejemplo: GitHub y GitLab con claves distintas

Supongamos este escenario:

- GitHub personal con `id_ed25519_github`
- GitLab de trabajo con `id_ed25519_gitlab_work`

La configuración sería:

```bash
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
    IdentitiesOnly yes

Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_ed25519_gitlab_work
    IdentitiesOnly yes
```

La opción `IdentitiesOnly yes` es clave: le dice a SSH que use únicamente la clave indicada y no pruebe otras.

## Mismo servicio, cuentas distintas

Un caso muy común es usar GitHub personal y GitHub de trabajo.

Aquí se utilizan alias:

```bash
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github_personal
    IdentitiesOnly yes

Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github_work
    IdentitiesOnly yes
```

Después, Git se usa normalmente, pero con el alias adecuado en la URL.

## Uso de ~/.ssh/config con Bitwarden

Si usas Bitwarden como agente, no debes forzar `IdentityFile`. En este caso el `config` se usa principalmente para definir usuarios y hosts, dejando que Bitwarden decida qué clave utilizar.

## Permisos y errores comunes

SSH es muy estricto con los permisos de los archivos. Una configuración incorrecta hará que las claves sean ignoradas.

Los permisos recomendados son:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/config
```

## SSH no es solo para conectarse a servidores

Aunque lo más habitual es usar SSH para acceder a un servidor, en la práctica SSH es una **herramienta base** sobre la que se apoyan muchas otras cosas.

Algunos ejemplos muy comunes:

- **Git** utiliza SSH para autenticarse sin contraseñas en GitHub, GitLab o servidores propios
- **scp** permite copiar archivos de forma segura entre máquinas
- **rsync sobre SSH** se usa para sincronizar directorios de forma eficiente
- **Túneles SSH** permiten exponer servicios locales o remotos de forma segura

Por eso aprender bien SSH no es solo aprender a "entrar a un servidor", sino entender una pieza fundamental del ecosistema Linux y de desarrollo.

## Cómo depurar problemas con SSH (cuando algo no funciona)

Una de las mayores frustraciones al empezar con SSH es que, cuando falla, el error suele ser poco claro. Por suerte, SSH incluye un modo de depuración muy útil.

Para ver qué está ocurriendo realmente, usa el modo verbose:

```bash
ssh -v user@server.example.com
```

Este modo muestra paso a paso qué está haciendo SSH. Algunas líneas importantes a tener en cuenta son:

- `Offering public key`: SSH está probando una clave concreta
- `Authentications that can continue`: métodos de autenticación permitidos
- `Permission denied (publickey)`: la clave no ha sido aceptada

Leer estas líneas ayuda mucho a entender **qué clave se está usando** y **por qué la autenticación falla**.

## Errores comunes al empezar con SSH

Muchos problemas con SSH no son realmente errores complejos, sino pequeños detalles fáciles de pasar por alto:

- Subir la clave pública equivocada al servicio
- Tener permisos incorrectos en `~/.ssh` o en la clave privada
- Tener varias claves y que SSH use la incorrecta
- Usar un usuario SSH distinto del esperado (por ejemplo `git` en GitHub)
- Forzar una clave local cuando se usa Bitwarden como agente

Cuando algo falla, revisar estos puntos suele resolver la mayoría de problemas.

## Recomendaciones prácticas para desarrolladores

Si usas SSH a diario como desarrollador, estas recomendaciones te ahorrarán tiempo y dolores de cabeza:

- Usa **una clave distinta** para trabajo y uso personal
- Protege siempre tus claves con passphrase
- Usa un **SSH Agent** (nativo o Bitwarden) para no escribir la passphrase constantemente
- Configura correctamente `~/.ssh/config` en cuanto tengas más de una clave
- Revisa periódicamente qué claves tienes activas y elimina las que no uses

Una buena higiene de claves SSH es tan importante como una buena gestión de contraseñas.

## Conclusión

SSH puede parecer complicado al principio porque mezcla conceptos de redes, sistemas y criptografía. Sin embargo, una vez se entienden las ideas básicas —claves, agentes y configuración— deja de ser magia negra.

Invertir tiempo en entender SSH es una de esas decisiones que se amortizan rápido: las conexiones son más seguras, el trabajo es más fluido y los errores se entienden mucho mejor.

Una vez bien configurado, SSH simplemente desaparece del día a día… y eso es precisamente lo que lo hace tan bueno.
