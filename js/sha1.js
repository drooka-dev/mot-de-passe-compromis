/* Hachage SHA-1 effectué localement, dans le navigateur. */
window.App = window.App || {};

App.sha1 = async function sha1(str){
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('').toUpperCase();
};
