import { useState, type FormEvent } from 'react';
import stuLogo from '@assets/IMG_2660_1795634867187.png';
import fleetCarImage from '@assets/IMG_2665_1795636356943.png';
import fleetVanImage from '@assets/IMG_2666_1795636356943.png';
import fleetTruckImage from '@assets/IMG_2667_1795636356943.png';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, Check,
  Clock3, Crosshair, FileText, Globe2, LocateFixed, Mail,
  MapPin, Menu, PackageCheck, Phone, Route, ShieldCheck, Truck, X,
} from 'lucide-react';

const contactEmail = 'Myriam.infographie1@gmail.com';
const vehicles = [
  { value: 'Voiture', capacity: '1 palette', weight: '400 kg max', image: fleetCarImage, alt: 'Véhicule compact blanc STU', description: 'Documents et petits colis' },
  { value: 'Fourgon', capacity: '3 palettes', weight: '1 400 kg max', image: fleetVanImage, alt: 'Fourgon blanc STU', description: 'Colis et palettes' },
  { value: 'Camion 20 m³', capacity: '6 palettes', weight: '1 000 kg max', image: fleetTruckImage, alt: 'Camion caisse blanc STU', description: 'Volumes et marchandises' },
];
const deadlines = ['Direct', '3h', '4h', '6h'];
const areas = ['75', '77A', '77B', '77C', '78A', '78B', '78C', '91A', '91B', '91C', '92', '93', '94', '95A', '95B', '95C'];
const navItems = [
  ['Solutions', '#solutions'], ['Flotte & tarifs', '#flotte'], ['Zones IDF', '#zones'], ['Devis', '#devis'],
];

type QuoteData = {
  type: string; name: string; company: string; phone: string; email: string;
  departure: string; arrival: string; vehicle: string; deadline: string; details: string;
};

