const fs = require('fs');

const langs = [
  {
    code: 'pt-PT',
    dict: {
      nav: {
        latest: 'Últimas',
        intemporais: 'Máquinas Intemporais',
        atlantica: 'Viagem Atlântica',
        videos: 'Vídeos',
        iconicas: 'Histórias Icónicas',
        encontros: 'Encontros 3G',
        copiloto: 'Copiloto'
      },
      footer: {
        about: 'Quem somos',
        editorial: 'Estatuto Editorial',
        ficha: 'Ficha Técnica',
        contact: 'Contactos',
        privacy: 'Política de Privacidade',
        cookies: 'Política de Cookies',
        terms: 'Termos de Utilização',
        subscribe: 'Subscrever',
        rights: 'Todos os direitos reservados',
        sections: 'Secções',
        others: 'Outros'
      }
    }
  },
  {
    code: 'en-US',
    dict: {
      nav: {
        latest: 'Latest',
        intemporais: 'Timeless Machines',
        atlantica: 'Atlantic Journey',
        videos: 'Videos',
        iconicas: 'Iconic Stories',
        encontros: '3G Meets',
        copiloto: 'Co-pilot'
      },
      footer: {
        about: 'About Us',
        editorial: 'Editorial Status',
        ficha: 'Technical Info',
        contact: 'Contacts',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        terms: 'Terms of Use',
        subscribe: 'Subscribe',
        rights: 'All rights reserved',
        sections: 'Sections',
        others: 'Others'
      }
    }
  },
  {
    code: 'es-ES',
    dict: {
      nav: {
        latest: 'Últimas',
        intemporais: 'Máquinas Atemporales',
        atlantica: 'Viaje Atlántico',
        videos: 'Videos',
        iconicas: 'Historias Icónicas',
        encontros: 'Encuentros 3G',
        copiloto: 'Copiloto'
      },
      footer: {
        about: 'Quiénes somos',
        editorial: 'Estatus Editorial',
        ficha: 'Ficha Técnica',
        contact: 'Contactos',
        privacy: 'Política de Privacidad',
        cookies: 'Política de Cookies',
        terms: 'Términos de Uso',
        subscribe: 'Suscribirse',
        rights: 'Todos los derechos reservados',
        sections: 'Secciones',
        others: 'Otros'
      }
    }
  },
  {
    code: 'it-IT',
    dict: {
      nav: {
        latest: 'Ultime',
        intemporais: 'Macchine Senza Tempo',
        atlantica: 'Viaggio Atlantico',
        videos: 'Video',
        iconicas: 'Storie Iconiche',
        encontros: 'Incontri 3G',
        copiloto: 'Copilota'
      },
      footer: {
        about: 'Chi siamo',
        editorial: 'Status Editoriale',
        ficha: 'Scheda Tecnica',
        contact: 'Contatti',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        terms: 'Termini di Utilizzo',
        subscribe: 'Iscriviti',
        rights: 'Tutti i diritti riservati',
        sections: 'Sezioni',
        others: 'Altri'
      }
    }
  }
];

langs.forEach(l => {
  fs.writeFileSync(
    `./dictionaries/${l.code}.json`, 
    JSON.stringify(l.dict, null, 2)
  );
});
console.log('Dictionaries updated!');
