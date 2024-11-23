class notesInput extends HTMLElement {
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

    .wrapper {
      display: flex;
      align-items: left;
      padding-left: 2%;
      padding-top: 30%;
      flex-direction: column;
      
    }
  
  .wrapper .form-wrapper {
      background-color: white;
      opacity: 0.8;
      border: none;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      justify-content: center;
      padding-left: 2em;
      padding-right: 2em;
      padding-bottom: 3em;
      width: 300px;
      height: 400px;
  }
  
  .form-wrapper h1 {
      text-align: center;
      font-size: 27px;
      margin-bottom: 10px;
  }

  .form-title input {
      margin-bottom: 10px;
      width: 93%;
      padding: 10px;
  }
  
  .form-desc textarea {
      padding: 6px;
      width: 95%;
      margin-bottom: 10px;
  }
  
  .form-group button {
    color: white;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5rem;
    background-color: #151b1e;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    border: white;
    width: 98%;
    cursor: pointer;
  }

  .form-group button:hover {
    opacity: 0.8;
  }

  
    `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
        this._shadowRoot.querySelector('#form').addEventListener('submit', this._handleSubmit.bind(this));
    }

    _handleSubmit(event) {
        event.preventDefault();

        const title = this._shadowRoot.querySelector('#title').value;
        const description = this._shadowRoot.querySelector('#description').value;

        const newNote = {
            id: `notes-${Math.random().toString(36).substring(2, 9)}`,
            title: title,
            body: description,
            createdAt: new Date().toISOString(),
            archived: false,
        };

        this.dispatchEvent(new CustomEvent('note-added', { detail: newNote }));


        this._shadowRoot.querySelector('#title').value = '';
        this._shadowRoot.querySelector('#description').value = '';
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <div class="wrapper">
            <div class="form-wrapper">
                <h1>Tambahkan <br> Catatan Baru</h1>
                <form action="" class="form" id="form">
                    <div class="form-group">
                        <div class="form-title">
                            <label for="title"></label>
                            <input type="text" id="title" name="title" placeholder="Judul" required>
                        </div>
                        <div class="form-desc">
                            <label for="description"></label>
                            <textarea name="description" id="description" cols="30" rows="10" placeholder="Deskripsi" required></textarea>
                        </div>

                        <button type="submit" name="submit" class="btn-submit">Add Notes</button>
                    </div>
                </form>
            </div>
        </div>
        `;
    }
}

customElements.define('note-input', notesInput);