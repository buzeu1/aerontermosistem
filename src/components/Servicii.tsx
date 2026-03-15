const servicii = [
  {
    icon: '🏗️',
    titlu: 'Construcții Civile',
    descriere:
      'Construim case, vile, anexe și garaje de la fundație până la cheie. Realizăm terase, foișoare, garduri metalice și din beton, acoperișuri în sistem țiglă metalică sau ceramică, precum și amenajări exterioare complete.',
  },
  {
    icon: '🏠',
    titlu: 'Renovări Complete',
    descriere:
      'Renovări și reabilitări pentru locuințe și spații comerciale. Refacem fațade, montăm sisteme de izolare termică, realizăm trotuare, pavaje și executăm lucrări de modernizare completă a clădirilor.',
  },
  {
    icon: '🔧',
    titlu: 'Instalații & Reparații',
    descriere:
      'Instalații electrice, sanitare și termice complete. Montăm și reparăm sisteme de încălzire, realizăm instalații pentru case noi, și executăm intervenții rapide pentru diverse tipuri de defecțiuni și îmbunătățiri tehnice.',
  },
  {
    icon: '🎨',
    titlu: 'Finisaje & Amenajări',
    descriere:
      'Finisaje interioare și exterioare premium: tencuieli decorative, zugrăveli, montaj gresie și faianță, pardoseli, rigips și tavane false. Executăm și amenajări exterioare cu pavaje, alei și zone verzi.',
  },
]

export default function Servicii() {
  return (
    <section className="services" id="services">
      <h2>SERVICIILE NOASTRE</h2>
      <p className="services-intro">
        Oferim soluții complete pentru construcții și renovări, cu atenție la
        detaliu și materiale de calitate
      </p>
      <div className="services-grid">
        {servicii.map((serviciu) => (
          <div className="service-card" key={serviciu.titlu}>
            <div className="service-icon">{serviciu.icon}</div>
            <h3>{serviciu.titlu}</h3>
            <p>{serviciu.descriere}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
