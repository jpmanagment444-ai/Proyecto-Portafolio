import type { Proyecto } from './proyectos'

type ProyectoCardProps = {
  proyecto: Proyecto
}

function ProyectoCard({ proyecto }: ProyectoCardProps) {
  return (
    <article className="proyecto-card">
      <h3>{proyecto.nombre}</h3>
      <p>{proyecto.descripcion}</p>
      {proyecto.link && (
        <a
          className="proyecto-link"
          href={proyecto.link}
          target="_blank"
          rel="noreferrer"
        >
          Ver proyecto ↗
        </a>
      )}
    </article>
  )
}

export default ProyectoCard
