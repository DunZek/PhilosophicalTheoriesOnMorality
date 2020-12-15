
/* For loops script */

// For prefixing the attached IDs
const id_section_prefix = 'sect_'
const id_nav_prefix = 'nav_'
// Get HTMLcollections of elements
const els_of_main = document.querySelector('main').children
const els_of_nav = document.querySelector('nav div').children
// 
let section_number = 0

for (let i in els_of_main){
  if (els_of_main[i].tagName == 'SECTION'){
    els_of_main[i].id = `${id_section_prefix}${i}`  // <- apply the ID
    section_number++
  }
}

for (let i in els_of_nav){
  if (els_of_nav[i].tagName == 'IMG'){
    els_of_nav[i].id = `${id_nav_prefix}${i}`
    /* Attach event listeners to nav_icons */
    els_of_nav[i].addEventListener('click', e => transform(e.target))
  }
}

/* Navigation transformation */
function transform(element){
  let position = element.id.slice(-1)

  // Apply styling changes to the nav icons
  for (let i in els_of_nav){
    if (els_of_nav[i].tagName == 'IMG'){
      // if the item's ID-suffix is the same as the given position variable, then add the "selected" class name
      if (els_of_nav[i].id.slice(-1) == position){
        els_of_nav[i].classList.add('selected') 
      } else {
        els_of_nav[i].classList.remove('selected')
      }
    }
  }
  // console.log(`Navigational position: ${position}`)

  // Attach attributes for further styling
  for (let i in els_of_main){
    if (els_of_main[i].tagName == 'SECTION'){
      els_of_main[i].id = `${id_section_prefix}${i - position}`  // <- apply the ID
      // console.log(els_of_main[i].id)
    }
  }

  // Script styling
  // console.log(element.style)

  for (let i in els_of_main){
    if (els_of_main[i].tagName == 'SECTION'){
      let section_id = els_of_main[i].id.replace(id_section_prefix, "")
      // console.log(section_id)
      if (parseInt(section_id) >= 0){
        setTimeout(() => {
          // Apply static styling
          let zIndex = section_number - section_id
          els_of_main[i].style.zIndex = zIndex
          els_of_main[i].style.filter = `blur(${5 * section_id}px)`
          // Apply transformation styling
          // console.log(parseInt(section_id) + 1)
          let size_percent = `${1/(parseInt(section_id) + 1) * 100}%`
          els_of_main[i].style.fontSize = size_percent  // <- for some goddamn reason, the fontSize style attribute affects everything (prolly cause of font-size: inherit;)
        }, 250)
        setTimeout(() => {
          els_of_main[i].classList.remove('activated')
        }, 500)
      } else {
        els_of_main[i].classList.add('activated')
        setTimeout(() => {
          // Apply static styling
          els_of_main[i].style.zIndex = -1
          // Apply transformation styling
        }, 500)
      }
    }
  }
}

/* Starting config */
document.addEventListener('DOMContentLoaded', () => {
  for (let i in els_of_nav){
    // Set position order to 0
    if (els_of_nav[i].id == `${id_nav_prefix}0`){
      transform(els_of_nav[i])
    }
    // Use DOM data to apply static styling
    // if (els_of_main[i].tagName == 'SECTION'){
    //   const areaSize = Math.sqrt(document.body.offsetHeight * document.body.offsetWidth)
    //   console.log(areaSize * 0.02)
    //   // els_of_main[i].style.fontSize = areaSize
    // }
  }
  
})