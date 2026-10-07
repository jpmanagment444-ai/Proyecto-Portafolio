export type Proyecto = {
  id: number
  nombre: string
  descripcion: string
  link?: string
}

export const proyectos: Proyecto[] = [
  {
    id: 1,
    nombre: 'Proyecto de modelado',
    descripcion: 'En el aprendimos a utilizar los lenguajes HTML,CSS y JavaScript.',
    link: 'https://taller-modelado.vercel.app/',
  },
  {
    id: 2,
    nombre: 'Mi segundo proyecto',
    descripcion: 'Otra descripción breve del proyecto.',
  },
]
