const achLocaleData = [{
  locale: 'ach',
  pluralRuleFunction: (e, t) => t ? 'other' : 1 === e ? 'one' : 'other',
  fields: {
      year: {
          displayName: 'Mwaka',
          relative: {
              0: 'this year',
              1: 'next year',
              '-1': 'last year'
          },
          relativeTime: {
              future: {
                  other: '+{0} y'
              },
              past: {
                  other: '-{0} y'
              }
          }
      },
      month: {
          displayName: 'Mweji',
          relative: {
              0: 'this month',
              1: 'next month',
              '-1': 'last month'
          },
          relativeTime: {
              future: {
                  other: '+{0} m'
              },
              past: {
                  other: '-{0} m'
              }
          }
      },
      day: {
          displayName: 'Thiku',
          relative: {
              0: 'Iyoo',
              1: 'Yavo',
              '-1': 'Ighuo'
          },
          relativeTime: {
              future: {
                  other: '+{0} d'
              },
              past: {
                  other: '-{0} d'
              }
          }
      },
      hour: {
          displayName: 'Thaa',
          relativeTime: {
              future: {
                  other: '+{0} h'
              },
              past: {
                  other: '-{0} h'
              }
          }
      },
      minute: {
          displayName: 'Dakika',
          relativeTime: {
              future: {
                  other: '+{0} min'
              },
              past: {
                  other: '-{0} min'
              }
          }
      },
      second: {
          displayName: 'Thekunde',
          relative: {
              0: 'now'
          },
          relativeTime: {
              future: {
                  other: '+{0} s'
              },
              past: {
                  other: '-{0} s'
              }
          }
      }
  }
}];

export default achLocaleData;
