import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  BedDouble,
  Bell,
  Bookmark,
  BusFront,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Compass,
  Dice5,
  Download,
  FolderHeart,
  GripVertical,
  Heart,
  History,
  Hotel,
  LocateFixed,
  Map,
  MapPin,
  Menu,
  Minus,
  Navigation,
  Play,
  Plus,
  RefreshCw,
  Route,
  Ruler,
  Search,
  Settings,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrainFront,
  Utensils,
  Languages,
  X,
} from 'lucide-react';

type View = 'map' | 'routes' | 'profile';
type Service = 'taxi' | 'hotels' | 'restaurants' | 'transport' | 'randomizer';

type Place = {
  id: number;
  name: string;
  kind: string;
  area: string;
  time: string;
  rating: string;
  description: string;
  photo: number;
  marker: [number, number];
};

const places: Place[] = [
  {
    id: 1,
    name: 'Башня Белен',
    kind: 'Достопримечательность',
    area: 'Белен · 5,2 км',
    time: '09:30–11:00',
    rating: '4.8',
    description: 'Символ набережной, с которого начинаются морские истории Лиссабона.',
    photo: 1,
    marker: [24, 32],
  },
  {
    id: 2,
    name: 'Estufa Fria',
    kind: 'Скрытый сад',
    area: 'Парк Эдуарда VII · 1,8 км',
    time: '12:00–13:30',
    rating: '4.7',
    description: 'Тихая оранжерея с водопадами и тропическими тропами.',
    photo: 2,
    marker: [61, 24],
  },
  {
    id: 3,
    name: 'Alfama',
    kind: 'Район',
    area: 'Старый город · 2,3 км',
    time: '16:00–18:00',
    rating: '4.9',
    description: 'Прогуляйтесь по узким улочкам, площадям и солнечным смотровым площадкам.',
    photo: 0,
    marker: [69, 57],
  },
  {
    id: 4,
    name: 'Miradouro da Graça',
    kind: 'Смотровая площадка',
    area: 'Граса · 2,7 км',
    time: '18:30–20:00',
    rating: '4.8',
    description: 'Терраса с кинематографичным видом на город в золотой час.',
    photo: 5,
    marker: [43, 67],
  },
];

const serviceItems: { id: Service; label: string; note: string; icon: typeof CarFront }[] = [
  { id: 'taxi', label: 'Такси', note: 'Поездка за несколько минут', icon: CarFront },
  { id: 'restaurants', label: 'Ресторан', note: 'Вкус Лиссабона', icon: Utensils },
  { id: 'hotels', label: 'Отель', note: 'Комфортный отдых', icon: Hotel },
  { id: 'transport', label: 'Общественный транспорт', note: 'Передвигайтесь как местный', icon: TrainFront },
];

const filters = ['Все места', 'Достопримечательности', 'Еда', 'Отели', 'Транспорт'];

