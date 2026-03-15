const statistici = [
  { numar: '200+', eticheta: 'Proiecte Finalizate' },
  { numar: '10+', eticheta: 'Ani Experiență' },
  { numar: '100%', eticheta: 'Clienți Mulțumiți' },
]

export default function Despre() {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <div className="about-text">
          <h2>Despre AERON TERMOSISTEM SRL</h2>
          <p>
            Suntem o echipă dedicată de profesioniști în domeniul
            construcțiilor, cu experiență solidă în realizarea proiectelor
            rezidențiale și comerciale.
          </p>
          <p>
            Ne concentrăm pe calitatea execuției și satisfacția clienților
            noștri, oferind servicii complete de construcții, renovări,
            instalații și finisaje. Lucrăm cu materiale de calitate și
            respectăm toate standardele tehnice.
          </p>
          <p>
            De la fundații și structuri, la acoperișuri, garduri, pavaje și
            amenajări complete - ne ocupăm de fiecare detaliu pentru a livra
            proiecte finalizate la cheie.
          </p>
        </div>
        <div className="stats">
          {statistici.map((stat) => (
            <div className="stat" key={stat.eticheta}>
              <span className="stat-number">{stat.numar}</span>
              <span className="stat-label">{stat.eticheta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
