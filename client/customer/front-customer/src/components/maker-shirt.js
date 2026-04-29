class Maker extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = /* html */`
      <style>
        * {
          box-sizing: border-box;
        }

        .content {
          width: 100%;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at top left, rgba(0, 132, 255, 0.35), transparent 35%),
            radial-gradient(circle at bottom right, rgba(161, 98, 255, 0.35), transparent 40%),
            linear-gradient(135deg, #0f172a, #111827);
          color: #fff;
          overflow-y: hidden;
        }

        .form-questions {
          width: min(760px, 100%);
          min-height: 560px;
          padding: 3rem;
          border-radius: 32px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(22px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .form-questions::before {
          content: "";
          position: absolute;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: rgba(0, 132, 255, 0.35);
          top: -90px;
          right: -90px;
          filter: blur(10px);
        }

        .form-questions::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(168, 85, 247, 0.35);
          bottom: -70px;
          left: -70px;
          filter: blur(10px);
        }

        h1 {
          margin: 0 0 2.5rem;
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1;
          letter-spacing: -0.06em;
          position: relative;
          z-index: 1;
        }

        h1 span {
          display: block;
          margin-top: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: normal;
        }

        form {
          position: relative;
          z-index: 1;
        }

        .quest {
          display: none;
        }

        .quest.active {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.3rem;
          padding: 2rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.14);
          animation: showQuestion 0.35s ease;
        }

        @keyframes showQuestion {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .number {
          width: 62px;
          height: 62px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(135deg, #0084ff, #8b5cf6);
          box-shadow: 0 12px 30px rgba(0, 132, 255, 0.45);
        }

        .number h2 {
          margin: 0;
          font-size: 1.7rem;
          line-height: 1;
        }

        .quest span {
          font-size: 1.15rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .file-box {
          width: 100%;
          padding: 1.3rem;
          border: 2px dashed rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          transition: 0.25s ease;
        }

        .file-box:hover {
          border-color: #60a5fa;
          background: rgba(96, 165, 250, 0.12);
          transform: translateY(-2px);
        }

        input[type="file"] {
          width: 100%;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          cursor: pointer;
        }

        input[type="file"]::file-selector-button {
          margin-right: 1rem;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 999px;
          background: #fff;
          color: #111827;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }

        input[type="file"]::file-selector-button:hover {
          background: #dbeafe;
        }

        .design {
          width: 100%;
          max-width: 520px;
          min-height: 170px;
          padding: 1.2rem 1.4rem;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 22px;
          outline: none;
          resize: vertical;
          font-family: inherit;
          font-size: 1rem;
          line-height: 1.5;
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            0 16px 35px rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(12px);
          transition: 0.25s ease;
        }

        .design::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        .design:hover {
          border-color: rgba(96, 165, 250, 0.55);
          background: rgba(255, 255, 255, 0.13);
        }

        .design:focus {
          border-color: #60a5fa;
          background: rgba(96, 165, 250, 0.14);
          box-shadow:
            0 0 0 4px rgba(96, 165, 250, 0.18),
            0 18px 40px rgba(0, 132, 255, 0.22);
        }

        .design::-webkit-scrollbar {
          width: 8px;
        }

        .design::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.3);
        }

        .design::-webkit-scrollbar-track {
          background: transparent;
        }

        .result-card {
          width: 100%;
          max-width: 560px;
          padding: 1rem;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06));
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            0 22px 50px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(14px);
        }

        .result-image {
          width: 100%;
          aspect-ratio: 4 / 3;
          padding: 1rem;
          border-radius: 22px;
          background:
            radial-gradient(circle at center, rgba(96, 165, 250, 0.18), transparent 55%),
            rgba(255, 255, 255, 0.08);
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .result-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 24px 35px rgba(0, 0, 0, 0.35));
          transition: 0.3s ease;
        }

        .result-card:hover .result-image img {
          transform: scale(1.04) rotate(-1deg);
        }

        .result-info {
          margin-top: 1rem;
          text-align: center;
        }

        .result-info h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .result-info p {
          margin: 0.35rem 0 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        button {
          width: 62px;
          height: 62px;
          border: none;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #fff;
          background: linear-gradient(135deg, #0084ff, #7c3aed);
          box-shadow: 0 18px 35px rgba(0, 132, 255, 0.4);
          cursor: pointer;
          transition: 0.25s ease;
        }

        .btn-text {
          width: auto;
          height: auto;
          padding: 0.8rem 1.5rem;
          border-radius: 999px;
          font-family: inherit;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: none;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        button:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 24px 45px rgba(124, 58, 237, 0.5);
        }

        button:active {
          transform: scale(0.96);
        }

        .back {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: none;
        }

        .back svg {
          transform: rotate(180deg);
        }

        svg {
          width: 30px;
          height: 30px;
        }

        @media (max-width: 600px) {
          .content {
            padding: 1rem;
          }

          .form-questions {
            padding: 2rem 1.2rem;
            border-radius: 24px;
            min-height: auto;
          }

          .quest.active {
            padding: 1.5rem 1rem;
          }

          .design {
            min-height: 150px;
          }

          .result-card {
            max-width: 100%;
            padding: 0.75rem;
          }

          .result-image {
            padding: 0.75rem;
            border-radius: 18px;
          }
        }
      </style>

      <section class="content">
        <section class="form-questions">
          <h1>
            Creador de Camisetas
            <span>Sube tu referencia y empieza a diseñar algo brutal</span>
          </h1>

          <form>
            <div class="quest active">
              <div class="number">
                <h2>1</h2>
              </div>

              <span>Sube la imagen de referencia</span>

              <label class="file-box">
                <input type="file" name="file" accept="image/*" />
              </label>

              <div class="actions">
                <button type="button" class="next" aria-label="Siguiente paso">
                  ${this.arrowIcon()}
                </button>
              </div>
            </div>

            <div class="quest">
              <div class="number">
                <h2>2</h2>
              </div>

              <span>¿Cómo quieres que sea el diseño?</span>

              <textarea 
                class="design" 
                name="design"
                placeholder="Describe el estilo, colores, texto, frase, mood o idea para tu camiseta..."
              ></textarea>

              <div class="actions">
                <button type="button" class="back" aria-label="Paso anterior">
                  ${this.arrowIcon()}
                </button>

                <button type="button" class="next" aria-label="Siguiente paso">
                  ${this.arrowIcon()}
                </button>
              </div>
            </div>

            <div class="quest">
              <article class="result-card">
                <div class="result-image">
                  <img 
                    id="result-img"
                    src="" 
                    alt="Vista previa de la camiseta generada"
                  >
                </div>

                <div class="result-info">
                  <h3>Diseño listo</h3>
                  <p>Revisa el resultado antes de continuar.</p>
                </div>
              </article>

              <div class="actions" style="flex-wrap: wrap;">
                <button id="edit-btn" class="btn-text btn-secondary">¿Quieres cambiar algo?</button>
                <button id="download-btn" class="btn-text btn-secondary">Descargar</button>
                <button id="create-new-btn" class="btn-text">Crear nueva</button>
              </div>
            </div>
          </form>
        </section>
      </section>
    `

    this.addEvents()
  }

  addEvents() {
    const questions = this.shadow.querySelectorAll('.quest')
    const nextButtons = this.shadow.querySelectorAll('.next')
    const backButtons = this.shadow.querySelectorAll('.back')
    const fileInput = this.shadow.querySelector('input[type="file"]')
    const designTextarea = this.shadow.querySelector('.design')
    const resultImg = this.shadow.querySelector('#result-img')
    const createNewBtn = this.shadow.querySelector('#create-new-btn')
    const editBtn = this.shadow.querySelector('#edit-btn')
    const downloadBtn = this.shadow.querySelector('#download-btn')

    let currentQuestion = 0
    let customImageBase64 = null
    let useGeneratedAsBase = false

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          customImageBase64 = event.target.result
        }
        reader.readAsDataURL(file)
      }
    })

    const showQuestion = () => {
      questions.forEach((question, index) => {
        question.classList.toggle('active', index === currentQuestion)
      })
    }

    nextButtons.forEach((button, index) => {
      button.addEventListener('click', async () => {
        if (index === 1) {
          const originalContent = button.innerHTML
          button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>'
          button.disabled = true

          try {
            const response = await fetch('/api/maker', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                design: designTextarea.value,
                customImage: customImageBase64,
                useDefaultBaseImage: !useGeneratedAsBase
              })
            })

            if (response.ok) {
              const data = await response.json()
              resultImg.src = data.image
              if (currentQuestion < questions.length - 1) {
                currentQuestion++
                showQuestion()
              }
            } else {
              console.error('Error generating image')
            }
          } catch (error) {
            console.error('Fetch error:', error)
          } finally {
            button.innerHTML = originalContent
            button.disabled = false
          }
        } else {
          if (currentQuestion < questions.length - 1) {
            currentQuestion++
            showQuestion()
          }
        }
      })
    })

    backButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (currentQuestion > 0) {
          currentQuestion--
          showQuestion()
        }
      })
    })

    createNewBtn.addEventListener('click', (event) => {
      event.preventDefault()
      currentQuestion = 0
      designTextarea.value = ''
      fileInput.value = ''
      customImageBase64 = null
      useGeneratedAsBase = false
      showQuestion()
    })

    editBtn.addEventListener('click', (event) => {
      event.preventDefault()
      customImageBase64 = resultImg.src
      designTextarea.value = ''
      useGeneratedAsBase = true
      currentQuestion = 1
      showQuestion()
    })

    downloadBtn.addEventListener('click', (event) => {
      event.preventDefault()
      const a = document.createElement('a')
      a.href = resultImg.src
      a.download = `camiseta-${Date.now()}.jpg`
      a.click()
    })
  }

  arrowIcon() {
    return /* html */`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9">
        <path fill="currentColor" d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"/>
        <path fill="currentColor" d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"/>
      </svg>
    `
  }
}

customElements.define('maker-component', Maker)