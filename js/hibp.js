/* Interrogation de l'API Pwned Passwords en k-anonymat :
   seuls les 5 premiers caractères du hash quittent le navigateur. */
window.App = window.App || {};

App.API_URL = 'https://api.pwnedpasswords.com/range/';

/* Renvoie le nombre de fuites connues pour ce mot de passe (0 si aucune). */
App.countLeaks = async function countLeaks(password){
  const hash = await App.sha1(password);
  const prefix = hash.slice(0,5), suffix = hash.slice(5);

  const res = await fetch(App.API_URL + prefix);
  if(!res.ok) throw new Error('HTTP ' + res.status);
  const body = await res.text();

  for(const line of body.split('\n')){
    const [s, c] = line.trim().split(':');
    if(s === suffix) return parseInt(c, 10);
  }
  return 0;
};
