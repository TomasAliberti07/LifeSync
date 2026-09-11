import { useState } from 'react'
import { DashboardMenu, type DashboardSection } from '../../components/DashboardMenu'

const sectionTitles: Record<DashboardSection, string> = {
  today: 'Cosas que hacer hoy',
  calendar: 'Calendario',
  notes: 'Notas',
  projects: 'Proyectos',
}

export function Dashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('today')

  return (
    <div className="dashboard-shell">
      <DashboardMenu
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Tu espacio personal</p>
            <h1>{sectionTitles[activeSection]}</h1>
          </div>
          <span className="date-label">Viernes, 11 de septiembre</span>
        </header>
        <section className="dashboard-empty" aria-label={sectionTitles[activeSection]}>
          <div className="empty-line" />
          <p>Proximamente</p>
          {activeSection === 'calendar' && <span className="reminder-note">En desarrollo</span>}
        </section>
      </main>
    </div>
  )
}