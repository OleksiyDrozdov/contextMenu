const data = [{
    'folder': true,
    'title': 'Grow',
    'children': [{
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'English',
        'children': [{
          'title': 'Present_Perfect.txt'
        }]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Soft',
    'children': [{
        'folder': true,
        'title': 'NVIDIA',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'folder': true,
    'title': 'Doc',
    'children': [{
      'title': 'project_info.txt'
    }]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

function createTreeData(arr) {
  const ul = document.createElement('ul');
  arr.forEach((elem) => {
    const li = document.createElement('li');
    let className = '';
    if (elem.children || elem.children === null) {
      className = 'folder';
    } else {
      className = 'file';
    }
    li.setAttribute('class', `${className}`);
    li.innerHTML = `<span class="${className}">
                      <input type="text" value="${elem.title}" disabled>
                    </span>`;
    ul.appendChild(li);
    if (elem.children) {
      li.appendChild(createTreeData(elem.children));
    }
  });
  return ul;
}

function createTree(container, arr) {
  container.appendChild(createTreeData(arr));
}

createTree(rootNode, data);

const allSpan = document.querySelectorAll('span');
const ulRoot = document.querySelector('#root>ul');
ulRoot.setAttribute('class', 'mainUL');
const ulMenu = document.createElement('ul');
ulMenu.setAttribute('class', 'rightMenu');
ulMenu.innerHTML = '<li id="l1">Rename</li><li id="l2">Delete item</li>';
ulRoot.appendChild(ulMenu);

function createMessage(element) {
  const ul = document.createElement('ul');
  ul.innerHTML = '<li>Folder is empty</li>';
  ul.classList.add('empty');
  element.appendChild(ul);
}

allSpan.forEach(element => {
  element.addEventListener('click', (e) => {
    if (e.target.parentNode.querySelector('ul>li') === null && e.target.className !== 'file') {
      createMessage(e.target.parentNode);
    }
    if (e.target.className === 'folder') {
      e.target.classList.add('open');
      e.target.parentNode.classList.add('open');
    } else {
      e.target.classList.remove('open');
      e.target.parentNode.classList.remove('open');
    }
  });
});

rootNode.addEventListener('contextmenu', e => {
  e.preventDefault();
  ulMenu.style.top = `${e.clientY}px`;
  ulMenu.style.left = `${e.clientX}px`;
  ulMenu.classList.add('active');
  if (e.target.className === 'mainUL') {
    ulMenu.classList.remove('enabled');
  }
}, false);

document.addEventListener('click', e => {
  const KEYCODEN = 2;
  if (e.button !== KEYCODEN) {
    ulMenu.classList.remove('active');
  }
  allSpan.forEach(elem => elem.classList.remove('hoverEfect'));
  ulMenu.classList.remove('enabled');
}, false);

let input = '';
let span = '';

allSpan.forEach(element => {
  element.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log(e.target.tagNam);
    allSpan.forEach(elem => {
      elem.classList.remove('hoverEfect');
    });
    console.log(e.target.tagName === 'SPAN');
    element.classList.add('hoverEfect');
    ulMenu.classList.add('enabled');
    span = e.target;
    console.log(span);
    input = e.target.querySelector('input');
  }, false);
});

function sortDot(word) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === '.') {
      return i;
    }
  }
}

document.querySelector('#l1').addEventListener('click', () => {
  if (ulMenu.className === 'rightMenu enabled active' ||
    ulMenu.className === 'rightMenu active enabled') {
    input.removeAttribute('disabled');
    input.focus();
    if (span.className === 'file hoverEfect') {
      input.setSelectionRange(0, sortDot(span.children[0].value));
    } else {
      input.select();
    }
  } else {
    return;
  }
}, false);

document.querySelector('#l2').addEventListener('click', () => {
  if (ulMenu.classList.value === 'rightMenu active') {
    return;
  } else {
    const parentElem = span.parentNode.parentNode.parentNode;
    if (parentElem.querySelector('ul>li') === null) {
      span.parentNode.remove();
      createMessage(parentElem)
    } else {
      span.parentNode.remove();
      if (parentElem.querySelector('ul>li') === null) {
        createMessage(parentElem);
      }
    }
    ulMenu.classList.remove('active');
  }
}, false);