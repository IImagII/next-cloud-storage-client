//функция которая отображает картинку или если это не картинка отображает просто файл иконку
export const isImage = (ext: string) =>
  ['jpg', 'jpeg', 'png', 'gif'].includes(ext)
