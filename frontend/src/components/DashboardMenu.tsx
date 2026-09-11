import {
  FiCalendar,
  FiCheckSquare,
  FiFileText,
  FiFolder,
  FiGrid,
} from 'react-icons/fi'

export type DashboardSection = 'today' | 'calendar' | 'notes' | 'projects'

type DashboardMenuProps = {
  activeSection: DashboardSection
  onSectionChange: (section: DashboardSection) => void
}

const menuItems = [
  { id: 'today', label: 'Hoy', icon: FiCheckSquare },
  { id: 'calendar', label: 'Calendario', icon: FiCalendar },
  { id: 'notes', label: 'Notas', icon: FiFileText },
  { id: 'projects', label: 'Proyectos', icon: FiFolder },
] as const

export function DashboardMenu({
  activeSection,
  onSectionChange,
}: DashboardMenuProps) {
  return (
    <nav className="dashboard-menu" aria-label="Secciones principales">
      <div className="menu-brand">
        <span className="brand-mark"><FiGrid /></span>
        <span>LifeSync</span>
      </div>
      <div className="menu-links">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            className={activeSection === id ? 'menu-link active' : 'menu-link'}
            key={id}
            onClick={() => onSectionChange(id)}
            type="button"
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}