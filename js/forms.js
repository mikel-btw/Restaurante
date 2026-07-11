/**
 * ARCHIVO: forms.js
 * PROPÓSITO: Validación en cliente y envío simulado de los
 *   formularios de Reservas y Contacto.
 * RESPONSABILIDAD: Validar campos requeridos, formato de correo
 *   y teléfono, mostrar mensajes de error accesibles y el estado
 *   de éxito. NO realiza la persistencia real de datos: ese es
 *   un punto de integración marcado explícitamente abajo.
 *
 * ══════════════════════════════════════════════════════════
 * ZONA EDITABLE — INTEGRACIÓN DE ENVÍO REAL
 * Actualmente `submitForm()` simula un envío exitoso tras 900ms.
 * Para conectar un backend real (ej. Formspree, un endpoint
 * propio, EmailJS, o una API de reservas), reemplazar el cuerpo
 * de `submitForm()` por el fetch() correspondiente. Buscar el
 * comentario "INTEGRACIÓN BACKEND AQUÍ" más abajo.
 * ══════════════════════════════════════════════════════════
 *
 * DEPENDENCIAS: utils.js
 * AUTOR: Equipo de desarrollo — El Leñador de Colombia
 * FECHA DE CREACIÓN: 2026-07-10
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  Utils.qsa('form[data-validate]').forEach((form) => initForm(form));
});

function initForm(form) {
  form.setAttribute('novalidate', 'true');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = Utils.qsa('[data-required], [data-type]', form);
    let isValid = true;

    fields.forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      const firstError = Utils.qs('.form-field.has-error input, .form-field.has-error select, .form-field.has-error textarea', form);
      firstError?.focus();
      return;
    }

    await submitForm(form);
  });

  // Validación en vivo al salir del campo (blur)
  Utils.qsa('[data-required], [data-type]', form).forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });
}

function validateField(field) {
  const wrapper = field.closest('.form-field');
  if (!wrapper) return true;

  const value = field.value.trim();
  let valid = true;

  if (field.hasAttribute('data-required') && value === '') {
    valid = false;
  }

  if (valid && field.dataset.type === 'email' && value !== '') {
    valid = Utils.isValidEmail(value);
  }

  if (valid && field.dataset.type === 'phone' && value !== '') {
    valid = Utils.isValidPhoneCO(value);
  }

  if (valid && field.type === 'date' && value !== '') {
    const selected = new Date(value + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    valid = selected >= today;
  }

  wrapper.classList.toggle('has-error', !valid);
  field.setAttribute('aria-invalid', String(!valid));

  return valid;
}

async function submitForm(form) {
  const submitBtn = Utils.qs('button[type="submit"]', form);
  const originalText = submitBtn?.innerHTML;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Enviando...';
  }

  try {
    // ---------------------------------------------------------
    // INTEGRACIÓN BACKEND AQUÍ
    // Ejemplo de reemplazo real:
    //
    // const formData = new FormData(form);
    // const response = await fetch('https://tu-endpoint-real.com/api/reservas', {
    //   method: 'POST',
    //   body: formData,
    // });
    // if (!response.ok) throw new Error('Error del servidor');
    //
    // Simulación actual (sin backend conectado todavía):
    await new Promise((resolve) => setTimeout(resolve, 900));
    // ---------------------------------------------------------

    showSuccess(form);
    form.reset();
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    alert('Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo o contáctanos por WhatsApp.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}

function showSuccess(form) {
  const successBox = form.parentElement.querySelector('.form-success') || Utils.qs('.form-success');
  if (!successBox) return;

  successBox.classList.add('is-visible');
  successBox.setAttribute('role', 'status');
  successBox.focus?.();

  setTimeout(() => successBox.classList.remove('is-visible'), 6000);
}
