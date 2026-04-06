import 'server-only'

const dictionaries = {
  'pt-PT': () => import('../dictionaries/pt-PT.json').then((module) => module.default),
  'en-US': () => import('../dictionaries/en-US.json').then((module) => module.default),
  'es-ES': () => import('../dictionaries/es-ES.json').then((module) => module.default),
  'it-IT': () => import('../dictionaries/it-IT.json').then((module) => module.default),
}

export const getDictionary = async (locale) => {
  if (typeof dictionaries[locale] === 'function') {
    return dictionaries[locale]();
  }
  return dictionaries['pt-PT']();
}
