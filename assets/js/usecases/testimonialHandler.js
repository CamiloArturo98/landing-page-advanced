import { domHandler } from "./domHandler.js";

/**
 * Módulo para manejar operaciones CRUD de testimonios
 * @module testimonialHandler
 */
export const testimonialHandler = ( (  ) => {
    /**
     * Agrega un nuevo testimonio
     * @param {string} text - Texto del testimonio
     * @param {string} author - Autor del testimonio
     */
    const addTestimonial = ( text = "¡Excelente producto!", author = "Cliente satisfecho" ) => {

        const newTestimonial = { text, author };
        let testimonials = getTestimonials (  );
        testimonials.push ( newTestimonial );
        saveTestimonials  (   testimonials );
    
    };

    /**
     * Obtiene todos los testimonios
     * @returns {Array} Lista de testimonios
     */
    const getTestimonials = (  ) => {

        return JSON.parse ( sessionStorage.getItem ( "testimonials" ) ) || [  ];
    
    };

    /**
     * Actualiza un testimonio existente
     * @param {number} index - Índice del testimonio
     * @param {string} text - Nuevo texto
     * @param {string} author - Nuevo autor
     */
    const updateTestimonial = ( index, text, author ) => {
        if ( !text.trim (  ) || !author.trim (  ) ) {

            throw new Error ( "Texto y autor son requeridos" );
        
        }

        let testimonials = getTestimonials (  );
        
        if ( index < 0 || index >= testimonials.length ) {

            throw new Error ( "Índice inválido" );
        
        }

        testimonials [ index ] = { text, author };
        saveTestimonials( testimonials );
    
    };

    /**
     * Elimina un testimonio
     * @param {number} index - Índice del testimonio a eliminar
     */
    const deleteTestimonial = ( index ) => {

        let testimonials = getTestimonials (  );

        if ( index < 0 || index >= testimonials.length ) {

            throw new Error ( "Índice inválido" );
        
        }
        
        testimonials.splice (   index, 1   );
        saveTestimonials    ( testimonials );
    
    };

    /**
     * Guarda testimonios en sessionStorage y actualiza el DOM
     * @param {Array} testimonials - Lista de testimonios
     */
    const saveTestimonials = ( testimonials ) => {

        sessionStorage.setItem ( "testimonials", JSON.stringify ( testimonials ) );
        domHandler.renderTestimonials ( testimonials );
    
    };

    return {

        addTestimonial,
        getTestimonials,
        updateTestimonial,
        deleteTestimonial
    
    };
    
} ) (  );