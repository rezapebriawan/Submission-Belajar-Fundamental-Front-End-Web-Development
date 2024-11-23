import notesData from "../data/notes.js";

class NotesItem extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _note = {
        id: null,
        title: null,
        body: null,
        createdAt: null,
    };

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    set note(value) {
        this._note = value;
        this.render();
    }

    get note() {
        return this._note;
    }

    _updateStyle() {
        this._style.textContent = 
            `:host {
                display: block;
                width: 100%;
                box-sizing: border-box;
            }
    
            .grid-wrapper {
                padding: 2em;
                display: flex;
                flex-direction: column;
                height: 600px;
                box-sizing: border-box;
            }
    
            .grid-wrapper .all-notes {
                padding: 1em 0;
                text-align: center;
                font-weight: bold;
                font-size: 1.5em; /* Menyesuaikan ukuran font */
                margin: 0; /* Menghilangkan margin default */
            }
    
            hr {
                width: 20%;
                border: 1.5px solid #151b1e;
                margin: 0 auto;
            }
          
            .grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2em;
                padding: 1em;
                overflow-y: auto;
                max-height: calc(100vh - 4em); /* Adjust the value to fit your layout */
                box-sizing: border-box;
            }
          
            .card {
                background-color: white;
                opacity: 0.8;
                border: none;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                width: 100%;
                height: auto;
                padding: 1em;
                box-sizing: border-box;
            }
    
            .card .date {
                font-size: 0.70em;
                margin-top: -9px;
            }
    
            .card .desc {
                padding-top: 1em;
                font-size: 0.90em;
            }`;
    }
    

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div class="grid-wrapper">
                <h1 class="all-notes">Daftar Catatan</h1><hr>
                <div class="grid-container">
                    ${notesData.map(note => `
                        <div class="card">
                            <h4>${note.title}</h4>
                            <p class="date">${new Date(note.createdAt).toLocaleString()}</p>
                            <p class="desc">${note.body}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('note-item', NotesItem);
