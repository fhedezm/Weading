let invitacionData = null;

fetch('https://script.google.com/macros/s/AKfycbzinEhIkN2_lP8hrjxnWK4nBU9skazAVSuU_RY8giKAAe1jnNGXx6Zzqo7570o85aUfrw/exec')
  .then(res => res.json())
  .then(data => {
    console.log('DATA:', data); // para debug

    invitacionData = data;

    // Validar que sí vienen datos
    if (!data || !data.Pass || !data.Name) {
      console.error('Datos incompletos:', data);
      return;
    }

    document.getElementById('Pass').textContent =
      data.Pass === 1 ? '1 persona' : `${data.Pass} personas`;

    document.getElementById('Name').textContent = data.Name;

    // Evento botón
    document.getElementById('btnConfirmar').addEventListener('click', () => {
      const valor = document.getElementById('confirm').value;

      if (valor === '') {
        alert('Selecciona una opción');
        return;
      }

      const payload = {
        ID: id,
        Name: document.getElementById('name').value,
        Pass: valor,// aquí mandas lo que seleccionaron
        Invitation: '',
        Phone: document.getElementById('phone').value,
        Notes: ''
      };

      console.log('Payload:', payload);

      fetch('https://script.google.com/macros/s/AKfycbzinEhIkN2_lP8hrjxnWK4nBU9skazAVSuU_RY8giKAAe1jnNGXx6Zzqo7570o85aUfrw/exec', {
        method: 'POST',
        body: new URLSearchParams(payload)
      })
      .then(res => res.json())
      .then(resp => {
        console.log('Respuesta:', resp);
        mostrarToast(); // aquí tu mensajito bonito
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  })
  .catch(err => {
    console.error('Error cargando datos:', err);
  });