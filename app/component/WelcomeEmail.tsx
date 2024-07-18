interface WelcomeEmailProps {
    username: string;
    password: string;
    loginUrl: string;
}

const WelcomeEmail = ({ username, password, loginUrl }: WelcomeEmailProps) => {
    return (
        <div className="bg-gray-300">
            <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg">
                <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
                    <h1 className="text-2xl font-bold">
                        ¡Bienvenido a Rx Country!
                    </h1>
                </div>
                <div className="p-6">
                    <p className="text-gray-700 text-lg">
                        Hola <span className="font-bold">{username}</span>,
                    </p>
                    <p className="mt-4 text-gray-700">
                        Estamos encantados de tenerte con nosotros. Gracias por
                        regístrate en nuestra plataforma. Esperamos que tengas
                        la mejor experiencia posible.
                    </p>
                    <p className="mt-4 text-gray-700">
                        Aquí están tus credenciales para iniciar sesión:
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                        <p className="text-gray-700">
                            <strong>Usuario:</strong> {username}
                        </p>
                        <p className="text-gray-700">
                            <strong>Contraseña:</strong> {password}
                        </p>
                    </div>
                    <p className="mt-4 text-gray-700">
                        Puedes comenzar explorando nuestras características y
                        realizar todos tus procesos satisfactoriamente.
                    </p>
                    <a
                        href={loginUrl}
                        className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Iniciar Sesión
                    </a>
                </div>
                <div className="text-center py-4 text-gray-600 text-sm border-t">
                    <p>
                        Si tienes alguna pregunta, no dudes en{" "}
                        <a
                            href="mailto:soporte@ejemplo.com"
                            className="text-blue-600"
                        >
                            contactarnos
                        </a>
                        .
                    </p>
                    <p className="mt-2">
                        © 2024 Nuestra Comunidad. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeEmail;
