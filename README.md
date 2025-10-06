# LaraAi Challenge - Sistema de Gestión de Respuestas Inteligente

## 📋 Descripción

LaraAi Challenge es una aplicación web desarrollada con **React** y **TypeScript** que implementa un sistema inteligente de gestión de respuestas y cuestionarios. El proyecto utiliza Context API para el manejo de estado global y está diseñado con una arquitectura modular y escalable.

## ✨ Características Principales

- 🎯 **Gestión de Cuestionarios**: Sistema completo para manejar diferentes tipos de preguntas y respuestas
- 📊 **Manejo de Estado Avanzado**: Implementación con Context API para una gestión eficiente del estado
- 🔧 **TypeScript**: Desarrollo con tipado fuerte para mayor robustez y mantenibilidad
- 🎨 **Interfaz Moderna**: Diseño responsive y user-friendly
- 📝 **Respuestas Adicionales**: Funcionalidad para agregar información extra a las respuestas
- 🔄 **Actualizaciones en Tiempo Real**: Sistema de actualización dinámico de respuestas

## 🛠️ Tecnologías Utilizadas

- **React 18+**
- **TypeScript**
- **Context API**
- **CSS3/SCSS** (para estilos)
- **ES6+**

## Explicacion de decisciones tecnicas

**Carpetas**
- Pages
  En pages solo puse "MainForm" que es la única página que hay en la app, este componente maneja lo que se va a mostrar (presentación, preguntas o despedida).

- Components
  En components se encuentran los componentes de la app, son los que más lógica tienen. Hay un componente por cada tipo de pregunta y otro separado para la pregunta extra que es opcional. La presentación y la finalización del formulario tiene cada uno su componente particular. El botón de    submit y los botones para la paginación también están separados en componentes.

- Context
  Hay dos contextos: uno para la paginación y otro para ir guardando las respuestas.

- Types
  En esta carpeta se guardan todos los tipados de TypeScript para mantener la consistencia de tipos en toda la aplicación.

- Hooks
  Contiene custom hooks reutilizables que encapsulan lógica específica del negocio, como manejo de formularios, validaciones y efectos personalizados.

- Styles
  Tiene el archivo que maneja los estilos de los componentes de MUI

 **Consideraciones**

 Use una sola pagina con un solo fetch (GET), en un principio fue una buena idea, lo pense para que sea un solo componente dentro de una app mas grande, donde le mandas la info y te devuelve una respuesta. Si lo tuviera que hacer de nuevo quizas separaria la presentacion y la despedida en   2 componentes separados con sus respectivas paginas

 No supe implementar muy bien los fetchs al no tener un backend. La informacion esta mockeada en "public/data/formInfo.Mockup.json" e intente consumirla con useQuery pero no creo que sea la mejor solucion

 
**Typado**

- GET -> se recibe un objeto que tendria un tipico responseWrapper y en data un array con objetos del siguiente tipo: 

  type IquestionResponse = {
      id: number;
      language: "es" | "en";
      answered: boolean;
      amountOfQuestions?: number;
      presentation?: IPresentation;
      questions?: IQuestion[];
      ending: IEnding;
  };

    type IPresentationButton = {
        buttonTitle: string;
        modalParagraphs: string;
    };
    
    type IPresentation = {
        title?: string;
        paragraphs?: string[];
        buttons: IPresentationButton[];
    };
    
    type IEnding = {
        title: string;
        paragraphs: string[];
    };

- POST -> Envia un array del siguente tipo con todas las respuestas juntas:

  export type IAnwerType = {
      id: number;
      questionType: IQuestionType;
      answer: string | number;
      answerId?: number;
      extraAnswer?: string;
  };

