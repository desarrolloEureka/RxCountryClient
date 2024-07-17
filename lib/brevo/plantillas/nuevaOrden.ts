export const plantillaNuevaOrden = (data: any): string => {
    const plantilla = `
                <!DOCTYPE html>
                <html lang="es">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Nueva Orden Generada</title>
                    </head>
                    <body style="background-color: #e2e8f0;">
                        <div style="max-width: 32rem; margin: 2.5rem auto; background-color: #ffffff; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
                            <div style="background-color: #2563eb; color: #ffffff; text-align: center; padding: 1rem; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;">
                                <h1 style="font-size: 1.5rem; font-weight: bold;">Nueva Orden Generada</h1>
                            </div>
                            <div style="padding: 1.5rem;">
                                <p style="color: #4a5568; font-size: 1.125rem;">Hola <span style="font-weight: bold;">${data.name} ${data.lastName}</span>,</p>
                                <p style="margin-top: 1rem; color: #4a5568;">
                                    Nos complace informarte que se ha generado una nueva orden en nuestra plataforma. A continuación, encontrarás los detalles de tu orden:
                                </p>
                                <div style="background-color: #f7fafc; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
                                    <p style="color: #4a5568;"><strong>Número de Orden:</strong> ${data.uid}</p>
                                    <p style="color: #4a5568;"><strong>Nombre del Profesional:</strong> ${data.professionalName}</p>
                                    <p style="color: #4a5568;"><strong>Especialidad del Profesional:</strong> ${data.professionalSpecialty}</p>
                                    <p style="color: #4a5568;"><strong>Correo:</strong> ${data.professionalEmail}</p>
                                    <p style="color: #4a5568;"><strong>Fecha de Creación:</strong> ${data.orderDate}</p>
                                </div>
                            </div>
                            <div style="text-align: center; padding: 1rem; color: #718096; font-size: 0.875rem; border-top: 1px solid #e2e8f0;">
                                <p>
                                    Si tienes alguna pregunta, no dudes en
                                    <a href="mailto:${data.contactEmail}" style="color: #2563eb; text-decoration: none;">contactarnos</a>.
                                </p>
                                <p style="margin-top: 0.5rem;">© 2024 Rx Country. Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </body>
                </html>
`;
    return plantilla;
};