function Button({
  children,
  onClick,
  variant = 'primary',
  icon,
  disabled = false,
  className = '',
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'terracotta';
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  title?: string;
}) {
  return (
    <button
      type="button"
      className={`button button-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {icon}
      {children}
    </button>
  );
}

function Field({
  icon,
  value,
  onChange,
  placeholder,
}: {
  icon?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="field">
      {icon}
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function Photo({ index, className = '' }: { index: number; className?: string }) {
  return <div className={`photo photo-${index} ${className}`} role="img" aria-label="Вид Лиссабона" />;
}

function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">
        <Compass size={20} strokeWidth={1.8} />
      </span>
      <span>Elsewhere</span>
    </div>
  );
}

function AppNav({ view, setView }: { view: View; setView: (view: View) => void }) {
  const items: { id: View; label: string; icon: typeof Map }[] = [
    { id: 'map', label: 'Карта', icon: Map },
    { id: 'routes', label: 'Маршрут', icon: Route },
    { id: 'profile', label: 'Профиль', icon: CircleUserRound },
  ];
  return (
    <nav className="app-nav" aria-label="Основная навигация">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            type="button"
            key={item.id}
            aria-label={item.label}
            className={view === item.id ? 'nav-item active' : 'nav-item'}
            onClick={() => setView(item.id)}
          >
            <Icon size={21} strokeWidth={1.8} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Sidebar({ view, setView }: { view: View; setView: (view: View) => void }) {
  return (
    <aside className="sidebar">
      <Brand />
      <AppNav view={view} setView={setView} />
      <div className="sidebar-card">
        <span className="eyebrow">Lisbon today</span>
        <p className="sidebar-weather">23°</p>
        <p>Soft sun, made for walking.</p>
      </div>
      <div className="avatar-row">
        <span className="avatar">AM</span>
        <span>
          <strong>Alex Morgan</strong>
          <small>City explorer</small>
        </span>
        <Settings size={18} />
      </div>
    </aside>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="page-header">
      <div>
        <span className="eyebrow">{subtitle}</span>
        <h1>{title}</h1>
      </div>
      <div className="header-actions">
        <Button variant="icon" title="Open menu">
          <Menu size={20} />
        </Button>
        <span className="avatar">AM</span>
      </div>
    </header>
  );
}

function SearchBar({
  query,
  setQuery,
  onFilter,
}: {
  query: string;
  setQuery: (value: string) => void;
  onFilter: () => void;
}) {
  return (
    <div className="search-row">
      <Field
        icon={<Search size={19} />}
        value={query}
        onChange={setQuery}
        placeholder="Места, кафе, отели…"
      />
      <Button variant="secondary" icon={<SlidersHorizontal size={18} />} onClick={onFilter}>
        <span className="desktop-only">Фильтры</span>
      </Button>
    </div>
  );
}

function MapCanvas({
  selected,
  onSelect,
  onExpand,
}: {
  selected: Place | null;
  onSelect: (place: Place) => void;
  onExpand: () => void;
}) {
  return (
    <div className="map-canvas">
      <div className="river" />
      {Array.from({ length: 10 }).map((_, index) => (
        <span key={index} className={`road road-${index}`} />
      ))}
      <span className="district district-one">PRÍNCIPE REAL</span>
      <span className="district district-two">ALFAMA</span>
      <span className="district district-three">BAIXA</span>
      {places.map((place) => (
        <button
          type="button"
          key={place.id}
          className={selected?.id === place.id ? 'map-marker selected' : 'map-marker'}
          style={{ left: `${place.marker[0]}%`, top: `${place.marker[1]}%` }}
          onClick={() => onSelect(place)}
          aria-label={`View ${place.name}`}
        >
          {place.kind === 'Landmark' ? <Star size={15} /> : <MapPin size={15} />}
        </button>
      ))}
      <button type="button" className="user-location" aria-label="Ваше местоположение">
        <span />
      </button>
      <div className="map-tools">
        <Button variant="icon" title="Найти меня">
          <LocateFixed size={19} />
        </Button>
        <Button variant="icon" title="Приблизить">
          <Plus size={19} />
        </Button>
        <Button variant="icon" title="Отдалить">
          <Minus size={19} />
        </Button>
      </div>
      {selected && (
        <article className="map-preview">
          <Photo index={selected.photo} />
          <div className="preview-content">
            <div className="preview-top">
              <span className="pill">{selected.kind}</span>
              <span className="rating">
                <Star size={13} fill="currentColor" /> {selected.rating}
              </span>
            </div>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
            <div className="preview-actions">
              <span>
                <MapPin size={14} /> {selected.area}
              </span>
              <Button variant="primary" onClick={onExpand} icon={<ArrowRight size={16} />}>
                Подробнее
              </Button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

function ServiceGrid({ onOpen }: { onOpen: (service: Service) => void }) {
  return (
    <section className="services-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Everything nearby</span>
          <h2>Travel services</h2>
        </div>
        <span className="section-note">Designed for right now</span>
      </div>
      <div className="service-grid">
        {serviceItems.map((item) => {
          const Icon = item.icon;
          return (
            <button type="button" className="service-card" key={item.id} onClick={() => onOpen(item.id)}>
              <span className="service-icon">
                <Icon size={21} strokeWidth={1.7} />
              </span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.note}</small>
              </span>
              <ChevronRight size={17} />
            </button>
          );
        })}
        <button type="button" className="randomizer-card" onClick={() => onOpen('randomizer')}>
          <span className="randomizer-spark">
            <Dice5 size={24} />
          </span>
          <span>
            <small>Feeling spontaneous?</small>
            <strong>Generate my day</strong>
          </span>
          <ArrowRight size={19} />
        </button>
      </div>
    </section>
  );
}

function MapView({
  setService,
  openDetail,
  showToast,
}: {
  setService: (service: Service) => void;
  openDetail: (place: Place) => void;
  showToast: (message: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все места');
  const [selected, setSelected] = useState<Place | null>(null);
  const [sheetOpen, setSheetOpen] = useState(true);
  const [sheetHeight, setSheetHeight] = useState(() => Math.min(window.innerHeight * 0.74, 720));
  const dragStart = useRef({ y: 0, height: 98, moved: false });
  const openHeight = () => Math.min(window.innerHeight * 0.74, 720);
  const snapSheet = (open: boolean) => {
    setSheetOpen(open);
    setSheetHeight(open ? openHeight() : 98);
  };
  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    dragStart.current = { y: event.clientY, height: sheetHeight, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const delta = dragStart.current.y - event.clientY;
    if (Math.abs(delta) > 5) dragStart.current.moved = true;
    setSheetHeight(Math.max(98, Math.min(openHeight(), dragStart.current.height + delta)));
  };
  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (dragStart.current.moved) snapSheet(sheetHeight > openHeight() * 0.48);
  };
  const results = query
    ? places.filter((place) => `${place.name} ${place.kind}`.toLowerCase().includes(query.toLowerCase()))
    : [];
  return (
    <section className="map-screen">
      <MapCanvas selected={selected} onSelect={setSelected} onExpand={() => selected && openDetail(selected)} />

      {query && (
        <div className="map-search-results">
          <div className="filter-row">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? 'filter active' : 'filter'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="map-result-list">
            {(results.length ? results : places.slice(0, 2)).map((place) => (
              <button
                type="button"
                className="map-result"
                key={place.id}
                onClick={() => {
                  setSelected(place);
                  setQuery('');
                }}
              >
                <Photo index={place.photo} />
                <span>
                  <strong>{place.name}</strong>
                  <small>{place.kind} · {place.area}</small>
                </span>
                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </div>
      )}

      <section
        className={sheetOpen || sheetHeight > 150 ? 'map-native-sheet open' : 'map-native-sheet'}
        style={{ height: `${sheetHeight}px` }}
      >
        <button
          type="button"
          className="sheet-drag-handle"
          aria-label={sheetOpen ? 'Закрыть панель карты' : 'Открыть панель карты'}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={() => {
            if (!dragStart.current.moved) snapSheet(!sheetOpen);
          }}
        >
          <span />
        </button>
        <div className="map-search-dock">
          <Field
            icon={<Search size={19} />}
            value={query}
            onChange={setQuery}
            placeholder="Поиск по карте"
          />
        </div>
        <div className="map-sheet-content">
          <div className="map-sheet-services">
            {serviceItems.map((item) => {
              const Icon = item.icon;
              const asset = ({
                taxi: '/assets/d89f1.svg',
                restaurants: '/assets/d7733.svg',
                hotels: '/assets/6541f.svg',
              } as Partial<Record<Service, string>>)[item.id];
              return (
                <button
                  type="button"
                  className="map-sheet-service"
                  key={item.id}
                  onClick={() => setService(item.id)}
                >
                  <span className="sheet-service-icon">
                    {asset ? <img src={asset} alt="" /> : <Icon size={24} />}
                  </span>
                  <strong>{item.label}</strong>
                </button>
              );
            })}
          </div>
          <button type="button" className="plan-feature-card" onClick={() => setService('randomizer')}>
            <span className="plan-feature-copy">
              <strong>План</strong>
              <small>Хотите составить план на день</small>
            </span>
            <span className="plan-feature-action">
              Начать
              <img src="/assets/95e72.svg" alt="" />
            </span>
          </button>
        </div>
      </section>
    </section>
  );
}

function ExploreView({ openDetail }: { openDetail: (place: Place) => void }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All places');
  const results = places.filter(
    (place) =>
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.kind.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Header title="A city worth wandering." subtitle="Explore Lisbon" />
      <SearchBar query={query} setQuery={setQuery} onFilter={() => setFilter('Sights')} />
      <div className="filter-row explore-filters">
        {filters.slice(0, 4).map((item) => (
          <button
            type="button"
            className={filter === item ? 'filter active' : 'filter'}
            key={item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="editorial-feature">
        <Photo index={5} />
        <div className="feature-copy">
          <span className="eyebrow light">Curated walk · 3 hours</span>
          <h2>Lisbon above the rooftops</h2>
          <p>Three miradouros, one hidden garden and the perfect sunset table.</p>
          <Button variant="secondary" onClick={() => openDetail(places[3])} icon={<ArrowRight size={17} />}>
            Explore the story
          </Button>
        </div>
      </section>
      <div className="section-heading">
        <div>
          <span className="eyebrow">Chosen for you</span>
          <h2>Places with a point of view</h2>
        </div>
        <span>{results.length} places</span>
      </div>
      <div className="place-grid">
        {results.map((place) => (
          <button type="button" className="place-card" key={place.id} onClick={() => openDetail(place)}>
            <Photo index={place.photo} />
            <span className="place-card-copy">
              <span className="card-meta">
                {place.kind} <span>·</span> {place.rating} <Star size={12} fill="currentColor" />
              </span>
              <strong>{place.name}</strong>
              <small>{place.area}</small>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function RoutesView({
  routePlaces,
  setRoutePlaces,
  showToast,
}: {
  routePlaces: Place[];
  setRoutePlaces: (places: Place[]) => void;
  showToast: (message: string) => void;
}) {
  const [step, setStep] = useState<'list' | 'build' | 'preview' | 'navigate'>('list');
  const routeMap = (
    <div className="mini-map route-stage-map">
      {Array.from({ length: 7 }).map((_, index) => (
        <span key={index} className={`mini-road mini-road-${index}`} />
      ))}
      <span className="route-line" />
      {routePlaces.map((place, index) => (
        <span
          className="route-pin"
          key={place.id}
          style={{ left: `${place.marker[0]}%`, top: `${place.marker[1]}%` }}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );

  if (step === 'list') {
    return (
      <>
        <Header title="My routes" subtitle="Plan a walk through the city" />
        <Button
          variant="primary"
          className="create-route-button"
          icon={<Plus size={18} />}
          onClick={() => setStep('build')}
        >
          Create a route
        </Button>
        <div className="section-heading route-section-heading">
          <div>
            <span className="eyebrow">Saved routes</span>
            <h2>Continue exploring</h2>
          </div>
        </div>
        <div className="saved-route-grid">
          <button type="button" className="saved-route-card" onClick={() => setStep('preview')}>
            <div className="route-card-map">
              <span className="route-card-path" />
              <span className="route-card-dot start" />
              <span className="route-card-dot end" />
            </div>
            <div>
              <span className="eyebrow">Saved yesterday</span>
              <h3>Lisbon in your rhythm</h3>
              <p>{routePlaces.length} stops · 7.4 km · About 6 hours</p>
            </div>
            <ChevronRight size={20} />
          </button>
          <button type="button" className="saved-route-card route-suggestion" onClick={() => setStep('build')}>
            <span className="service-icon"><Sparkles size={21} /></span>
            <div>
              <span className="eyebrow light">Suggested</span>
              <h3>Build a new city walk</h3>
              <p>Choose places and set your own pace.</p>
            </div>
            <ArrowRight size={20} />
          </button>
        </div>
      </>
    );
  }

  if (step === 'navigate') {
    return (
      <section className="navigation-screen">
        {routeMap}
        <div className="navigation-instruction">
          <span className="navigation-turn"><Navigation size={24} /></span>
          <div>
            <span className="eyebrow">Next turn · 180 m</span>
            <h2>Continue along Rua Augusta</h2>
          </div>
        </div>
        <div className="navigation-panel">
          <span className="eyebrow">Next stop</span>
          <h2>{routePlaces[0]?.name ?? 'Belém Tower'}</h2>
          <p>12 minutes · 0.8 km</p>
          <Button
            variant="terracotta"
            icon={<X size={17} />}
            onClick={() => {
              setStep('list');
              showToast('Route completed');
            }}
          >
            Finish route
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <Header
        title={step === 'build' ? 'Build your route' : 'Your route'}
        subtitle={step === 'build' ? 'Choose the places you want to visit' : 'Review stops before you begin'}
      />
      <section className="route-summary route-builder-summary">
        <div>
          <span className="eyebrow light">{step === 'build' ? 'New city walk' : 'Ready for today'}</span>
          <h2>{step === 'build' ? 'Choose your own pace.' : 'Lisbon in your rhythm'}</h2>
          <p>{routePlaces.length} stops · 7.4 km · About 6 hours</p>
        </div>
        <div className="route-summary-actions">
          <Button variant="secondary" icon={<ArrowLeft size={17} />} onClick={() => setStep('list')}>
            Back
          </Button>
        </div>
      </section>
      <div className="route-layout">
        <div className="route-list">
          {step === 'build' && (
            <div className="route-builder-fields">
              <Field
                icon={<LocateFixed size={18} />}
                value="My current location"
                onChange={() => undefined}
                placeholder="Starting point"
              />
              <Field
                icon={<MapPin size={18} />}
                value={routePlaces.at(-1)?.name ?? ''}
                onChange={() => undefined}
                placeholder="Choose destination"
              />
            </div>
          )}
          {routePlaces.map((place, index) => (
            <article className="route-stop" key={place.id}>
              <GripVertical size={18} className="drag" />
              <span className="route-number">{String(index + 1).padStart(2, '0')}</span>
              <Photo index={place.photo} />
              <div>
                <span className="eyebrow">{place.time}</span>
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
              <Button
                variant="icon"
                title={`Remove ${place.name}`}
                onClick={() => setRoutePlaces(routePlaces.filter((item) => item.id !== place.id))}
              >
                <X size={17} />
              </Button>
            </article>
          ))}
          {routePlaces.length < places.length && (
            <Button
              variant="secondary"
              className="add-stop"
              icon={<Plus size={18} />}
              onClick={() => {
                const next = places.find((place) => !routePlaces.some((item) => item.id === place.id));
                if (next) setRoutePlaces([...routePlaces, next]);
              }}
            >
              Add another stop
            </Button>
          )}
          <div className="route-stage-actions">
            {step === 'build' ? (
              <Button variant="primary" icon={<ArrowRight size={18} />} onClick={() => setStep('preview')}>
                Preview route
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  icon={<Bookmark size={17} />}
                  onClick={() => showToast('Route saved to your profile')}
                >
                  Save
                </Button>
                <Button variant="terracotta" icon={<Play size={17} />} onClick={() => setStep('navigate')}>
                  Start route
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="route-map-wrap">
          {routeMap}
          <div className="mini-map-label">
            <Navigation size={17} />
            <span>
              <strong>42 min walking</strong>
              <small>Best route for today</small>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function TransitRoutesView({
  routePlaces,
  showToast,
}: {
  routePlaces: Place[];
  showToast: (message: string) => void;
}) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [transport, setTransport] = useState<'Автобус' | 'Трамвай' | 'LRT' | 'Метро'>('Трамвай');
  const [routeBuilt, setRouteBuilt] = useState(false);
  const transportOptions = [
    { label: 'Метро' as const, icon: Navigation },
    { label: 'Автобус' as const, icon: BusFront },
    { label: 'Трамвай' as const, icon: TrainFront },
    { label: 'LRT' as const, icon: Route },
  ];

  const swapPoints = () => {
    setFrom(to);
    setTo(from);
    setRouteBuilt(false);
  };

  return (
    <section className="transit-routes-screen">
      <div className="transit-route-map">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} className={`road road-${index}`} />
        ))}
        <span className="river" />
        <span className={routeBuilt ? 'transit-route-line visible' : 'transit-route-line'} />
        <span className="transit-point point-from"><LocateFixed size={15} /></span>
        <span className="transit-point point-to"><MapPin size={15} /></span>
        {routeBuilt && (
          <div className="route-trip-chip">
            <span className="service-icon"><TrainFront size={20} /></span>
            <span>
              <strong>38 мин</strong>
              <small>1 пересадка · 9 остановок</small>
            </span>
          </div>
        )}
      </div>

      <section className="route-build-sheet">
        <div className="route-sheet-handle"><span /></div>

        <div className="route-point-fields">
          <div className="route-fields-stack">
            <Field
              icon={<img className="route-field-icon" src="/assets/deb5d.svg" alt="" />}
              value={from}
              onChange={setFrom}
              placeholder="Откуда"
            />
            <button type="button" className="route-swap-control" title="Поменять точки местами" onClick={swapPoints}>
              <img src="/assets/461e4.svg" alt="" />
            </button>
            <Field
              icon={<img className="route-field-icon" src="/assets/9da97.svg" alt="" />}
              value={to}
              onChange={setTo}
              placeholder="Куда"
            />
          </div>
        </div>

        <div className="transport-picker">
          <div className="transport-options">
            {transportOptions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={item.label}
                  className={transport === item.label ? 'transport-option active' : 'transport-option'}
                  onClick={() => {
                    setTransport(item.label);
                    setRouteBuilt(false);
                  }}
                >
                  <Icon size={22} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {routeBuilt && (
          <div className="route-result-info">
            <div><Clock3 size={18} /><span><strong>38 мин</strong><small>В пути</small></span></div>
            <div><ArrowUpDown size={18} /><span><strong>1</strong><small>Пересадка</small></span></div>
            <div><MapPin size={18} /><span><strong>9</strong><small>Остановок</small></span></div>
          </div>
        )}

        <Button
          variant="terracotta"
          className="build-route-submit"
          icon={<img className="route-submit-icon" src="/assets/d371c.svg" alt="" />}
          disabled={!from || !to}
          onClick={() => {
            setRouteBuilt(true);
            showToast(`Маршрут построен: ${transport} · 38 минут`);
          }}
        >
          Построить маршрут
        </Button>
        <span className="route-data-note">
          {routeBuilt ? `${from} → ${to} · ${routePlaces.length + 6} остановок` : 'Введите точки маршрута, чтобы увидеть детали поездки'}
        </span>
      </section>
    </section>
  );
}

function LegacyProfileView({ saved, openDetail }: { saved: number[]; openDetail: (place: Place) => void }) {
  const [page, setPage] = useState<'main' | 'saved' | 'settings'>('main');
  const [savedFilter, setSavedFilter] = useState('All');
  const savedPlaces = places.filter((place) => saved.includes(place.id));

  if (page === 'saved') {
    return (
      <>
        <Header title="Saved places" subtitle="Your personal city collection" />
        <Button variant="secondary" icon={<ArrowLeft size={17} />} onClick={() => setPage('main')}>
          Back to profile
        </Button>
        <div className="filter-row profile-filters">
          {['All', 'Places', 'Restaurants', 'Hotels'].map((item) => (
            <button
              type="button"
              className={savedFilter === item ? 'filter active' : 'filter'}
              key={item}
              onClick={() => setSavedFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="place-grid saved-place-grid">
          {(savedPlaces.length ? savedPlaces : places.slice(0, 2)).map((place) => (
            <button type="button" className="place-card" key={place.id} onClick={() => openDetail(place)}>
              <Photo index={place.photo} />
              <span className="place-card-copy">
                <span className="card-meta">{place.kind} · {place.rating} <Star size={12} fill="currentColor" /></span>
                <strong>{place.name}</strong>
                <small>{place.area}</small>
              </span>
            </button>
          ))}
        </div>
      </>
    );
  }

  if (page === 'settings') {
    const groups = [
      {
        title: 'General',
        rows: [
          [Languages, 'Language', 'English'],
          [Ruler, 'Distance units', 'Kilometres'],
          [Bell, 'Notifications', 'On'],
        ],
      },
      {
        title: 'Map & access',
        rows: [
          [Download, 'Offline maps', 'Lisbon downloaded'],
          [LocateFixed, 'Location access', 'While using'],
        ],
      },
    ];
    return (
      <>
        <Header title="Settings" subtitle="Make the app work for you" />
        <Button variant="secondary" icon={<ArrowLeft size={17} />} onClick={() => setPage('main')}>
          Back to profile
        </Button>
        <div className="profile-settings-groups">
          {groups.map((group) => (
            <section className="profile-settings-group" key={group.title}>
              <span className="eyebrow">{group.title}</span>
              {group.rows.map(([Icon, label, value]) => {
                const RowIcon = Icon as typeof Bell;
                return (
                  <button type="button" key={String(label)}>
                    <span className="service-icon"><RowIcon size={19} /></span>
                    <span>
                      <strong>{String(label)}</strong>
                      <small>{String(value)}</small>
                    </span>
                    <ChevronRight size={18} />
                  </button>
                );
              })}
            </section>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Your travels, collected." subtitle="Profile" />
      <section className="profile-hero">
        <span className="profile-avatar">AM</span>
        <div>
          <span className="eyebrow light">Thoughtful traveller</span>
          <h2>Alex Morgan</h2>
          <p>London · Exploring Lisbon through 18 May</p>
        </div>
        <Button variant="secondary" icon={<Settings size={17} />} onClick={() => setPage('settings')}>
          Edit profile
        </Button>
      </section>
      <div className="stat-grid">
        <article>
          <strong>12</strong>
          <span>Places saved</span>
        </article>
        <article>
          <strong>04</strong>
          <span>Routes made</span>
        </article>
        <article>
          <strong>28 km</strong>
          <span>Wandered</span>
        </article>
      </div>
      <div className="profile-menu-grid">
        <button type="button" className="profile-menu-card" onClick={() => setPage('saved')}>
          <span className="service-icon"><FolderHeart size={21} /></span>
          <span><strong>Saved places</strong><small>12 places across Lisbon</small></span>
          <ChevronRight size={18} />
        </button>
        <button type="button" className="profile-menu-card">
          <span className="service-icon"><Route size={21} /></span>
          <span><strong>My routes</strong><small>4 routes ready to revisit</small></span>
          <ChevronRight size={18} />
        </button>
        <button type="button" className="profile-menu-card">
          <span className="service-icon"><History size={21} /></span>
          <span><strong>Search history</strong><small>Recently viewed places</small></span>
          <ChevronRight size={18} />
        </button>
        <button type="button" className="profile-menu-card" onClick={() => setPage('settings')}>
          <span className="service-icon"><Settings size={21} /></span>
          <span><strong>Settings</strong><small>Language, map and access</small></span>
          <ChevronRight size={18} />
        </button>
      </div>
    </>
  );
}

function ProfileView({ openDetail }: { saved: number[]; openDetail: (place: Place) => void }) {
  const [editing, setEditing] = useState(false);
  const libraryItems = [
    { label: 'Сохранённые места', icon: FolderHeart, action: () => openDetail(places[0]) },
    { label: 'Мои маршруты', icon: Route, action: () => undefined },
    { label: 'История поездок', icon: History, action: () => undefined },
  ];
  const settingItems = [
    { label: 'Настройки приложения', icon: Settings, action: () => undefined },
    { label: 'Помощь', icon: Compass, action: () => undefined },
  ];

  return (
    <section className="profile-reference-page">
      <h1>Профиль</h1>
      <div className="profile-reference-user">
        <div className="profile-reference-identity">
          <span className="profile-reference-avatar">АМ</span>
          <div>
            <strong>Алекс Морган</strong>
            <small>Путешественник</small>
          </div>
        </div>
        <Button variant="secondary" onClick={() => setEditing((value) => !value)}>
          {editing ? 'Готово' : 'Изменить'}
        </Button>
      </div>

      <section className="profile-reference-section">
        <h2>Моя библиотека</h2>
        <div className="profile-reference-list">
          {libraryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button type="button" key={item.label} onClick={item.action}>
                <span className="profile-reference-row-icon"><Icon size={18} /></span>
                <span>{item.label}</span>
                <ChevronRight size={18} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="profile-reference-section">
        <h2>Настройки</h2>
        <div className="profile-reference-list">
          {settingItems.map((item) => {
            const Icon = item.icon;
            return (
              <button type="button" key={item.label} onClick={item.action}>
                <span className="profile-reference-row-icon"><Icon size={18} /></span>
                <span>{item.label}</span>
                <ChevronRight size={18} />
              </button>
            );
          })}
        </div>
      </section>
    </section>
  );
}

function PlaceDetail({
  place,
  saved,
  onSave,
  onAdd,
  onClose,
}: {
  place: Place;
  saved: boolean;
  onSave: () => void;
  onAdd: () => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<'About' | 'Tips' | 'Reviews' | 'Tickets'>('About');
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <article className="detail-sheet" onMouseDown={(event) => event.stopPropagation()}>
        <Photo index={place.photo} className="detail-photo" />
        <div className="sheet-controls">
          <Button variant="icon" onClick={onClose} title="Закрыть">
            <ArrowLeft size={19} />
          </Button>
          <Button variant="icon" onClick={onSave} title="Сохранить место">
            <Heart size={19} fill={saved ? 'currentColor' : 'none'} />
          </Button>
        </div>
        <div className="detail-body">
          <div className="detail-title-row">
            <div>
              <span className="pill">{place.kind}</span>
              <h2>{place.name}</h2>
            </div>
            <span className="detail-rating">
              <Star size={16} fill="currentColor" /> {place.rating}
            </span>
          </div>
          <p className="detail-intro">
            {place.description} Откройте детали и истории, которые делают это место одной из самых интересных точек города.
          </p>
          <div className="detail-tabs">
            {(['About', 'Tips', 'Reviews', 'Tickets'] as const).map((item) => (
              <button
                type="button"
                key={item}
                className={tab === item ? 'active' : ''}
                onClick={() => setTab(item)}
              >
                {{ About: 'Описание', Tips: 'Советы', Reviews: 'Отзывы', Tickets: 'Билеты' }[item]}
              </button>
            ))}
          </div>
          <div className="fact-grid">
            <span>
              <MapPin size={18} />
              <small>Адрес</small>
              <strong>{place.area}</strong>
            </span>
            <span>
              <Clock3 size={18} />
              <small>Лучшее время</small>
              <strong>{place.time}</strong>
            </span>
            <span>
              <CalendarDays size={18} />
              <small>Продолжительность</small>
              <strong>60–90 мин</strong>
            </span>
          </div>
          <div className="editorial-note">
            <span className="eyebrow">
              {tab === 'About' ? 'Гид по району' : { Tips: 'Советы', Reviews: 'Отзывы', Tickets: 'Билеты' }[tab]}
            </span>
            <h3>
              {tab === 'About' && 'Не спешите по дороге.'}
              {tab === 'Tips' && 'Приходите раньше и оставайтесь дольше.'}
              {tab === 'Reviews' && 'Место нравится внимательным путешественникам.'}
              {tab === 'Tickets' && 'Спланируйте посещение заранее.'}
            </h3>
            <p>
              {tab === 'About' && 'Доезжайте на трамвае, а затем сверните на тихие улочки. Лучшие виды открываются постепенно.'}
              {tab === 'Tips' && 'В будни утром здесь спокойнее всего. Возьмите воду и удобную обувь.'}
              {tab === 'Reviews' && 'Гости отмечают атмосферу, красивые виды и возможность увидеть спокойную сторону Лиссабона.'}
              {tab === 'Tickets' && 'Стандартный билет можно приобрести на месте. Приложение не выполняет реальную покупку.'}
            </p>
          </div>
          <div className="detail-actions">
            <Button variant="secondary" icon={<Navigation size={17} />}>
              Маршрут
            </Button>
            <Button variant="primary" icon={<Plus size={17} />} onClick={onAdd}>
              Добавить в маршрут
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

function Itinerary({
  order,
  onRegenerate,
  onMap,
  onSave,
  onAdd,
}: {
  order: Place[];
  onRegenerate: () => void;
  onMap: () => void;
  onSave: () => void;
  onAdd: () => void;
}) {
  return (
    <>
      <section className="randomizer-hero">
        <span className="randomizer-orb">
          <Sparkles size={28} />
        </span>
        <div>
          <span className="eyebrow light">План на сегодня</span>
          <h2>Ваш случайный Лиссабон.</h2>
          <p>Четыре остановки от утреннего света до заката.</p>
        </div>
      </section>
      <div className="itinerary-list">
        {order.map((place, index) => (
          <article key={place.id} className="itinerary-item">
            <span className="itinerary-time">{place.time.split('–')[0]}</span>
            <Photo index={place.photo} />
            <div>
              <span className="eyebrow">
                Остановка {index + 1} · {place.kind}
              </span>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="modal-action-grid">
        <Button variant="secondary" icon={<Map size={17} />} onClick={onMap}>
          На карте
        </Button>
        <Button variant="secondary" icon={<RefreshCw size={17} />} onClick={onRegenerate}>
          Обновить
        </Button>
        <Button variant="secondary" icon={<Bookmark size={17} />} onClick={onSave}>
          Сохранить
        </Button>
        <Button variant="terracotta" icon={<Route size={17} />} onClick={onAdd}>
          В маршрут
        </Button>
      </div>
    </>
  );
}

function ServiceModal({
  service,
  onClose,
  onMap,
  onToast,
  onAddItinerary,
}: {
  service: Service;
  onClose: () => void;
  onMap: () => void;
  onToast: (message: string) => void;
  onAddItinerary: (places: Place[]) => void;
}) {
  const [pickup, setPickup] = useState('Моё местоположение');
  const [destination, setDestination] = useState('');
  const [order, setOrder] = useState(places);
  const [category, setCategory] = useState('Все');
  const [randomizerReady, setRandomizerReady] = useState(false);
  const [randomizerPrefs, setRandomizerPrefs] = useState({
    interest: 'Достопримечательности',
    time: 'Полдня',
    budget: 'Умеренно',
  });
  const title: Record<Service, string> = {
    taxi: 'Заказать такси',
    hotels: 'Найти отель',
    restaurants: 'Найти ресторан',
    transport: 'Общественный транспорт',
    randomizer: 'Идея на день',
  };
  const regenerate = () => setOrder((items) => [...items.slice(1), items[0]]);
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="service-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">Сервис для путешествий</span>
            <h2>{title[service]}</h2>
          </div>
          <Button variant="icon" onClick={onClose} title="Закрыть">
            <X size={19} />
          </Button>
        </div>

        {service === 'randomizer' && !randomizerReady && (
          <div className="randomizer-setup">
            <section className="randomizer-setup-visual">
              <span className="randomizer-orb"><Sparkles size={28} /></span>
              <div>
                <span className="eyebrow light">Идея на день</span>
                <h3>Каким будет сегодняшний день?</h3>
                <p>Выберите предпочтения и позвольте городу удивить вас.</p>
              </div>
            </section>
            {[
              ['Что вам интересно?', 'interest', ['Достопримечательности', 'Еда', 'Отдых']],
              ['Сколько у вас времени?', 'time', ['Пара часов', 'Полдня', 'Весь день']],
              ['Бюджет', 'budget', ['Экономно', 'Умеренно', 'Гибко']],
            ].map(([label, key, options]) => (
              <div className="preference-group" key={String(key)}>
                <span className="eyebrow">{String(label)}</span>
                <div className="filter-row">
                  {(options as string[]).map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={randomizerPrefs[key as keyof typeof randomizerPrefs] === option ? 'filter active' : 'filter'}
                      onClick={() => setRandomizerPrefs((current) => ({ ...current, [String(key)]: option }))}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <Button
              variant="terracotta"
              className="full-button"
              icon={<Sparkles size={18} />}
              onClick={() => setRandomizerReady(true)}
            >
              Составить план
            </Button>
          </div>
        )}

        {service === 'randomizer' && randomizerReady && (
          <Itinerary
            order={order}
            onRegenerate={regenerate}
            onMap={onMap}
            onSave={() => onToast('План на день сохранён')}
            onAdd={() => onAddItinerary(order)}
          />
        )}

        {service === 'taxi' && (
          <div className="booking-content">
            <Photo index={0} className="booking-photo" />
            <div className="booking-fields">
              <Field icon={<LocateFixed size={18} />} value={pickup} onChange={setPickup} placeholder="Откуда" />
              <Field
                icon={<MapPin size={18} />}
                value={destination}
                onChange={setDestination}
                placeholder="Куда"
              />
            </div>
            <div className="option-list">
              {[
                ['Городской', '3 мин', '€8–11'],
                ['Комфорт', '6 мин', '€13–17'],
                ['Шесть мест', '8 мин', '€19–24'],
              ].map((item, index) => (
                <button type="button" key={item[0]} className={index === 0 ? 'option-row selected' : 'option-row'}>
                  <span className="service-icon">
                    <CarFront size={21} />
                  </span>
                  <span>
                    <strong>{item[0]}</strong>
                    <small>{item[1]}</small>
                  </span>
                  <strong>{item[2]}</strong>
                </button>
              ))}
            </div>
            <Button
              variant="primary"
              className="full-button"
              disabled={!destination}
              onClick={() => onToast('Детали поездки готовы — заказ не оформлен')}
            >
              Проверить поездку
            </Button>
          </div>
        )}

        {(service === 'hotels' || service === 'restaurants') && (
          <div className="booking-content">
            <SearchBar
              query={destination}
              setQuery={setDestination}
              onFilter={() => setCategory(service === 'hotels' ? 'Бутик' : 'Португальская кухня')}
            />
            <div className="filter-row">
              {['Все', service === 'hotels' ? 'Бутик' : 'Португальская кухня', 'Лучшие', 'Рядом'].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={category === item ? 'filter active' : 'filter'}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="booking-grid">
              {[0, 1, 2].map((item) => {
                const hotel = service === 'hotels';
                return (
                  <article className="booking-card" key={item}>
                    <Photo index={hotel ? 3 : 4} />
                    <div>
                      <span className="rating">
                        <Star size={13} fill="currentColor" /> {4.7 + item / 10}
                      </span>
                      <h3>{hotel ? ['Casa do Jardim', 'The Ivens', 'Memmo Alfama'][item] : ['Prado', 'Taberna da Rua', 'Ofício'][item]}</h3>
                      <p>{hotel ? 'Тихие номера · Завтрак включён' : 'Современная португальская кухня · Сезонное меню'}</p>
                      <div className="booking-card-bottom">
                        <strong>{hotel ? `€${145 + item * 35} / ночь` : `€${25 + item * 10} в среднем`}</strong>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            onToast(hotel ? 'Даты выбраны — бронирование не оформлено' : 'Информация о столике открыта')
                          }
                        >
                          {hotel ? 'Подробнее' : 'Столик'}
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {service === 'transport' && (
          <div className="booking-content">
            <section className="transport-pass">
              <div>
                <span className="eyebrow light">Для путешественников</span>
                <h3>Проездной Navegante на 24 часа</h3>
                <p>Безлимитные поездки на метро, трамвае и автобусе в центре Лиссабона.</p>
              </div>
              <strong>€6.80</strong>
            </section>
            <div className="transport-list">
              {[
                [TrainFront, 'Метро', 'Синяя линия · 4 мин пешком', 'Каждые 6 мин'],
                [BusFront, 'Трамвай 28E', 'R. Conceição · 7 мин пешком', 'Каждые 12 мин'],
                [BusFront, 'Автобус 728', 'Cais do Sodré · 3 мин пешком', 'Через 5 мин'],
              ].map(([Icon, name, note, timing]) => {
                const TransportIcon = Icon as typeof TrainFront;
                return (
                  <button type="button" className="transport-row" key={String(name)} onClick={() => onToast(`${name}: выбрано`)}>
                    <span className="service-icon">
                      <TransportIcon size={21} />
                    </span>
                    <span>
                      <strong>{String(name)}</strong>
                      <small>{String(note)}</small>
                    </span>
                    <strong>{String(timing)}</strong>
                  </button>
                );
              })}
            </div>
            <Button variant="primary" className="full-button" onClick={onMap} icon={<Map size={18} />}>
              Показать остановки
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<View>('map');
  const [service, setService] = useState<Service | null>(null);
  const [detail, setDetail] = useState<Place | null>(null);
  const [saved, setSaved] = useState<number[]>([1, 3]);
  const [routePlaces, setRoutePlaces] = useState<Place[]>(places.slice(0, 3));
  const [toast, setToast] = useState('');

  const toastMessage = useMemo(() => toast, [toast]);
  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };
  const addToRoute = (place: Place) => {
    if (!routePlaces.some((item) => item.id === place.id)) setRoutePlaces([...routePlaces, place]);
    showToast(`${place.name} добавлено в маршрут`);
  };

  return (
    <div className="app-shell">
      <main className={`main-content view-${view}`}>
        {view === 'map' && (
          <MapView setService={setService} openDetail={setDetail} showToast={showToast} />
        )}
        {view === 'routes' && (
          <TransitRoutesView routePlaces={routePlaces} showToast={showToast} />
        )}
        {view === 'profile' && <ProfileView saved={saved} openDetail={setDetail} />}
      </main>
      <div className="mobile-navigation">
        <AppNav view={view} setView={setView} />
      </div>
      {service && (
        <ServiceModal
          service={service}
          onClose={() => setService(null)}
          onToast={showToast}
          onMap={() => {
            setService(null);
            setView('map');
          }}
          onAddItinerary={(items) => {
            setRoutePlaces(items);
            setService(null);
            setView('routes');
            showToast('План на день добавлен в маршрут');
          }}
        />
      )}
      {detail && (
        <PlaceDetail
          place={detail}
          saved={saved.includes(detail.id)}
          onClose={() => setDetail(null)}
          onAdd={() => addToRoute(detail)}
          onSave={() =>
            setSaved((items) =>
              items.includes(detail.id) ? items.filter((id) => id !== detail.id) : [...items, detail.id],
            )
          }
        />
      )}
      {toastMessage && (
        <div className="toast">
          <Check size={17} />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
