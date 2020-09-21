const template = document.createElement('template');
template.innerHTML = `
    <style>
        .user-card{
            background: #f4f4f4;
            width: 500px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 10px;
            margin-bottom: 15px;
            border-bottom: 5px solid pink;
            padding-bottom: 20px
        }
        .user-card img{
            width: 100%;
        }
        .user-card button{
            cursor: pointer;
            background: pink;
            color:#fff;
            border-radius: 5px;
            padding: 5px 10px;
            border: none

        }
     
    </style>
    <div class='user-card'>
        <img>
        <div>
            <h3></h3>
            <div class='info'>
                <p><slot name='email'></p>
                <p><slot name='contact'></p>
            </div> 
            <button id='toggle-info'>Hide</button>   
        </div>
    </div>
`
class UserCard extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const togglebtn = this.shadowRoot.querySelector('#toggle-info');

        if (this.showInfo) {
            info.style.display = 'block';
            togglebtn.innerText = 'Hide ';
        } else {
            info.style.display = 'none';
            togglebtn.innerText = 'show';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

window.customElements.define('user-card', UserCard)

// class NewCard extends HTMLElement {
//     constructor() {
//         super();
//         this.innerHTML = `<h3>Another ${this.getAttribute('value')} component of ${this.getAttribute('name')}</h3>`;
//     }
// }
// window.customElements.define('new-card', NewCard);