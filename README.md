# Señalética digital con IA
Proyecto de investigación Señalética digital con IA (CPIFP Los Enlaces)

Herramienta que permite a cualquier usuario generar carteles e imágenes mediante Inteligencia Artificial y mostrarlos en la pantalla del hall del centro.

El flujo es muy sencillo: el usuario describe en texto lo que quiere crear, la aplicación envía ese texto a una API de generación de imágenes por IA, y una vez recibido el resultado el usuario decide si lo aprueba y lo envía a la pantalla del hall, donde se mostrará como un slider. Si no le convence, puede repetir el proceso.

Está diseñada para funcionar en móvil, tablet y web desde la misma base de código, usando Expo y React Native.

---

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

## Despliegue

1. Genera el build de producción:
   ```bash
   npm run build
   ```
2. Comprime en formato `.zip` el contenido de la carpeta `dist/` generada.
3. Abre AWS y crea una aplicación mediante el servicio **Amplify**.
4. Sube el fichero comprimido `.zip`.

---

## Tecnologías utilizadas

| Capa | Tecnología |
|---|---|
| Framework principal | React Native + Expo |
| Estilos | NativeWind (Tailwind CSS) |
| Lenguaje | JavaScript (JSX) |
| Comunicación con API | Fetch API |
| Despliegue | AWS Amplify |

## URL de producción

