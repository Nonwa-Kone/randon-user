const userCard = document.getElementById('card-user')

// Fonction de reccupperation des informations sur le serveur de random user
function getUser() {
  return axios.get('https://randomuser.me/api/');
}


// Fonction generale
const info = () =>{
  return getUser().then(responses =>{
    let {name, email, dob, location, phone, login, picture} = responses.data.results[0]
    template(name, email, dob, location, phone, login, picture)
  })

}

info()


// Template 
const template = (name, email, dob, location, phone, login, picture) =>{

  userCard.innerHTML = `
    <div class="card-profil-img-user">
      <img src="${picture.large}">
    </div>
    <div class="content-user">
      <p id="para">Hi, My name is</p>
      <h1 id="name">${name.title} ${name.first} ${name.last}</h1>
      <div class="icon-group">
        <i class="fa-solid fa-user"></i>
        <i class="fa-regular fa-envelope"></i>
        <i class="fa-regular fa-calendar"></i>    
        <i class="fa-solid fa-location-dot"></i>
        <i class="fa-solid fa-phone"></i> 
        <i class="fa-solid fa-lock"></i>    
      </div>
    </div>
    <button id="next" class="btn">Suivant <i class="fa-solid fa-arrow-right"></i></button>
  `
  const listIcons = document.querySelectorAll('i')

  displayContentNoneHoverBtn(listIcons, name, email, dob, location, phone, login)

  next.addEventListener("click", (e) => info())
}



const displayContentNoneHoverBtn = (listIcons, name, email, dob, location, phone, login) =>{
  for (let itemIcon of listIcons){
    itemIcon.addEventListener('mouseenter', (e)=>{
      let icon = e.currentTarget.classList[1]
      switch(icon){
      case "fa-user": 
        document.getElementById('para').innerText = `Hi, my name is`
        document.getElementById('name').innerText = `${name.title} ${name.first} ${name.last}`
        break

      case "fa-envelope": 
        document.getElementById('para').innerText = `My email address is`
        document.getElementById('name').innerText = `${email}`
        break

      case "fa-calendar": 
        document.getElementById('para').innerText = `My birthday is`
        document.getElementById('name').innerText = `${dob.date.split('T')[0].replaceAll('-', '/')}`
        break

      case "fa-location-dot": 
        document.getElementById('para').innerText = `My address is`
        document.getElementById('name').innerText = `${location.postcode} ${location.city}, ${location.country}`
        break

      case "fa-phone": 
        document.getElementById('para').innerText = `My phone number is`
        document.getElementById('name').innerText = `${phone}`
        break

    case "fa-lock": 
        document.getElementById('para').innerText = `My password is`
        document.getElementById('name').innerText = `${login.password}`
        break

      default: 
        document.getElementById('name').innerText = `${name.title} ${name.first} ${name.last}`
      }

    })
  }
}