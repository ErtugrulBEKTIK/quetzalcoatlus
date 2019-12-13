
export function range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  let result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

export function reverse(str){
  let stringRev ="";
  for(let i= 0; i<str.length; i++){
    stringRev = str[i]+stringRev;
  }
  return stringRev;
}

export function toLowerCase(string){
  const letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
  string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter){ return letters[letter]; });
  return string.toLowerCase();
}

export function toUpperCase(string){
  const letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
  string = string.replace(/(([iışğüçö]))/g, function(letter){ return letters[letter]; });
  return string.toUpperCase();
}

export function capitalizeFirstLetter(string) {
  const lowered = toLowerCase(string);
  return `${lowered}`.charAt(0).toUpperCase() + lowered.slice(1);
}

export function capitalizeWord(string) {
  const lowered = toLowerCase(string);
  const splitStr = lowered.split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = toUpperCase(splitStr[i].charAt(0)) + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}

export function random(digit) {
  return Math.floor(Math.random() * Math.pow(10, digit))
}

export function sef(text) {
  const trMap = {
    'çÇ':'c',
    'ğĞ':'g',
    'şŞ':'s',
    'üÜ':'u',
    'ıİ':'i',
    'öÖ':'o'
  };
  for(let key in trMap) {
    text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
  }
  return  text.replace(/[^-_.a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
              .replace(/\./gi, "-") // convert dots to dashes
              .replace(/_/gi, "-") // convert underscores to dashes
              .replace(/\s/gi, "-") // convert spaces to dashes
              .replace(/[-]+/gi, "-") // trim repeated dashes
              .toLowerCase();

}

export function b2a(a) {
  var c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = [];
  if (!a) return a;
  do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e,
    f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < a.length);
  return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) :m) + "===".slice(o || 3);
}

