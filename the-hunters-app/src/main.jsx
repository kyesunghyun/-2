import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Bell,
  BookOpen,
  Box,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  LineChart,
  Target,
  Trophy,
  User,
  Users
} from 'lucide-react';
import './style.css';

const flow = [
  {
    id: 'splash',
    step: 1,
    title: 'THE HUNTERS',
    subtitle: 'Investment Community',
    type: 'splash'
  },
  {
    id: 'value_proposition',
    step: 2,
    title: '투자를 배우는 가장 빠른 방법',
    subtitle: '실전 투자 경험부터 금융권 네트워크까지',
    type: 'featureCards',
    cards: [
      { icon: LineChart, title: '실전 투자 경험' },
      { icon: Trophy, title: '모의투자대회' },
      { icon: Briefcase, title: '금융권 네트워크' }
    ]
  },
  {
    id: 'social_proof',
    step: 3,
    title: '함께 성장하는 투자 커뮤니티',
    subtitle: '배우고, 기록하고, 함께 투자합니다.',
    type: 'stackedCards',
    cards: [
      { icon: Target, title: '모의투자대회', desc: '실전 같은 투자 경험' },
      { icon: Building2, title: '기업 탐방', desc: '실무 현장을 경험하는 기회' },
      { icon: Users, title: '현직자 네트워크', desc: '금융권 사람들과의 연결' }
    ]
  },
  {
    id: 'investment_experience',
    step: 4,
    title: '현재 투자 경험은?',
    type: 'single',
    key: 'experience',
    options: ['입문', '1년 미만', '1~3년', '3년 이상']
  },
  {
    id: 'interest_field',
    step: 5,
    title: '관심 분야는?',
    type: 'multi',
    key: 'interests',
    options: ['국내주식', '미국주식', 'ETF', '가치투자', '퀀트', '거시경제']
  },
  {
    id: 'goal_selection',
    step: 6,
    title: '더헌터스에서 얻고 싶은 것은?',
    type: 'single',
    key: 'goal',
    options: ['투자 실력 향상', '금융권 취업', '투자 네트워크', '모의투자대회']
  },
  {
    id: 'first_mission',
    step: 7,
    title: '첫 미션을 완료해보세요',
    subtitle: '시작은 가볍게, 성장은 빠르게.',
    type: 'mission',
    missions: [
      { id: 'profile', title: '자기소개 작성', desc: '커뮤니티에 자신을 소개하기' },
      { id: 'watchlist', title: '관심종목 등록', desc: '관심 있는 종목 추가하기' },
      { id: 'mock_investment', title: '모의투자 참여', desc: '대회에 참여하기' }
    ]
  }
];

const actions = [
  {
    id: 'mock',
    icon: Target,
    title: '모의투자대회',
    desc: '진행 중인 대회에 참여하세요',
    detail: '6월 리밸런싱 챌린지가 진행 중입니다. 관심 종목을 등록하고 가상 포트폴리오를 구성해보세요.'
  },
  {
    id: 'notice',
    icon: ClipboardList,
    title: '공지사항',
    desc: '최신 소식을 확인하세요',
    detail: '이번 주 스터디 일정과 기업 탐방 신청 안내가 업데이트되었습니다.'
  },
  {
    id: 'education',
    icon: Box,
    title: '교육자료',
    desc: '투자 지식을 쌓아보세요',
    detail: '초보자를 위한 ETF, 가치투자, 거시경제 입문 자료를 바로 읽을 수 있습니다.'
  }
];

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ interests: [], missions: [] });
  const [tab, setTab] = useState('home');
  const current = flow[step];

  const isLast = step === flow.length - 1;
  const canContinue = useMemo(() => {
    if (current.type === 'single') return Boolean(answers[current.key]);
    if (current.type === 'multi') return answers[current.key]?.length > 0;
    if (current.type === 'mission') return answers.missions.length > 0;
    return true;
  }, [answers, current]);

  function next() {
    if (isLast) return setStep('home');
    setStep((v) => v + 1);
  }

  function back() {
    if (step === 0) return;
    setStep((v) => v - 1);
  }

  if (step === 'home') {
    return <HomeScreen tab={tab} setTab={setTab} answers={answers} />;
  }

  return (
    <main className="appShell">
      <section className="phone">
        <div className="softBlob" />
        <div className="topBar">
          <button className="ghostButton iconText" onClick={back} disabled={step === 0} aria-label="이전 단계">
            <ChevronLeft size={17} />
            이전
          </button>
          <span>{formatStep(step + 1)} / {formatStep(flow.length)}</span>
        </div>

        <div className="content">
          {current.type === 'splash' && <Splash />}
          {(current.type === 'featureCards' || current.type === 'stackedCards') && <CardScreen screen={current} />}
          {(current.type === 'single' || current.type === 'multi') && (
            <ChoiceScreen screen={current} answers={answers} setAnswers={setAnswers} />
          )}
          {current.type === 'mission' && <MissionScreen screen={current} answers={answers} setAnswers={setAnswers} />}
        </div>

        <Progress step={step + 1} total={flow.length} />
        <button className="primaryButton" disabled={!canContinue} onClick={next}>
          {isLast ? '미션 시작하기' : step === 0 ? '시작하기' : '다음'}
          <ChevronRight size={18} />
        </button>
      </section>
    </main>
  );
}

function Splash() {
  return (
    <div className="splash">
      <img src="/logo.png" alt="The Hunters" className="logo" />
      <h1>THE HUNTERS</h1>
      <p>Investment Community</p>
    </div>
  );
}

