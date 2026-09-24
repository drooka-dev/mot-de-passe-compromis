/* Câblage de l'interface : saisie, vérification, affichage du résultat. */
(function(){
  const pwInput   = document.getElementById('pwInput');
  const toggleEye = document.getElementById('toggleEye');
  const checkBtn  = document.getElementById('checkBtn');
  const loading   = document.getElementById('loading');
  const errorBox  = document.getElementById('errorBox');
  const resultEl  = document.getElementById('result');

  pwInput.addEventListener('input', ()=>{
    checkBtn.disabled = pwInput.value.length === 0;
    resultEl.className = 'result';
    errorBox.className = 'error';
  });
  pwInput.addEventListener('keydown', e=>{ if(e.key==='Enter' && !checkBtn.disabled) check(); });

  toggleEye.addEventListener('click', ()=>{
    const isPw = pwInput.type === 'password';
    pwInput.type = isPw ? 'text' : 'password';
    toggleEye.textContent = isPw ? '🙈' : '👁️';
  });

  function showLeaked(count){
    resultEl.className = 'result leaked show';
    resultEl.innerHTML = `
      <div class="result-icon">⚠️</div>
      <h2>Mot de passe compromis</h2>
      <p>Il a été vu <span class="count mono">${count.toLocaleString('fr-FR')}</span> fois dans des fuites de données connues. Il ne faut plus l'utiliser nulle part — change-le dès que possible, en particulier s'il sert ailleurs.</p>`;
  }

  function showSafe(pw){
    const note = App.strengthNote(pw);
    resultEl.className = 'result safe show';
    resultEl.innerHTML = `
      <div class="result-icon">✅</div>
      <h2>Aucune fuite connue</h2>
      <p>Ce mot de passe n'apparaît dans aucune base de fuites référencée.${note ? ' ' + note : ''}</p>`;
  }

  async function check(){
    const pw = pwInput.value;
    if(!pw) return;
    errorBox.className = 'error';
    resultEl.className = 'result';
    loading.className = 'loading show';
    checkBtn.disabled = true;

    try{
      const count = await App.countLeaks(pw);
      if(count > 0) showLeaked(count); else showSafe(pw);
    }catch(e){
      errorBox.className = 'error show';
      errorBox.textContent = `Impossible de contacter le service de vérification (${e.message}). Réessaie dans un instant.`;
    }finally{
      loading.className = 'loading';
      checkBtn.disabled = false;
    }
  }

  checkBtn.addEventListener('click', check);
})();
