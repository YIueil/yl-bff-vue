/**
 * Author: YIueil
 * Date: 2023/9/14 18:09
 * Description: banner图绘制
 */

export default function printBanner() {
  const author = 'YIueil'
  const email = 'YIueil@163.com'
  const bannerASNI = `
      ___    ___ ___                     ________  ________ ________ 
     |\\  \\  /  /|\\  \\                   |\\   __  \\|\\  _____\\\\  _____\\
     \\ \\  \\/  / | \\  \\      ____________\\ \\  \\|\\ /\\ \\  \\__/\\ \\  \\__/ 
      \\ \\    / / \\ \\  \\    |\\____________\\ \\   __  \\ \\   __\\\\ \\   __\\
       \\/  /  /   \\ \\  \\___\\|____________|\\ \\  \\|\\  \\ \\  \\_| \\ \\  \\_|
      __/  / /      \\ \\_______\\             \\ \\_______\\ \\__\\   \\ \\__\\ 
    |\\___/ /        \\|_______|              \\|_______|\\|__|    \\|__|                                                          
  `
  console.log(`%c${bannerASNI}`, 'color: #663d74')
  console.log(`%cauthor: ${author}`, 'color: #ecb0c1')
  console.log(`%cemail: ${email}`, 'color: #6b5458')
}