[https://staging.d3vq4xmagul7hd.amplifyapp.com](https://staging.d3vq4xmagul7hd.amplifyapp.com)

---

## Módulos profesionales

### Diseño de interfaces web

#### RA1 — Planifica la creación de una interfaz web valorando y aplicando especificaciones de diseño

| # | Criterio de evaluación |
|---|---|
| a | Se ha reconocido la importancia de la comunicación visual y sus principios básicos. |
| b | Se han analizado y seleccionado los colores y tipografías adecuados para su visualización en pantalla. |
| c | Se han analizado alternativas para la presentación de la información en documentos web. |
| d | Se ha valorado la importancia de definir y aplicar la guía de estilo en el desarrollo de una aplicación web. |
| e | Se han utilizado y valorado distintas tecnologías para el diseño de documentos web. |
| f | Se han creado y utilizado plantillas de diseño. |

#### RA2 — Crea interfaces web homogéneos definiendo y aplicando estilos

| # | Criterio de evaluación |
|---|---|
| a | Se han reconocido las posibilidades de modificar las etiquetas HTML. |
| b | Se han definido estilos de forma directa. |
| c | Se han definido y asociado estilos globales en hojas externas. |
| d | Se han definido hojas de estilos alternativas. |
| e | Se han redefinido estilos. |
| f | Se han identificado las distintas propiedades de cada elemento. |
| g | Se han creado clases de estilos. |
| h | Se han utilizado herramientas de validación de hojas de estilos. |
| i | Se han analizado y utilizado tecnologías y frameworks para la creación de interfaces web con un diseño responsive. |
| j | Se han analizado y utilizado preprocesadores de estilos para traducir estilos comunes a un código estándar y reconocible por los navegadores. |

#### RA3 — Prepara archivos multimedia para la web, analizando sus características y manejando herramientas específicas

| # | Criterio de evaluación |
|---|---|
| c | Se han analizado las herramientas disponibles para generar contenido multimedia. |
| h | Se ha aplicado la guía de estilo. |

#### RA4 — Integra contenido multimedia en documentos web valorando su aportación y seleccionando adecuadamente los elementos interactivos

| # | Criterio de evaluación |
|---|---|
| e | Se han agregado elementos multimedia a documentos web. |

#### RA5 — Desarrolla interfaces web accesibles, analizando las pautas establecidas y aplicando técnicas de verificación

| # | Criterio de evaluación |
|---|---|
| a | Se ha reconocido la necesidad de diseñar webs accesibles. |
| b | Se ha analizado la accesibilidad de diferentes documentos web. |
| c | Se han analizado los principios y pautas de accesibilidad al contenido, así como los niveles de conformidad. |
| d | Se han analizado los posibles errores según los puntos de verificación de prioridad. |
| e | Se ha alcanzado el nivel de conformidad deseado. |
| f | Se han verificado los niveles alcanzados mediante el uso de test externos. |
| g | Se ha verificado la visualización del interfaz con diferentes navegadores y tecnologías. |
| h | Se han analizado y utilizado herramientas y estrategias que mejoren la visibilidad y la accesibilidad de los sitios y páginas web en los resultados de los buscadores. |

#### RA6 — Desarrolla interfaces web amigables analizando y aplicando las pautas de usabilidad establecidas

| # | Criterio de evaluación |
|---|---|
| a | Se ha analizado la usabilidad de diferentes documentos web. |
| b | Se ha valorado la importancia del uso de estándares en la creación de documentos web. |
| c | Se ha modificado el interfaz web para adecuarlo al objetivo que persigue y a los usuarios a los que va dirigido. |
| d | Se ha verificado la facilidad de navegación de un documento web mediante distintos periféricos. |
| e | Se han analizado diferentes técnicas para verificar la usabilidad de un documento web. |
| f | Se ha verificado la usabilidad de la interfaz web creado en diferentes navegadores y tecnologías. |

#### Asociación RA con herramientas tecnológicas

| RA | Herramientas |
|---|---|
| RA1 | Figma |
| RA1 | Balsamiq |
| RA2 | CSS |
| RA2 | Tailwind CSS |
| RA3 | IA de generación de imágenes |
| RA4 | IA de generación de imágenes |
| RA5 | DevTools Google Chrome |
| RA6 | DevTools Google Chrome |

---

### Desarrollo de interfaces

#### RA1 — Genera interfaces gráficos de usuario mediante editores visuales utilizando las funcionalidades del editor y adaptando el código generado

| # | Criterio de evaluación |
|---|---|
| a | Se han analizado las herramientas y librerías disponibles para la generación de interfaces gráficos. |
| b | Se ha creado un interfaz gráfico utilizando las herramientas de un editor visual. |
| c | Se han utilizado las funciones del editor para ubicar los componentes de interfaz. |
| d | Se han modificado las propiedades de los componentes para adecuarlas a las necesidades de la aplicación. |
| g | Se han asociado a los eventos las acciones correspondientes. |
| h | Se ha desarrollado una aplicación que incluye el interfaz gráfico obtenido. |

#### RA3 — Crea componentes visuales valorando y empleando herramientas específicas

| # | Criterio de evaluación |
|---|---|
| a | Se han identificado las herramientas para diseño y prueba de componentes. |
| b | Se han creado componentes visuales. |
| c | Se han definido sus métodos y propiedades con asignación de valores por defecto. |
| d | Se han determinado los eventos a los que debe responder el componente y se les han asociado las acciones correspondientes. |
| e | Se han realizado pruebas unitarias sobre los componentes desarrollados. |
| f | Se han documentado los componentes creados. |
| g | Se han empaquetado componentes. |
| h | Se han programado aplicaciones cuyo interfaz gráfico utiliza los componentes creados. |

#### RA4 — Diseña interfaces gráficas identificando y aplicando criterios de usabilidad y accesibilidad

| # | Criterio de evaluación |
|---|---|
| a | Se han identificado los principales estándares de usabilidad y accesibilidad. |
| g | Se ha diseñado el aspecto de la interfaz de usuario (colores y fuentes entre otros) atendiendo a su legibilidad. |
| h | Se ha verificado que los mensajes generados por la aplicación son adecuados en extensión y claridad. |
| i | Se han realizado pruebas para evaluar la usabilidad y accesibilidad de la aplicación. |

#### RA7 — Prepara aplicaciones para su distribución evaluando y utilizando herramientas específicas

| # | Criterio de evaluación |
|---|---|
| c | Se han generado paquetes de instalación utilizando el entorno de desarrollo. |
| e | Se han firmado digitalmente las aplicaciones para su distribución. |
| g | Se ha preparado el paquete de instalación para que la aplicación pueda ser correctamente desinstalada. |
| h | Se ha preparado la aplicación para ser distribuida a través de diferentes canales de distribución. |

#### RA8 — Evalúa el funcionamiento de aplicaciones diseñando y ejecutando pruebas

| # | Criterio de evaluación |
|---|---|
| a | Se ha establecido una estrategia de pruebas. |
| b | Se han realizado pruebas de integración de los distintos elementos. |
| f | Se han realizado pruebas de uso de recursos por parte de la aplicación. |
| g | Se ha documentado la estrategia de pruebas y los resultados obtenidos. |

#### Asociación RA con herramientas tecnológicas

| RA | Herramientas |
|---|---|
| RA1 | Figma |
| RA1 | Balsamiq |
| RA3 | React |
| RA3 | React Native (Expo) |
| RA4 | React |
| RA4 | React Native (Expo) |
| RA7 | Node Package Manager (npm) |
| RA7 | AWS |
| RA8 | Jest |
| RA8 | DevTools Google Chrome |

---

### Desarrollo web en entorno cliente

#### RA2 — Escribe sentencias simples, aplicando la sintaxis del lenguaje y verificando su ejecución sobre navegadores web

| # | Criterio de evaluación |
|---|---|
| a | Se ha seleccionado un lenguaje de programación de clientes web en función de sus posibilidades. |
| b | Se han utilizado los distintos tipos de variables y operadores disponibles en el lenguaje. |
| c | Se han identificado los ámbitos de utilización de las variables. |
| d | Se han reconocido y comprobado las peculiaridades del lenguaje respecto a las conversiones entre distintos tipos de datos. |
| e | Se han utilizado mecanismos de decisión en la creación de bloques de sentencias. |
| f | Se han utilizado bucles y se ha verificado su funcionamiento. |
| g | Se han añadido comentarios al código. |
| h | Se han utilizado herramientas y entornos para facilitar la programación, prueba y documentación del código. |

#### RA3 — Escribe código, identificando y aplicando las funcionalidades aportadas por los objetos predefinidos del lenguaje

| # | Criterio de evaluación |
|---|---|
| a | Se han identificado los objetos predefinidos del lenguaje. |
| b | Se han analizado los objetos referentes a las ventanas del navegador y los documentos web que contienen. |
| c | Se han escrito sentencias que utilicen los objetos predefinidos del lenguaje para cambiar el aspecto del navegador y el documento que contiene. |
| d | Se han generado textos y etiquetas como resultado de la ejecución de código en el navegador. |
| e | Se han escrito sentencias que utilicen los objetos predefinidos del lenguaje para interactuar con el usuario. |
| f | Se han utilizado las características propias del lenguaje en documentos compuestos por varias ventanas. |
| g | Se han utilizado mecanismos del navegador web para almacenar información y recuperar su contenido. |
| h | Se ha depurado y documentado el código. |

#### RA4 — Programa código para clientes web analizando y utilizando estructuras definidas por el usuario

| # | Criterio de evaluación |
|---|---|
| a | Se han clasificado y utilizado las funciones predefinidas del lenguaje. |
| b | Se han creado y utilizado funciones definidas por el usuario. |
| c | Se han reconocido las características del lenguaje relativas a la creación y uso de matrices (arrays). |
| d | Se han creado y utilizado matrices (arrays). |
| e | Se han utilizado operaciones agregadas para el manejo de información almacenada en colecciones. |
| f | Se han reconocido las características de orientación a objetos del lenguaje. |
| g | Se ha creado código para definir la estructura de objetos. |
| h | Se han creado métodos y propiedades. |
| i | Se ha creado código que haga uso de objetos definidos por el usuario. |
| j | Se han utilizado patrones de diseño de software. |
| k | Se ha depurado y documentado el código. |

#### RA5 — Desarrolla aplicaciones web interactivas integrando mecanismos de manejo de eventos

| # | Criterio de evaluación |
|---|---|
| a | Se han reconocido las posibilidades del lenguaje de marcas relativas a la captura de los eventos producidos. |
| b | Se han identificado las características del lenguaje de programación relativas a la gestión de los eventos. |
| c | Se han diferenciado los tipos de eventos que se pueden manejar. |
| d | Se ha creado un código que capture y utilice eventos. |
| e | Se han reconocido las capacidades del lenguaje relativas a la gestión de formularios web. |
| f | Se han validado formularios web utilizando eventos. |
| g | Se han utilizado expresiones regulares para facilitar los procedimientos de validación. |
| h | Se ha probado y documentado el código. |

#### RA6 — Desarrolla aplicaciones web analizando y aplicando las características del modelo de objetos del documento

| # | Criterio de evaluación |
|---|---|
| a | Se ha reconocido el modelo de objetos del documento de una página web. |
| b | Se han identificado los objetos del modelo, sus propiedades y métodos. |
| c | Se ha creado y verificado un código que acceda a la estructura del documento. |
| d | Se han creado nuevos elementos de la estructura y modificado elementos ya existentes. |
| e | Se han asociado acciones a los eventos del modelo. |
| f | Se han identificado las diferencias que presenta el modelo en diferentes navegadores. |
| g | Se han programado aplicaciones web de forma que funcionen en navegadores con diferentes implementaciones del modelo. |
| h | Se han independizado las tres capas de implementación (contenido, aspecto y comportamiento) en aplicaciones web. |

#### RA7 — Desarrolla aplicaciones web dinámicas, reconociendo y aplicando mecanismos de comunicación asíncrona entre cliente y servidor

| # | Criterio de evaluación |
|---|---|
| a | Se han evaluado las ventajas e inconvenientes de utilizar mecanismos de comunicación asíncrona entre cliente y servidor web. |
| b | Se han analizado los mecanismos disponibles para el establecimiento de la comunicación asíncrona. |
| c | Se han utilizado los objetos relacionados. |
| d | Se han identificado sus propiedades y sus métodos. |
| e | Se ha utilizado comunicación asíncrona en la actualización dinámica del documento web. |
| f | Se han utilizado distintos formatos en el envío y recepción de información. |
| g | Se han programado aplicaciones web asíncronas de forma que funcionen en diferentes navegadores. |
| h | Se han clasificado, analizado y utilizado librerías y frameworks que faciliten la incorporación de las tecnologías de actualización dinámica a la programación de páginas web. |
| i | Se han creado, probado y documentado aplicaciones web que utilicen estas librerías y frameworks. |

#### Asociación RA con herramientas tecnológicas

| RA | Herramientas |
|---|---|
| RA2 | JavaScript |
| RA2 | React |
| RA3 | JavaScript |
| RA3 | React |
| RA4 | JavaScript |
| RA4 | React |
| RA5 | JavaScript |
| RA5 | React |
| RA6 | JavaScript |
| RA6 | React |
| RA7 | JavaScript |
| RA7 | React |
