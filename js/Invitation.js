const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  console.error('No hay ID en la URL');
} else {
  fetch(`https://script.google.com/macros/s/AKfycbzinEhIkN2_lP8hrjxnWK4nBU9skazAVSuU_RY8giKAAe1jnNGXx6Zzqo7570o85aUfrw/exec?id=${id}`)
    .then(response => response.json())
    .then(data => {
    document.getElementById('Pass').textContent =
    data.Pass === 1 ? '1 persona' : `${data.Pass} personas`;
      document.getElementById('Name').textContent = data.Name;

      const select = document.getElementById('confirm');
      select.innerHTML = '';

      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Selecciona';
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);

      for (let i = 1; i <= data.Pass; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i === 1 ? '1 persona' : `${i} personas`;
        select.appendChild(option);
      }

      const declineOption = document.createElement('option');
      declineOption.value = '0';
      declineOption.textContent = 'Lo siento, no podré asistir';
      select.appendChild(declineOption);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

