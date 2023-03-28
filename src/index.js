let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCard = document.getElementById("toy-collection")


function getToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => renderToys(toy))
  })
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      toyCard.append(new_toy)
    })
}


function upLikes(e) {
  e.preventDefault()
  const toyUrlId = `http://localhost:3000/toys/${e.target.id}`
  const numOfLikes = parseInt(e.target.previousElementSibling.textContent)
  fetch(toyUrlId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": numOfLikes + 1
    })
  })
  .then(res => res.json())
  .then((() => {
    e.target.previousElementSibling.textContent = `${numOfLikes} likes`;
  }))
}

function renderToys(toy){
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let p = document.createElement("p")
  let btn = document.createElement("button")
  let card = document.createElement("div")

  h2.textContent = toy.name

  img.setAttribute("src", toy.image)
  img.setAttribute("class", "toy-avatar")

  p.textContent = `${toy.likes} likes`

  btn.textContent = "Like ❤️"
  btn.setAttribute("class", "like-btn")
  btn.setAttribute("id", toy.id)
  btn.addEventListener("click", (e) => {
    p.textContent = `${toy.likes += 1 } likes`
    upLikes(e)
  })

  card.setAttribute("class", "card")
  card.append(h2, img, p, btn)
  toyCard.append(card)
}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
    toyFormContainer.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyFormContainer.style.display = 'none'
  }
})

getToys()