function CardScreen({ screen }) {
  return (
    <>
      <h1 className="title">{screen.title}</h1>
      <p className="subtitle">{screen.subtitle}</p>
      <div className={screen.type === 'featureCards' ? 'featureGrid' : 'cardList'}>
        {screen.cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="infoCard" key={card.title}>
              <span className="iconBubble"><Icon size={19} /></span>
              <div>
                <strong>{card.title}</strong>
                {card.desc && <p>{card.desc}</p>}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

function ChoiceScreen({ screen, answers, setAnswers }) {
  const selected = answers[screen.key] || (screen.type === 'multi' ? [] : '');
  function toggle(option) {
    if (screen.type === 'single') {
      setAnswers({ ...answers, [screen.key]: option });
      return;
    }
    const exists = selected.includes(option);
    setAnswers({ ...answers, [screen.key]: exists ? selected.filter((x) => x !== option) : [...selected, option] });
  }
  return (
    <>
      <h1 className="title">{screen.title}</h1>
      <div className="choiceList">
        {screen.options.map((option) => {
          const active = Array.isArray(selected) ? selected.includes(option) : selected === option;
          return (
            <button className={`choice ${active ? 'active' : ''}`} key={option} onClick={() => toggle(option)}>
              <span>{option}</span>
              {active && <CheckCircle2 size={19} />}
            </button>
          );
        })}
      </div>
    </>
  );
}

function MissionScreen({ screen, answers, setAnswers }) {
  function toggle(id) {
    const current = answers.missions;
    const exists = current.includes(id);
    setAnswers({ ...answers, missions: exists ? current.filter((x) => x !== id) : [...current, id] });
  }
  return (
    <>
      <h1 className="title">{screen.title}</h1>
      <p className="subtitle">{screen.subtitle}</p>
      <div className="cardList">
        {screen.missions.map((mission) => {
          const active = answers.missions.includes(mission.id);
          return (
            <button className={`mission ${active ? 'active' : ''}`} key={mission.id} onClick={() => toggle(mission.id)}>
              <span className="checkBox">{active && <Check size={15} />}</span>
              <span><strong>{mission.title}</strong><small>{mission.desc}</small></span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function Progress({ step, total }) {
  return (
    <div className="progressWrap" aria-label={`온보딩 ${step} / ${total}`}>
      <span>{formatStep(step)} / {formatStep(total)}</span>
      <div className="progress"><span style={{ width: `${(step / total) * 100}%` }} /></div>
    </div>
  );
}

function HomeScreen({ tab, setTab, answers }) {
  const views = {
    home: <HomeContent answers={answers} />,
    market: <Empty title="마켓" desc="오늘의 시장과 관심종목을 확인하는 화면입니다." icon={LineChart} />,
    community: <Empty title="커뮤니티" desc="공지, Q&A, 활동 소식을 모아두는 화면입니다." icon={Users} />,
    profile: <Empty title="프로필" desc="내 투자 경험과 관심 분야를 관리합니다." icon={User} />
  };
  return (
    <main className="appShell">
      <section className="phone homePhone">
        <div className="homeHeader">
          <strong>THE HUNTERS</strong>
          <Bell size={20} />
        </div>
        {views[tab]}
        <nav className="bottomNav">
          {[
            ['home', Home, '홈'],
            ['market', LineChart, '마켓'],
            ['community', Users, '커뮤니티'],
            ['profile', User, '프로필']
          ].map(([id, Icon, label]) => (
            <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}

function HomeContent({ answers }) {
  const [activeAction, setActiveAction] = useState(actions[0].id);
  const selectedAction = actions.find((action) => action.id === activeAction);
  const SelectedIcon = selectedAction.icon;

  return (
    <div className="homeContent">
      <h2>오늘의 시장</h2>
      <div className="marketGrid">
        <MarketCard title="KOSPI" value="2,654.21" change="+0.82%" />
        <MarketCard title="NASDAQ" value="16,825.09" change="+1.35%" />
      </div>
      <h2>바로 실행</h2>
      <div className="cardList">
        {actions.map((action) => (
          <ActionCard
            key={action.id}
            icon={action.icon}
            title={action.title}
            desc={action.desc}
            active={activeAction === action.id}
            onClick={() => setActiveAction(action.id)}
          />
        ))}
      </div>
      <section className="detailPanel">
        <span className="iconBubble"><SelectedIcon size={18} /></span>
        <div>
          <strong>{selectedAction.title}</strong>
          <p>{selectedAction.detail}</p>
        </div>
      </section>
      <section className="summaryBox">
        <strong>내 온보딩 정보</strong>
        <p>경험: {answers.experience || '미선택'}</p>
        <p>관심: {(answers.interests || []).join(', ') || '미선택'}</p>
        <p>목표: {answers.goal || '미선택'}</p>
      </section>
    </div>
  );
}

function MarketCard({ title, value, change }) {
  return <article className="marketCard"><span>{title}</span><strong>{value}</strong><small>{change}</small></article>;
}

function ActionCard({ icon: Icon, title, desc, active, onClick }) {
  return (
    <button className={`actionCard ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="iconBubble"><Icon size={18} /></span>
      <span><strong>{title}</strong><small>{desc}</small></span>
      <ChevronRight size={18} />
    </button>
  );
}

function Empty({ title, desc, icon: Icon }) {
  return (
    <div className="empty">
      <span className="iconBubble large"><Icon size={26} /></span>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
}

function formatStep(value) {
  return String(value).padStart(2, '0');
}

createRoot(document.getElementById('root')).render(<App />);
