const extColor = {
  pdf: 'purple',
  xls: 'green',
  doc: 'blue',
  txt: 'blue',
  png: 'orange',
  jpg: 'orange',
  jpeg: 'orange',
  zip: 'red'
} as const

export type Extension = keyof typeof extColor //тип который хранит список расширений
export type Color = (typeof extColor)[Extension] // тип который хранит список цветов

//функция котоая делает для каждого расширения свой цвет
export const getColorByExtension = (ext: Extension): Color => {
  return extColor[ext]
}
