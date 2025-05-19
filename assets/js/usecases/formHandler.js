/**
 * Módulo para manejar la lógica del formulario de contacto
 * @module formHandler
 */
export const formHandler = ( (  ) => {

    /**
     * Valida un campo de email
     * @param {string} email - Email a validar
     * @returns {boolean} True si el email es válido
     */
    const validateEmail = ( email ) => {

        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test ( String ( email ).toLowerCase (  ) );
    
    };

    /**
     * Valida un campo de texto
     * @param {string} text - Texto a validar
     * @param {number} min - Longitud mínima
     * @param {number} max - Longitud máxima
     * @returns {boolean} True si el texto es válido
     */
    
    const validateText = ( text, min = 2, max = 500 ) => {

        return text.length >= min && text.length <= max;
    
    };

    /**
     * Muestra un error en un campo
     * @param {HTMLElement} field - Campo a marcar como inválido
     * @param {string} message - Mensaje de error
     */
    const showFieldError = ( field, message ) => {

        const errorElement = field.nextElementSibling;
        
        if ( errorElement && errorElement.classList.contains ( "error-message" ) ) {

            errorElement.textContent = message;
        
        } else {

            const errorMsg       = document.createElement ( "div" );
            errorMsg.className   = "error-message";
            errorMsg.textContent = message;
            field.parentNode.insertBefore ( errorMsg, field.nextSibling );
        
        }

        field.classList.add ( "invalid" );
    
    };

    /**
     * Limpia el error de un campo
     * @param {HTMLElement} field - Campo a limpiar
     */
    const clearFieldError = ( field ) => {

        field.classList.remove ( "invalid" );
        const errorElement = field.nextElementSibling;
        
        if ( errorElement && errorElement.classList.contains ( "error-message" ) ) {

            errorElement.remove (  );
        
        }

    };

    /**
     * Valida todos los campos del formulario
     * @returns {boolean} True si todos los campos son válidos
     */
    const validateForm = (  ) => {

        let isValid      = true;
        const   name     = document.getElementById ( "name"    ),
                email    = document.getElementById ( "email"   ),
                message  = document.getElementById ( "message" );

        // Validar nombre
        if ( !validateText ( name.value, 2, 100 ) ) {

            showFieldError ( name, "El nombre debe tener entre 2 y 100 caracteres" );
            isValid = false;
        
        } else {

            clearFieldError ( name );
        
        }

        // Validar email
        if ( !validateEmail ( email.value ) ) {

            showFieldError ( email, "Por favor ingresa un email válido" );
            isValid = false;
        
        } else {

            clearFieldError ( email );
        
        }

        // Validar mensaje
        if ( !validateText ( message.value, 10, 1000 ) ) {

            showFieldError ( message, "El mensaje debe tener entre 10 y 1000 caracteres" );
            isValid = false;
        
        } else {

            clearFieldError ( message );
        
        }

        return isValid;
    
    };

    /**
     * Maneja el envío del formulario
     * @param {Event} event - Evento de envío
     */
    const handleFormSubmit = ( event ) => {

        event.preventDefault (  );
        
        if ( validateForm (  ) ) {

            const formData = {

                name:    document.getElementById ( "name"    ).value,
                email:   document.getElementById ( "email"   ).value,
                message: document.getElementById ( "message" ).value
            
            };
            
            simulateFormSubmission ( formData );
        
        }
    
    };

    /**
     * Configura la validación en tiempo real
     */
    const setupLiveValidation = (  ) => {

        document.getElementById ( "name" ).addEventListener ( "blur", ( e ) => {

            if ( !validateText ( e.target.value, 2, 100 ) ) {

                showFieldError ( e.target, "El nombre debe tener entre 2 y 100 caracteres" );
            
            } else {

                clearFieldError ( e.target );
            
            }

        } );

        document.getElementById ( "email" ).addEventListener ( "input", ( e ) => {

            if ( e.target.value && !validateEmail ( e.target.value ) ) {

                showFieldError ( e.target, "Por favor ingresa un email válido" );
            
            } else {

                clearFieldError ( e.target );
            }

        } );

        document.getElementById ( "message" ).addEventListener ( "blur", ( e ) => {
            if ( !validateText ( e.target.value, 10, 1000 ) ) {

                showFieldError ( e.target, "El mensaje debe tener entre 10 y 1000 caracteres" );
            
            } else {

                clearFieldError ( e.target );
            
            }
        
        });
    
    };

    /**
     * Simula el envío del formulario
     * @param {Object} formData - Datos del formulario
     */
    const simulateFormSubmission  = ( formData ) => {

        const statusElement       = document.getElementById ( "form-status" );
        statusElement.textContent = "Enviando...";
        statusElement.className   = "form-status";


            statusElement.textContent = "¡Formulario enviado con éxito!";
            statusElement.classList.add ( "success" );
            console.log ( "Datos enviados:", formData );

        setTimeout ( (  ) => {

            statusElement.textContent = '';
            statusElement.classList.remove ( 'success' )

        }, 5000 );

            // Resetear formulario
            document.getElementById ( "contact-form" ).reset (  );

    };

// Inicializar validación en tiempo real al cargar
document.addEventListener ( "DOMContentLoaded", setupLiveValidation );

document.addEventListener ( 'DOMContentLoaded', (  ) => {

const form = document.getElementById( 'contact-form' );

    if ( !form ) {
        
        console.warn( "Formulario con ID 'contact-form' no encontrado." );
        
        return;

}

const inputs = form.querySelectorAll( 'input[name], textarea[name], select[name]');

inputs.forEach( input => {
    // Cargar valores guardados
    const savedValue = sessionStorage.getItem( input.name );
    if ( savedValue ) {
    
        input.value = savedValue;
    
}

    // Guardar cada vez que se escribe o se cambia algo
    input.addEventListener( 'input', (  ) => {
    sessionStorage.setItem ( input.name, input.value );
    // console.log( `Guardado en sessionStorage: ${input.name} = ${input.value}` );
    
    });

});

});

    return { handleFormSubmit };

} )(  );