const blankQuote: QuoteData = {
  type: 'Particulier', name: '', company: '', phone: '', email: '', departure: '',
  arrival: '', vehicle: 'Voiture', deadline: 'Direct', details: '',
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [estimate, setEstimate] = useState({ vehicle: 'Voiture', deadline: 'Direct', from: '91A', to: '75' });
  const [quote, setQuote] = useState<QuoteData>(blankQuote);
  const [status, setStatus] = useState('');

  const updateQuote = (key: keyof QuoteData, value: string) => {
    setQuote((current) => ({ ...current, [key]: value }));
    setStatus('');
  };

  const copyEstimate = () => {
    setQuote((current) => ({
      ...current,
      departure: estimate.from,
      arrival: estimate.to,
      vehicle: estimate.vehicle,
      deadline: estimate.deadline,
      details: current.details || 'Estimation indicative demandée depuis le simulateur.',
    }));
    setStatus('Les choix du simulateur ont été reportés dans votre demande. Complétez vos coordonnées pour préparer votre e-mail.');
    document.querySelector('#devis')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Demande de devis transport — ${quote.name}`;
    const body = [
      `Type de client : ${quote.type}`,
      `Nom : ${quote.name}`,
      quote.company ? `Société : ${quote.company}` : '',
      `Téléphone : ${quote.phone}`,
      `E-mail : ${quote.email}`,
      `Départ : ${quote.departure}`,
      `Arrivée : ${quote.arrival}`,
      `Véhicule : ${quote.vehicle}`,
      `Délai souhaité : ${quote.deadline}`,
      `Marchandise / précisions : ${quote.details}`,
    ].filter(Boolean).join('\n');
    setStatus('Votre application de messagerie va s’ouvrir avec votre demande préremplie. Pensez à envoyer l’e-mail pour le transmettre à STU.');
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="header">
        <div className="wrap header-inner">
          <a className="brand" href="#accueil" aria-label="STU, accueil" data-testid="link-home">
            <img className="brand-logo" src={stuLogo} alt="" width="124" height="82" data-testid="img-logo-header" />
            <span className="brand-copy">
              <span className="brand-name">STU</span>
              <span className="brand-sub">SERVICES TRANSPORTS URGENTS</span>
            </span>
          </a>
          <nav className="nav" aria-label="Navigation principale">
            {navItems.map(([label, href]) => <a key={href} href={href} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <a className="btn btn-dark" href="tel:0160831300" data-testid="link-call-header"><Phone size={16} /> 01 60 83 13 00</a>
            <a className="btn" href="#devis" data-testid="link-quote-header">Devis express <ArrowRight size={16} /></a>
          </div>
          <button className="menu-button" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          {menuOpen && <nav className="mobile-nav" aria-label="Navigation mobile">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
            <a className="btn" href="tel:0160831300" onClick={closeMenu} data-testid="link-call-mobile"><Phone size={16} /> Appeler le 01 60 83 13 00</a>
          </nav>}
        </div>
      </header>

      <section className="hero" id="accueil">
        <div className="wrap hero-grid">
          <div className="reveal">
            <div className="hero-kicker"><span /> Depuis 2009 · GSM & géolocalisation</div>
            <h1>Services Transports Urgents - Courses Express</h1>
            <p className="hero-lede">Documents, colis et palettes pris en charge avec le véhicule adapté. Des courses dédiées depuis Cheptainville, en Île-de-France, partout en France et en Europe.</p>
            <div className="hero-buttons">
              <a className="btn" href="#devis" data-testid="link-hero-quote">Organiser un transport <ArrowRight size={16} /></a>
              <a className="btn btn-outline" href="tel:0160831300" data-testid="link-call-hero"><Phone size={16} /> Appeler STU</a>
            </div>
            <div className="proof-row">
              <span className="proof"><Check size={16} /> Particuliers & professionnels</span>
              <span className="proof"><Crosshair size={16} /> Suivi par géolocalisation</span>
            </div>
          </div>

          <div className="quote-card reveal-delay" aria-label="Simulateur de transport">
            <div className="quote-head">
              <div><h2>Votre transport, en bref</h2><p>Configurez votre course en Île-de-France.</p></div>
              <span className="estimate-label">Estimation IDF</span>
            </div>
            <div className="form-grid">
              <div className="field field-wide">
                <label htmlFor="estimate-vehicle">Véhicule</label>
                <select id="estimate-vehicle" value={estimate.vehicle} onChange={(e) => setEstimate({ ...estimate, vehicle: e.target.value })} data-testid="select-estimate-vehicle">
                  {vehicles.map((vehicle) => <option key={vehicle.value} value={vehicle.value}>{vehicle.value} — {vehicle.capacity}, {vehicle.weight}</option>)}
                </select>
              </div>
              <div className="field field-wide">
                <label htmlFor="estimate-deadline">Délai souhaité</label>
                <select id="estimate-deadline" value={estimate.deadline} onChange={(e) => setEstimate({ ...estimate, deadline: e.target.value })} data-testid="select-estimate-deadline">
                  {deadlines.map((deadline) => <option value={deadline} key={deadline}>{deadline === 'Direct' ? 'Direct' : `Dans les ${deadline}`}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="estimate-from">Départ — zone</label>
                <select id="estimate-from" value={estimate.from} onChange={(e) => setEstimate({ ...estimate, from: e.target.value })} data-testid="select-estimate-departure">
                  {areas.map((area) => <option key={area} value={area}>{area}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="estimate-to">Arrivée — zone</label>
                <select id="estimate-to" value={estimate.to} onChange={(e) => setEstimate({ ...estimate, to: e.target.value })} data-testid="select-estimate-arrival">
                  {areas.map((area) => <option key={area} value={area}>{area}</option>)}
                </select>
              </div>
            </div>
            <div className="estimate-result" aria-live="polite" data-testid="status-estimate-result">
              <div><small>{estimate.vehicle} · {estimate.deadline === 'Direct' ? 'Direct' : `Dans les ${estimate.deadline}`}</small><strong>Sur devis</strong><small data-testid="text-estimate-route">{estimate.from} <ArrowRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {estimate.to}</small></div>
              <span className="result-icon"><ArrowDownRight size={20} /></span>
            </div>
            <p className="quote-footnote">Le tarif dépend du trajet, du véhicule et du délai. Aucune grille tarifaire officielle n’étant disponible ici, aucun montant n’est affiché.</p>
            <button className="btn quote-transfer" type="button" onClick={copyEstimate} data-testid="button-transfer-estimate">Reporter dans ma demande <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Les engagements STU">
        <div className="wrap trust-inner">
          <div className="trust-item"><Clock3 size={21} /><div><strong>Réactivité</strong><span>Une réponse directe</span></div></div>
          <div className="trust-item"><ShieldCheck size={21} /><div><strong>Fiabilité</strong><span>Une course dédiée</span></div></div>
          <div className="trust-item"><LocateFixed size={21} /><div><strong>Suivi du transport</strong><span>GSM & géolocalisation</span></div></div>
          <div className="trust-item"><Globe2 size={21} /><div><strong>France & Europe</strong><span>Des trajets sur mesure</span></div></div>
        </div>
      </section>

      <section className="section" id="solutions">
        <div className="wrap intro-grid">
          <div className="intro-aside">
            <div className="eyebrow">Solutions transport</div>
            <h2 className="section-title">Quand c’est urgent, on s’organise.</h2>
            <p className="section-copy">Un interlocuteur pour vos envois urgents et vos besoins de transport. Nous adaptons le véhicule et le délai à votre marchandise.</p>
            <a className="btn btn-dark" href="#devis" data-testid="link-solutions-quote">Parler de votre course <ArrowUpRight size={16} /></a>
          </div>
          <div className="solution-list">
            <article className="solution"><span className="solution-icon"><Route size={20} /></span><div><h3>Courses urgentes dédiées</h3><p>Un transport organisé pour votre envoi, sans rupture de charge.</p></div></article>
            <article className="solution"><span className="solution-icon"><Globe2 size={20} /></span><div><h3>National & Europe</h3><p>Transport express au départ de l’Île-de-France vers la France et l’Europe.</p></div></article>
            <article className="solution"><span className="solution-icon"><FileText size={20} /></span><div><h3>Documents, colis & palettes</h3><p>Le format de prise en charge s’adapte à la nature de votre marchandise.</p></div></article>
            <article className="solution"><span className="solution-icon"><LocateFixed size={20} /></span><div><h3>Suivi GSM & géolocalisation</h3><p>Des véhicules équipés pour faciliter le suivi de vos transports.</p></div></article>
            <article className="solution"><span className="solution-icon"><PackageCheck size={20} /></span><div><h3>Particuliers & professionnels</h3><p>Une solution de transport express pensée pour vos besoins.</p></div></article>
            <article className="solution"><span className="solution-icon"><BadgeCheck size={20} /></span><div><h3>Souplesse opérationnelle</h3><p>Réactivité, fiabilité et flexibilité pour organiser chaque course.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section fleet" id="flotte">
        <div className="wrap">
          <div className="fleet-head">
            <div><div className="eyebrow">La flotte</div><h2 className="section-title">Le bon format pour votre envoi.</h2></div>
            <p className="section-copy">Du document au chargement sur palettes, sélectionnez un véhicule adapté aux dimensions et au poids de votre marchandise.</p>
          </div>
          <div className="fleet-grid">
            {vehicles.map((vehicle, index) => <article className="vehicle-card" key={vehicle.value} data-testid={`card-vehicle-${index + 1}`}>
              <div className="vehicle-visual"><img src={vehicle.image} alt={vehicle.alt} loading="lazy" /><span className="vehicle-number">0{index + 1}</span></div>
              <div className="vehicle-content"><h3>{vehicle.value}</h3><p>{vehicle.description}</p>
                <div className="specs"><div className="spec"><strong>{vehicle.capacity}</strong><span>Capacité palettes</span></div><div className="spec"><strong>{vehicle.weight}</strong><span>Charge maximale</span></div></div>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section zones" id="zones">
        <div className="wrap zones-layout">
          <div className="zones-intro">
            <div className="eyebrow">Couverture Île-de-France</div>
            <h2 className="section-title">Au départ du 91, partout en région.</h2>
            <p className="section-copy">La tarification francilienne s’appuie sur des zones et sous-zones. Sélectionnez-les dans le simulateur pour préparer votre demande de tarif.</p>
            <div className="coverage-chips" aria-label="Départements et sous-zones disponibles">
              {areas.map((area) => <span className="chip" key={area} data-testid={`chip-zone-${area.toLowerCase()}`}>{area}</span>)}
            </div>
            <p className="section-copy" style={{ fontSize: '.78rem', marginTop: 18 }}>Villes repères : Cheptainville, Évry, Corbeil, Paris, Roissy, Cergy, Versailles, Melun et Fontainebleau.</p>
          </div>
          <div className="zone-map">
            <div className="zone-map-head"><strong>Découpage des zones</strong><span>Île-de-France</span></div>
            <div className="zone-row"><span className="zone-letter">A</span><div><h3>Zone A · proximité</h3><p>Sous-zones : 77A, 78A, 91A, 95A. Sélectionnez le code souhaité pour départ et arrivée.</p></div></div>
            <div className="zone-row"><span className="zone-letter">B</span><div><h3>Zone B · périphérie</h3><p>Sous-zones : 77B, 78B, 91B, 95B. Les départements 92, 93 et 94 sont également proposés.</p></div></div>
            <div className="zone-row"><span className="zone-letter">C</span><div><h3>Zone C · éloignée</h3><p>Sous-zones : 77C, 78C, 91C, 95C. Paris (75) figure aussi dans les zones sélectionnables.</p></div></div>
            <p className="zone-note">La grille complète est disponible sur demande auprès du service commercial. Appelez le <a href="tel:0160831300" data-testid="link-zone-phone" style={{ color: '#fff' }}>01 60 83 13 00</a> ou écrivez à <a href={`mailto:${contactEmail}`} data-testid="link-zone-email" style={{ color: '#fff' }}>{contactEmail}</a>.</p>
          </div>
        </div>
      </section>

      <section className="section quote-section" id="devis">
        <div className="wrap quote-layout">
          <div className="quote-intro">
            <div className="eyebrow">Demande de devis</div>
            <h2 className="section-title">Décrivez-nous votre transport.</h2>
            <p>Indiquez les informations utiles et préparez un e-mail à destination de STU. Votre messagerie s’ouvrira avec les détails préremplis : vous gardez la main pour l’envoyer.</p>
            <div className="contact-direct"><span>Besoin d’échanger directement ?</span><a href="tel:0160831300" data-testid="link-quote-phone"><Phone size={16} style={{ verticalAlign: 'middle', marginRight: 7 }} />01 60 83 13 00</a></div>
          </div>
          <form className="full-form" onSubmit={submitQuote}>
            <h3 className="form-section-title">Vos coordonnées</h3>
            <div className="form-grid">
              <div className="field"><label htmlFor="client-type">Vous êtes *</label><select required id="client-type" value={quote.type} onChange={(e) => updateQuote('type', e.target.value)} data-testid="select-client-type"><option>Particulier</option><option>Professionnel</option></select></div>
              <div className="field"><label htmlFor="quote-name">Nom et prénom *</label><input required id="quote-name" autoComplete="name" value={quote.name} onChange={(e) => updateQuote('name', e.target.value)} placeholder="Votre nom" data-testid="input-quote-name" /></div>
              {quote.type === 'Professionnel' && <div className="field field-wide"><label htmlFor="quote-company">Société</label><input id="quote-company" autoComplete="organization" value={quote.company} onChange={(e) => updateQuote('company', e.target.value)} placeholder="Nom de votre société" data-testid="input-quote-company" /></div>}
              <div className="field"><label htmlFor="quote-phone">Téléphone *</label><input required id="quote-phone" type="tel" autoComplete="tel" value={quote.phone} onChange={(e) => updateQuote('phone', e.target.value)} placeholder="06 00 00 00 00" data-testid="input-quote-phone" /></div>
              <div className="field"><label htmlFor="quote-email">E-mail *</label><input required id="quote-email" type="email" autoComplete="email" value={quote.email} onChange={(e) => updateQuote('email', e.target.value)} placeholder="vous@exemple.fr" data-testid="input-quote-email" /></div>
            </div>
            <h3 className="form-section-title" style={{ marginTop: 28 }}>Votre transport</h3>
            <div className="form-grid">
              <div className="field"><label htmlFor="quote-departure">Départ (ville ou zone) *</label><input required id="quote-departure" value={quote.departure} onChange={(e) => updateQuote('departure', e.target.value)} placeholder="Ville ou code de zone" data-testid="input-quote-departure" /></div>
              <div className="field"><label htmlFor="quote-arrival">Arrivée (ville ou zone) *</label><input required id="quote-arrival" value={quote.arrival} onChange={(e) => updateQuote('arrival', e.target.value)} placeholder="Ville ou code de zone" data-testid="input-quote-arrival" /></div>
              <div className="field"><label htmlFor="quote-vehicle">Véhicule souhaité *</label><select required id="quote-vehicle" value={quote.vehicle} onChange={(e) => updateQuote('vehicle', e.target.value)} data-testid="select-quote-vehicle">{vehicles.map((item) => <option key={item.value}>{item.value}</option>)}</select></div>
              <div className="field"><label htmlFor="quote-deadline">Délai souhaité *</label><select required id="quote-deadline" value={quote.deadline} onChange={(e) => updateQuote('deadline', e.target.value)} data-testid="select-quote-deadline">{deadlines.map((item) => <option key={item} value={item}>{item === 'Direct' ? 'Direct' : `Dans les ${item}`}</option>)}</select></div>
              <div className="field field-wide"><label htmlFor="quote-details">Détails de la marchandise *</label><textarea required id="quote-details" value={quote.details} onChange={(e) => updateQuote('details', e.target.value)} placeholder="Nature, dimensions, poids, nombre de colis ou palettes…" data-testid="input-quote-details" /></div>
            </div>
            <div className="form-submit"><p className="consent-note">Les champs marqués * sont requis. Le formulaire prépare un e-mail sur votre appareil ; la demande ne sera transmise qu’après envoi de votre part.</p><button className="btn" type="submit" data-testid="button-submit-quote">Préparer mon e-mail <ArrowRight size={16} /></button></div>
            {status && <div className="form-status" role="status" aria-live="polite" data-testid="status-quote">{status}</div>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div><a className="brand" href="#accueil" aria-label="STU, accueil" data-testid="link-footer-home"><img className="brand-logo" src={stuLogo} alt="" width="124" height="82" data-testid="img-logo-footer" /></a><p className="footer-copy">Spécialisé dans le transport express depuis 2009. Paris, Île-de-France, national et Europe — particuliers et professionnels.</p></div>
            <div><h3>Explorer</h3><div className="footer-links"><a href="#solutions" data-testid="link-footer-solutions">Solutions</a><a href="#flotte" data-testid="link-footer-fleet">Flotte</a><a href="#zones" data-testid="link-footer-zones">Zones Île-de-France</a><a href="#devis" data-testid="link-footer-quote">Demande de devis</a></div></div>
            <div><h3>Nous contacter</h3><div className="footer-contact">
              <div><MapPin size={16} /><span>6, Rue Pierre Blanche, ZA du Charbonneau,<br />91630 CHEPTAINVILLE</span></div>
              <div><Phone size={16} /><a href="tel:0160831300" data-testid="link-footer-phone">01 60 83 13 00</a></div>
              <div><FileText size={16} /><span>Fax : 01 60 83 08 00</span></div>
              <div><Mail size={16} /><a href={`mailto:${contactEmail}`} data-testid="link-footer-email">{contactEmail}</a></div>
            </div></div>
          </div>
          <div className="legal-line"><p>SIRET : 519 377 055 00024<br />Tarifs HT Ile-de-France en vigueur à partir du 1er juin 2025, donnés à titre indicatif, sous réserve de modification / Hors surcharge de gazole.</p><span>Services Transports Urgents — STU</span></div>
        </div>
      </footer>
    </main>
  );
}

export default App;
