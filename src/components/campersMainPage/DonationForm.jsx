import { useState } from 'react';
import "./styles/DonationForm.css";

export default function DonationForm() {
    const documentTypes = [
        { id: 'CC', name: 'Cédula de Ciudadanía' },
        { id: 'CE', name: 'Cédula de Extranjería' },
        { id: 'PS', name: 'Pasaporte' },
        { id: 'NIT', name: 'NIT' }
    ];

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        celular: '',
        message: '',
        contribution: '',
        documentType: '',
        documentNumber: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contribution = parseFloat(formData.contribution);
        if (isNaN(contribution) || contribution <= 0) {
            alert('Por favor ingresa un valor válido para la donación.');
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch(endpoints.sponsors, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('¡Gracias por tu contribución!');
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    celular: '',
                    message: '',
                    contribution: '',
                    documentType: '',
                    documentNumber: ''
                });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Intenta nuevamente.'}`);
            }
        } catch (error) {
            alert('Hubo un problema al enviar los datos. Por favor, verifica tu conexión.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="donation-form-card">
            <form onSubmit={handleSubmit} className="donation-form">
                <div className="donation-form-row">
                    <div className="donation-form-group">
                        <label className="donation-form-label">
                            Nombre <span className="donation-required">*</span>
                        </label>
                        <input
                            className="donation-form-input"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            required
                        />
                    </div>
                    <div className="donation-form-group">
                        <label className="donation-form-label">
                            Apellido <span className="donation-required">*</span>
                        </label>
                        <input
                            className="donation-form-input"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Tu apellido"
                            required
                        />
                    </div>
                </div>

                <div className="donation-form-row">
                    <div className="donation-form-group">
                        <label className="donation-form-label">
                            Tipo de Documento <span className="donation-required">*</span>
                        </label>
                        <select
                            className="donation-form-input"
                            name="documentType"
                            value={formData.documentType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona tipo de documento</option>
                            {documentTypes.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="donation-form-group">
                        <label className="donation-form-label">
                            Número de Documento <span className="donation-required">*</span>
                        </label>
                        <input
                            className="donation-form-input"
                            name="documentNumber"
                            value={formData.documentNumber}
                            onChange={handleChange}
                            placeholder="Ingresa tu número de documento"
                            required
                        />
                    </div>
                </div>

                <div className="donation-form-row">
                    <div className="donation-form-group">
                        <label className="donation-form-label">
                            Correo Electrónico <span className="donation-required">*</span>
                        </label>
                        <input
                            className="donation-form-input"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>
                    <div className="donation-form-group">
                        <label className="donation-form-label">
                            Celular <span className="donation-required">*</span>
                        </label>
                        <input
                            className="donation-form-input"
                            type="tel"
                            name="celular"
                            value={formData.celular}
                            onChange={handleChange}
                            placeholder="(321) 123-0203"
                            required
                        />
                    </div>
                </div>

                <div className="donation-form-group">
                    <label className="donation-form-label">
                        Valor de la Donación <span className="donation-required">*</span>
                    </label>
                    <input
                        className="donation-form-input"
                        type="number"
                        name="contribution"
                        value={formData.contribution}
                        onChange={handleChange}
                        placeholder="Ingresa el monto a donar"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="donation-form-group">
                    <label className="donation-form-label">Tu Mensaje!</label>
                    <textarea
                        className="donation-form-textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Deja un mensaje para los campers!"
                    />
                </div>

                <button type="submit" className="donation-submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'PATROCINAR'}
                </button>
            </form>
        </div>
    );
}