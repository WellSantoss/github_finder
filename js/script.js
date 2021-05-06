const form = document.querySelector('form');
const input = document.querySelector('#search');

form.addEventListener('submit', search);

function search(event) {
  event.preventDefault();
  
  if (input.value != '') {
    fetchGitHub(input.value);
  }
}

function fetchGitHub(user) {
  fetch(`https://api.github.com/users/${user}`)
    .then(response => (response.json()))
    .then(body => {
      setName(body.name);
      setImg(body.avatar_url);
      setUser(body.login, body.html_url);
      setBio(body.bio);
      setLocal(body.location);
      setSite(body.blog);
      setRede(body.followers, body.following);
      setRepos(body.repos_url);
      setQtdRepos(body.public_repos);

      showElements();
    })
}

function setName(name) {
  const nameH2 = document.querySelector('#name');
  nameH2.innerText = name;
}

function setImg(url) {
  const profileImg = document.querySelector('#img-profile');
  profileImg.src = url;
}

function setUser(user, url) {
  const userP = document.querySelector('#user');
  userP.innerText = '@' + user;
  userP.setAttribute('href', url)
}

function setBio(msg) {
  const bioP = document.querySelector('#bio');

  bioP.innerText = msg;

  if (msg == null) {
    bioP.innerText = '';
  }
}

function setLocal(local) {
  const localP = document.querySelector('#local p');

  localP.innerText = local;
  
  if (local == null) {
    localP.innerText = '';
  }
}

function setSite(url) {
  const siteA = document.querySelector('#website a');

  siteA.innerText = url;
  siteA.href = url;
  
  if (url == '') {
    siteA.innerText = '';
    siteA.href = '';
  }
}

function setRede(followers, following) {
  const redeLi = document.querySelector('#rede');
  const followersSpan = redeLi.querySelector('#followers');
  const followingSpan = redeLi.querySelector('#following');

  followersSpan.innerText = followers;
  followingSpan.innerText = following;
}

function setRepos(repos_url) {
  fetch(repos_url)
    .then(response => response.json())
    .then(body => {

      const reposDiv = document.querySelector('.repos .cards');
      reposDiv.innerHTML = '';

      body.forEach(repo => {
        criaLink(repo.html_url, repo.name, repo.description, repo.language, repo.stargazers_count, repo.forks);
      });
    })
}

function setQtdRepos(reposQtd) {
  const qtdSpan = document.querySelector('#repos-qtd');
  qtdSpan.innerText = reposQtd;
}

function criaLink(url, name, obs, language, stars, forks) {
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('target', '_blank');
  link.innerHTML = `<div>
                      <h3>${name}</h3>
                      <p>${obs != null ? obs : ''}</p>
                    </div>
                    <ul>
                      <li>
                        <p>${language != null ? language : ''}</p>
                      </li>
                      <li>
                        <img src="./assets/star.svg" alt="Estrelas do Repositório">
                        <p>${stars}</p>
                      </li>
                      <li>
                        <img src="./assets/fork.svg" alt="Forks do Repositório">
                        <p>${forks}</p>
                      </li>
                    </ul>`

  const divRepos = document.querySelector('.cards');
  divRepos.appendChild(link);
}

function showElements() {
  const aside = document.querySelector('aside');
  const repos = document.querySelector('.repos');
  const profile = document.querySelector('.profile');
  
  aside.style.display = 'block';
  repos.style.display = 'block';
  profile.style.marginLeft = 400 + 'px';
}