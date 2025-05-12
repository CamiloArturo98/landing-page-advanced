import { domHandler } from "./domHandler.js";

/**
 * Módulo para manejar operaciones CRUD de FAQs
 * @module faqHandler
 */
export const faqHandler = ( (  ) => {

    /**
     * Agrega una nueva FAQ
     * @param {string} question - La pregunta
     * @param {string} answer - La respuesta
     */
    
    const addFaq = ( question = "Nueva pregunta", answer = "Nueva respuesta" ) => {

        const newFaq = { question, answer };
        let faqs = getFaqs (  );
        faqs.push ( newFaq );
        saveFaqs  (  faqs  );
    
    };

    /**
     * Obtiene todas las FAQs
     * @returns {Array} Lista de FAQs
     */
    const getFaqs = (  ) => {

        return JSON.parse ( sessionStorage.getItem ( "faqs" ) ) || [  ];
    
    };

    /**
     * Actualiza una FAQ existente
     * @param {number} index - Índice de la FAQ
     * @param {string} question - Nueva pregunta
     * @param {string} answer - Nueva respuesta
     */
    const updateFaq = ( index, question, answer ) => {

        if ( !question.trim (  ) || !answer.trim (  ) ) {

            throw new Error ( "Pregunta y respuesta son requeridas" );
        
        }

        let faqs = getFaqs (  );

        if ( index < 0 || index >= faqs.length ) {

            throw new Error("Índice inválido");
        
        }

        faqs [ index ] = { question, answer };
        saveFaqs ( faqs );
    };

    /**
     * Elimina una FAQ
     * @param {number} index - Índice de la FAQ a eliminar
     */
    const deleteFaq = ( index ) => {

        let faqs = getFaqs (  );

        if ( index < 0 || index >= faqs.length ) {

            throw new Error ( "Índice inválido" );
        
        }
        
        faqs.splice ( index, 1 );
        saveFaqs ( faqs );
    
    };

    /**
     * Guarda FAQs en sessionStorage y actualiza el DOM
     * @param {Array} faqs - Lista de FAQs
     */
    const saveFaqs = ( faqs ) => {

        sessionStorage.setItem ( "faqs", JSON.stringify ( faqs ) );
        domHandler.renderFaqs ( faqs );
    
    };

    /**
     * Maneja el acordeón de FAQs
     */
    const handleFaqAccordion = (  ) => {

        document.addEventListener ( "click", ( e ) => {

            if ( e.target.classList.contains ( "faq-question" ) ) {

                const answer = e.target.nextElementSibling;
                answer.style.display = answer.style.display === "none" ? "block" : "none";
                e.target.classList.toggle ( "active" );
            
            }

        } );

    };

    return {
        
        addFaq,
        getFaqs,
        updateFaq,
        deleteFaq,
        handleFaqAccordion
    
    };
    
} ) (  );