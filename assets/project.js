const container = document.querySelector('.scroll-container')
const items = document.querySelectorAll('.scroll-item')

const scrollToItem = (index) => {
  // calculate the position of the item
  const item = items[index]
  const top = item.offsetTop
  // scroll the container to that position
  container.scrollTop = top - container.offsetTop
}

items.forEach((item, index) => {
  // add click event listener to each item
  item.addEventListener('click', () => {
    scrollToItem(index)
  })
})