import { formHandler } from "./usecases/formHandler.js";
import { domHandler } from "./usecases/domHandler.js";
import { faqHandler } from "./usecases/faqHandler.js";
import { testimonialHandler } from "./usecases/testimonialHandler.js";

// Cargar contenido inicial
document.addEventListener( "DOMContentLoaded", (  ) => {

    // Inicializar datos
    if ( !sessionStorage.getItem ( "testimonials" ) ) {

        sessionStorage.setItem ( "testimonials", JSON.stringify ( [

            { text: "Gran producto, muy satisfecho", author: "Cliente 1" },
            { text: "Excelente servicio al cliente", author: "Cliente 2" }
        
        ] ) );
    
    }

    if ( !sessionStorage.getItem ( "faqs" ) ) {

        sessionStorage.setItem ( "faqs", JSON.stringify ( [

            { question: "¿Cómo realizo una compra?", answer: "Puedes comprar directamente en nuestra tienda online." },
            { question: "¿Cuánto tarda el envío?",   answer: "El envío estándar tarda 3-5 días hábiles." }
        
        ] ) );
    
    }

    // Renderizar contenido inicial
    domHandler.renderTestimonials ( testimonialHandler.getTestimonials (  ) );
    domHandler.renderFaqs ( faqHandler.getFaqs (  ) );
    faqHandler.handleFaqAccordion (  );

    // Configurar manejadores de eventos
    document.getElementById ( "contact-form"    ).addEventListener ( "submit", formHandler.handleFormSubmit );
    document.getElementById ( "add-testimonial" ).addEventListener ( "click", (  ) => testimonialHandler.addTestimonial (  ) );
    document.getElementById (   "add-faq"       ).addEventListener ( "click", (  ) => faqHandler.addFaq (  ) );

    // Manejador global para testimonios y FAQs
    document.addEventListener ( "click", ( e ) => {

        // Testimonios - Editar
        if ( e.target.classList.contains ( "btn-edit" ) ) {

            const index = e.target.dataset.index;
            document.querySelector ( `.testimonial[data-index="${ index }"] .testimonial-content` ).style.display = "none";
            document.querySelector ( `.testimonial[data-index="${ index }"] .edit-form`           ).style.display = "block";
        
        }

        // Testimonios - Eliminar
        if ( e.target.classList.contains ( "btn-delete" ) ) {

            if ( confirm ( "¿Estás seguro de eliminar este testimonio?" ) ) {

                testimonialHandler.deleteTestimonial ( parseInt ( e.target.dataset.index ) );
            
            }

        }

        // Testimonios - Cancelar edición
        if ( e.target.classList.contains ( "btn-cancel" ) && e.target.closest ( ".edit-form" ) ) {

            const form = e.target.closest ( "form" );
            form.style.display = "none";
            form.closest ( ".testimonial" ).querySelector ( ".testimonial-content" ).style.display = "block";
        
        }

        // Testimonios - Guardar edición
        if ( e.target.classList.contains ( "btn-save" ) && e.target.closest ( ".edit-form" ) ) {

            e.preventDefault (  );

            const   form    = e.target.closest ( "form" ),
                    index   = parseInt ( form.dataset.index ),
                    text    = form.querySelector ( "textarea" ).value,
                    author  = form.querySelector ( "input" ).value;

            try {

                testimonialHandler.updateTestimonial ( index, text, author );
            
            } catch ( error ) {

                alert ( error.message );
            
            }

        }

        // FAQs - Editar
        if ( e.target.classList.contains ( "btn-edit-faq" ) ) {

            const   index   = e.target.dataset.index,
                    faqItem = document.querySelector ( `.faq-item[data-index="${ index }"]` );

            faqItem.querySelector ( ".faq-question"  ).style.display = "none";
            faqItem.querySelector (  ".faq-answer"   ).style.display = "none";
            faqItem.querySelector ( ".faq-actions"   ).style.display = "none";
            faqItem.querySelector ( ".edit-faq-form" ).style.display = "block";
        
        }

        // FAQs - Eliminar
        if ( e.target.classList.contains ( "btn-delete-faq" ) ) {

            if ( confirm ( "¿Estás seguro de eliminar esta pregunta?" ) ) {

                faqHandler.deleteFaq ( parseInt ( e.target.dataset.index ) );
            
            }

        }

        // FAQs - Cancelar edición
        if ( e.target.classList.contains ( "btn-cancel" ) && e.target.closest ( ".edit-faq-form" ) ) {

            const   form    = e.target.closest ( "form" ),
                    index   = form.dataset.index,
                    faqItem = document.querySelector ( `.faq-item[data-index="${ index }"]` );
                    
            faqItem.querySelector ( ".faq-question" ).style.display = "block";
            faqItem.querySelector ( ".faq-actions"  ).style.display = "flex";
            form.style.display = "none";
        
    }

        // FAQs - Guardar edición
        if ( e.target.classList.contains ( "btn-save" ) && e.target.closest ( ".edit-faq-form" ) ) {

            e.preventDefault (  );

            const   form     = e.target.closest ( "form" ),
                    index    = parseInt ( form.dataset.index ),
                    question = form.querySelector (  "input"   ).value,
                    answer   = form.querySelector ( "textarea" ).value;

            try {

                faqHandler.updateFaq ( index, question, answer );

            
            } catch ( error ) {

                alert ( error.message );
            
            }

        }

    } );

} );