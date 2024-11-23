class headerBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
            }

            nav {
                display: flex;
                width: 100%;
                background-color: #151b1e;
                justify-content: left;
                padding: 10px;
                position: fixed;
                z-index: 1;
            }
            
            nav .logo img {
                width: 100px;
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <nav>
            <div class="logo">
                <img src="src/public/logo.png" alt="logo" />
            </div>
        </nav>
    `;
    }
}

customElements.define('header-bar', headerBar);