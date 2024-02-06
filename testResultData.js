const testData = [
  {
    rank: '1',
    name: 'INSU0',
    money: '1,123,456',
  },
  {
    rank: '2',
    name: 'INSU1',
    money: '223,456',
  },
  {
    rank: '3',
    name: 'INSU2',
    money: '323,456',
  },
  {
    rank: '4',
    name: 'INSU3',
    money: '423,456',
  },
  {
    rank: '5',
    name: 'INSU4',
    money: '523,456',
  },
  {
    rank: '6',
    name: 'INSU5',
    money: '623,456',
  },
  {
    rank: '7',
    name: 'INSU6',
    money: '723,457',
  },
  {
    rank: '8',
    name: 'INSU7',
    money: '823,458',
  },
  {
    rank: '9',
    name: 'INSU8',
    money: '923,459',
  },
  {
    rank: '10',
    name: 'INSU9',
    money: '1,023,456',
  },
  {
    rank: '11',
    name: 'INSU10',
    money: '1,223,456',
  },
]

const dynamicManifest = {
  name: 'CABO',
  short_name: 'CABO',
  icons: [
  {
    src: 'favicon.ico',
    sizes: '64x64 32x32 24x24 16x16',
    type: 'image/x-icon',
  },
  {
    src: 'logo192.png',
    type: 'image/png',
    sizes: '192x192',
  },
  {
    src: 'logo512.png',
    type: 'image/png',
    sizes: '512x512',
  },
  ],
  start_url: window.location.pathname,
  display: 'standalone',
  background_color: '#5b8def',
  theme_color: '#5b8def',
}

const manifestString = JSON.stringify(dynamicManifest)

const link = document.createElement('link')
link.rel = 'manifest'
link.href = URL.createObjectURL(
  new Blob([manifestString], { type: 'application/json' }),
)
document.head.appendChild(link)

batch(() => {
  dispatch(setIsOpen(true))
  dispatch(setContent(``))
  dispatch(setButtonText('확 인'))
  dispatch(
    setButtonFunc(() => {
      dispatch(close())
    }),
  )
})