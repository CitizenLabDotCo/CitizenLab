const config = {
  defaults: {
    timeout: 30000,
    wait: 5000,
    chromeLaunchConfig: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // headless: false,
    },
    headers: {
      Accept: 'text/html'
    }
  },
  standard: 'WCAG2A',
  urls: process.env.NODE_ENV === 'staging' ? [
    // Every page that has the IdeaCards component
    // will complain a missing submit button for the search field
    // So we ignore this specific rule for such pages
    {
      url: 'https://demo.stg.citizenlab.co/en/',
      ignore: [
        'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2'
      ]
    }, {
      url: 'https://demo.stg.citizenlab.co/en/ideas',
      ignore: [
        'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2'
      ]
    }, {
      url: 'https://demo.stg.citizenlab.co/en/projects/renewing-westbrook-parc/process',
      ignore: [
        'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2'
      ]
    }, {
      url: 'https://demo.stg.citizenlab.co/en/projects/renewing-westbrook-parc/info',
      ignore: [
        'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2'
      ]
    }, {
      url: 'http://localhost:3000/en/profile/koen-gremmelprez',
      ignore: [
        'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2'
      ]
    },
    'https://demo.stg.citizenlab.co/en/projects',
    'https://demo.stg.citizenlab.co/en/projects/renewing-westbrook-parc/events',,
    'https://demo.stg.citizenlab.co/en/ideas/more-box-parking-for-bikes-in-the-centrum',
    'https://demo.stg.citizenlab.co/en/sign-in',
    'https://demo.stg.citizenlab.co/en/sign-up',
    'https://demo.stg.citizenlab.co/en/profile/koen-gremmelprez',
    'https://demo.stg.citizenlab.co/en/ideas/new',
    'https://demo.stg.citizenlab.co/en/projects/open-idea-project/ideas/new',
    'https://demo.stg.citizenlab.co/en/pages/information'
  ] : [
    'http://localhost:3000/',
    'http://localhost:3000/projects',
    'http://localhost:3000/en/projects/ratione-rerum-minus-quisquam-aperiam/process',
    'http://localhost:3000/en/projects/ratione-rerum-minus-quisquam-aperiam/info',
    'http://localhost:3000/en/projects/ratione-rerum-minus-quisquam-aperiam/events',
    'http://localhost:3000/en/ideas',
    'http://localhost:3000/en/ideas/ut-maiores-dolorem-optio-aut-quas',
    'http://localhost:3000/en/sign-in',
    'http://localhost:3000/en/sign-up',,
    'http://localhost:3000/en/ideas/new',
    'http://localhost:3000/en/projects/open-idea-project/ideas/new',
    'http://localhost:3000/en/pages/information',
  ]
}

module.exports = config;
