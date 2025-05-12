/**
 * Módulo para manipulación del DOM
 * @module domHandler
 */
export const domHandler = ( (  ) => {

    /**
     * Renderiza testimonios en el DOM
     * @param {Array} testimonials - Lista de testimonios
     */
    const renderTestimonials = ( testimonials ) => {

        const container = document.getElementById ( "testimonials-list" );
        container.innerHTML = testimonials.map ( ( testimonial, index ) => `
            <div class="testimonial" data-index="${index}">
                <div class="testimonial-content">
                    <p>${testimonial.text}</p>
                    <p class="author">- ${testimonial.author}</p>
                </div>
                <div class="testimonial-actions">
                    <button class="btn btn-edit" data-index="${index}">Editar</button>
                    <button class="btn btn-delete" data-index="${index}">Eliminar</button>
                </div>
                <form class="edit-form" data-index="${index}" style="display: none;">
                    <textarea required>${testimonial.text}</textarea>
                    <input type="text" required value="${testimonial.author}">
                    <div class="form-actions">
                        <button type="submit" class="btn btn-save">Guardar</button>
                        <button type="button" class="btn btn-cancel">Cancelar</button>
                    </div>
                </form>
            </div>
        ` ).join ( "" );

    };

    /**
     * Renderiza FAQs en el DOM
     * @param {Array} faqs - Lista de preguntas frecuentes
     */
    const renderFaqs = ( faqs ) => {

        const container = document.getElementById ( "faq-list" );

        container.innerHTML = faqs.map ( ( faq, index ) => `
            <div class="faq-item" data-index="${index}">
                <div class="faq-question">${faq.question}</div>
                <div class="faq-answer">${faq.answer}</div>
                <div class="faq-actions">
                    <button class="btn btn-edit-faq" data-index="${index}">Editar</button>
                    <button class="btn btn-delete-faq" data-index="${index}">Eliminar</button>
                </div>
                <form class="edit-faq-form" data-index="${index}" style="display: none;">
                    <input type="text" value="${faq.question}" required>
                    <textarea required>${faq.answer}</textarea>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-save">Guardar</button>
                        <button type="button" class="btn btn-cancel">Cancelar</button>
                    </div>
                </form>
            </div>
        ` ).join ( "" );
    };

    return { renderTestimonials, renderFaqs };
    
} ) (  );