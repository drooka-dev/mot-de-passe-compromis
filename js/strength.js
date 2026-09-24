/* Conseil complémentaire sur la robustesse, affiché quand aucune fuite n'est trouvée. */
window.App = window.App || {};

App.strengthNote = function strengthNote(pw){
  const len = pw.length;
  const variety = [/[a-z]/,/[A-Z]/,/[0-9]/,/[^a-zA-Z0-9]/].filter(r=>r.test(pw)).length;
  if(len < 8) return "Il est aussi assez court : viser au moins 12-16 caractères renforce beaucoup la sécurité.";
  if(variety < 3) return "Il pourrait aussi gagner en robustesse en mélangeant majuscules, chiffres et symboles.";
  return null;
};
