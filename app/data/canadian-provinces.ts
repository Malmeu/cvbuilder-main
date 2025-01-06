interface ProvinceName {
  fr: string;
  en: string;
}

interface Province {
  code: string;
  name: ProvinceName;
}

export const provinces: Province[] = [
  {
    code: 'QC',
    name: {
      fr: 'Québec',
      en: 'Quebec'
    }
  },
  {
    code: 'ON',
    name: {
      fr: 'Ontario',
      en: 'Ontario'
    }
  },
  {
    code: 'BC',
    name: {
      fr: 'Colombie-Britannique',
      en: 'British Columbia'
    }
  },
  {
    code: 'AB',
    name: {
      fr: 'Alberta',
      en: 'Alberta'
    }
  },
  {
    code: 'MB',
    name: {
      fr: 'Manitoba',
      en: 'Manitoba'
    }
  },
  {
    code: 'SK',
    name: {
      fr: 'Saskatchewan',
      en: 'Saskatchewan'
    }
  },
  {
    code: 'NS',
    name: {
      fr: 'Nouvelle-Écosse',
      en: 'Nova Scotia'
    }
  },
  {
    code: 'NB',
    name: {
      fr: 'Nouveau-Brunswick',
      en: 'New Brunswick'
    }
  },
  {
    code: 'NL',
    name: {
      fr: 'Terre-Neuve-et-Labrador',
      en: 'Newfoundland and Labrador'
    }
  },
  {
    code: 'PE',
    name: {
      fr: 'Île-du-Prince-Édouard',
      en: 'Prince Edward Island'
    }
  },
  {
    code: 'NT',
    name: {
      fr: 'Territoires du Nord-Ouest',
      en: 'Northwest Territories'
    }
  },
  {
    code: 'YT',
    name: {
      fr: 'Yukon',
      en: 'Yukon'
    }
  },
  {
    code: 'NU',
    name: {
      fr: 'Nunavut',
      en: 'Nunavut'
    }
  }
];
