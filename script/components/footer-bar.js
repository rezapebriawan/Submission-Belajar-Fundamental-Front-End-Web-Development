class footerBar extends HTMLElement {
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

            footer {
                bottom: 0;
                padding: 10px;
                width: 100%;
                color: #fff;
                background-color: #151b1e;
                text-align: center;
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
        <footer>
            <p>
            Aplikasi Catatan
            </p>
        </footer>
    `;
    }
}

customElements.define('footer-bar', footerBar);