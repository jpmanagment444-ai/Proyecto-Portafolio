import { useState, type FormEvent } from 'react'
import ProyectoCard from './ProyectoCard'
import { proyectos as proyectosIniciales, type Proyecto } from './proyectos'
import {
  perfil,
  tecnologiasAprendidas,
  tecnologiasAprendiendo,
} from './perfil'
import './App.css'

function App() {
  const [aprendidas, setAprendidas] = useState<string[]>(tecnologiasAprendidas)
  const [aprendiendo, setAprendiendo] = useState<string[]>(tecnologiasAprendiendo)
  const [nuevaTecnologia, setNuevaTecnologia] = useState('')
  const [grupo, setGrupo] = useState<'aprendida' | 'aprendiendo'>('aprendiendo')

  const [listaProyectos, setListaProyectos] =
    useState<Proyecto[]>(proyectosIniciales)
  const [nuevoProyecto, setNuevoProyecto] = useState({
    nombre: '',
    descripcion: '',
    link: '',
  })

  function agregarTecnologia(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const valor = nuevaTecnologia.trim()
    if (!valor) return
    if (grupo === 'aprendida') {
      setAprendidas((previas) => [...previas, valor])
    } else {
      setAprendiendo((previas) => [...previas, valor])
    }
    setNuevaTecnologia('')
  }

  function agregarProyecto(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const nombre = nuevoProyecto.nombre.trim()
    const descripcion = nuevoProyecto.descripcion.trim()
    if (!nombre || !descripcion) return
    setListaProyectos((previos) => [
      ...previos,
      {
        id: Date.now(),
        nombre,
        descripcion,
        link: nuevoProyecto.link.trim() || undefined,
      },
    ])
    setNuevoProyecto({ nombre: '', descripcion: '', link: '' })
  }

  return (
    <>
      <header className="nav">
        <a className="nav-marca" href="#inicio">
          {perfil.nombre}
        </a>
        <nav className="nav-links">
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#tecnologias">Tecnologías</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <h1>{perfil.nombre}</h1>
          <p className="hero-rol">{perfil.rol}</p>
        </section>

        <section id="sobre-mi" className="seccion">
          <h2>Sobre mí</h2>
          <p className="sobre-mi-texto">{perfil.descripcion}</p>
        </section>

        <section id="proyectos" className="seccion">
          <h2>Proyectos</h2>
          <div className="proyectos-grid">
            {listaProyectos.map((proyecto) => (
              <ProyectoCard key={proyecto.id} proyecto={proyecto} />
            ))}
          </div>

          <form className="formulario" onSubmit={agregarProyecto}>
            <h3>Agregar proyecto</h3>
            <div className="formulario-campos">
              <input
                type="text"
                placeholder="Nombre del proyecto"
                value={nuevoProyecto.nombre}
                onChange={(evento) =>
                  setNuevoProyecto((previo) => ({
                    ...previo,
                    nombre: evento.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Descripción breve"
                value={nuevoProyecto.descripcion}
                onChange={(evento) =>
                  setNuevoProyecto((previo) => ({
                    ...previo,
                    descripcion: evento.target.value,
                  }))
                }
              />
              <input
                type="url"
                placeholder="https://enlace-al-proyecto.com"
                value={nuevoProyecto.link}
                onChange={(evento) =>
                  setNuevoProyecto((previo) => ({
                    ...previo,
                    link: evento.target.value,
                  }))
                }
              />
              <button type="submit">Agregar proyecto</button>
            </div>
          </form>
        </section>

        <section id="tecnologias" className="seccion">
          <h2>Tecnologías</h2>
          <div className="tecnologias">
            {aprendidas.length > 0 && (
              <div className="tecnologias-grupo">
                <h3>Aprendidas</h3>
                <ul className="chips">
                  {aprendidas.map((tec) => (
                    <li key={tec} className="chip">
                      {tec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="tecnologias-grupo">
              <h3>Aprendiendo</h3>
              <ul className="chips">
                {aprendiendo.map((tec) => (
                  <li key={tec} className="chip chip-aprendiendo">
                    {tec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form className="formulario" onSubmit={agregarTecnologia}>
            <h3>Agregar tecnología</h3>
            <div className="formulario-campos">
              <input
                type="text"
                placeholder="Ej. Node.js"
                value={nuevaTecnologia}
                onChange={(evento) => setNuevaTecnologia(evento.target.value)}
              />
              <select
                value={grupo}
                onChange={(evento) =>
                  setGrupo(evento.target.value as 'aprendida' | 'aprendiendo')
                }
              >
                <option value="aprendida">Aprendida</option>
                <option value="aprendiendo">Aprendiendo</option>
              </select>
              <button type="submit">Agregar tecnología</button>
            </div>
          </form>
        </section>

        <section id="contacto" className="seccion">
          <h2>Contacto</h2>
          <p>¿Quieres trabajar conmigo o tienes alguna pregunta?</p>
          <a className="boton-contacto" href={`mailto:${perfil.email}`}>
            {perfil.email}
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {perfil.nombre}
        </p>
      </footer>
    </>
  )
}

export default App
