import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

const GS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg0:#020408;--bg1:#050b12;--bg2:rgba(8,20,35,0.72);--bg3:rgba(10,25,45,0.55);
  --bc1:rgba(0,220,255,0.18);--bc2:rgba(0,220,255,0.08);
  --cy:#00dcff;--cy2:rgba(0,220,255,0.6);--vi:#a855f7;--vi2:rgba(168,85,247,0.6);
  --gr:#00ff88;--rd:#ff4560;--gd:#ffd700;
  --t1:#e8f4ff;--t2:#7a9bb5;--t3:#3a5a72;
  --fd:'Orbitron',monospace;--fb:'Sora',sans-serif;--fm:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--bg0);color:var(--t1);overflow-x:hidden;min-height:100vh}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:var(--bg1)}
::-webkit-scrollbar-thumb{background:var(--cy2);border-radius:99px}
.glass{background:var(--bg2);border:1px solid var(--bc1);backdrop-filter:blur(22px) saturate(180%);border-radius:20px}
.glass-sm{background:var(--bg3);border:1px solid var(--bc2);backdrop-filter:blur(14px);border-radius:14px}
.bg-grid{background-image:linear-gradient(rgba(0,220,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,0.03) 1px,transparent 1px);background-size:40px 40px}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 12px rgba(0,220,255,.3)}50%{box-shadow:0 0 28px rgba(0,220,255,.6)}}
.anim{animation:fadeUp .45s ease both}
.skeleton{background:linear-gradient(90deg,rgba(0,220,255,.04) 25%,rgba(0,220,255,.1) 50%,rgba(0,220,255,.04) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:8px}
.live{width:7px;height:7px;background:var(--gr);border-radius:50%;box-shadow:0 0 8px var(--gr);animation:blink 1.5s infinite;display:inline-block}
.grad-cy{background:linear-gradient(135deg,#00dcff,#0080ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.grad-vi{background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.grad-gd{background:linear-gradient(135deg,#ffd700,#ff8c00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.btn-p{background:linear-gradient(135deg,#00dcff,#0066cc);color:#000;font-family:var(--fd);font-weight:700;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;border:none;border-radius:12px;cursor:pointer;transition:all .25s;box-shadow:0 0 20px rgba(0,220,255,.3);padding:9px 18px}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 0 35px rgba(0,220,255,.55)}
.btn-g{background:transparent;color:var(--cy);font-family:var(--fd);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;border:1px solid var(--bc1);border-radius:8px;cursor:pointer;transition:all .2s;padding:7px 15px}
.btn-g:hover{background:rgba(0,220,255,.1);border-color:var(--cy)}
.btn-ok{background:linear-gradient(135deg,#00ff88,#00cc66);color:#000;font-family:var(--fd);font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:none;border-radius:8px;cursor:pointer;padding:7px 15px;transition:all .2s}
.btn-err{background:linear-gradient(135deg,#ff4560,#cc0033);color:#fff;font-family:var(--fd);font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:none;border-radius:8px;cursor:pointer;padding:7px 15px;transition:all .2s}
.badge{font-family:var(--fm);font-size:10px;font-weight:600;padding:3px 9px;border-radius:99px;letter-spacing:.5px}
.b-cy{background:rgba(0,220,255,.15);color:var(--cy);border:1px solid rgba(0,220,255,.3)}
.b-vi{background:rgba(168,85,247,.15);color:var(--vi);border:1px solid rgba(168,85,247,.3)}
.b-gr{background:rgba(0,255,136,.12);color:var(--gr);border:1px solid rgba(0,255,136,.3)}
.b-rd{background:rgba(255,69,96,.12);color:var(--rd);border:1px solid rgba(255,69,96,.3)}
.b-gd{background:rgba(255,215,0,.12);color:var(--gd);border:1px solid rgba(255,215,0,.3)}
.inp{background:rgba(0,220,255,.04);border:1px solid var(--bc1);border-radius:8px;color:var(--t1);font-family:var(--fm);font-size:13px;padding:9px 14px;outline:none;transition:all .2s;width:100%}
.inp:focus{border-color:var(--cy);box-shadow:0 0 0 3px rgba(0,220,255,.1);background:rgba(0,220,255,.07)}
.tbl{width:100%;border-collapse:collapse}
.tbl th{font-family:var(--fd);font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--t3);padding:12px 16px;text-align:left;border-bottom:1px solid var(--bc2)}
.tbl td{padding:13px 16px;font-size:12px;color:var(--t2);border-bottom:1px solid rgba(0,220,255,.04);font-family:var(--fm)}
.tbl tr:hover td{background:rgba(0,220,255,.03)}
.nav-i{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:8px;cursor:pointer;transition:all .2s;font-family:var(--fd);font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);border:1px solid transparent;background:transparent;width:100%}
.nav-i:hover{color:var(--t2);background:rgba(0,220,255,.05);border-color:var(--bc2)}
.nav-i.on{color:var(--cy);background:rgba(0,220,255,.08);border-color:var(--bc1);box-shadow:inset 0 0 20px rgba(0,220,255,.05),0 0 12px rgba(0,220,255,.1)}
.tab-bar{display:flex;gap:4px;background:rgba(0,220,255,.04);border-radius:14px;padding:4px}
.tab-i{flex:1;text-align:center;padding:8px 12px;border-radius:10px;font-family:var(--fd);font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);cursor:pointer;transition:all .2s;border:none;background:transparent}
.tab-i.on{background:linear-gradient(135deg,rgba(0,220,255,.15),rgba(168,85,247,.1));color:var(--cy);border:1px solid rgba(0,220,255,.2)}
.pbar{height:4px;background:rgba(0,220,255,.12);border-radius:99px;overflow:hidden}
.pfill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--cy),var(--vi));box-shadow:0 0 8px var(--cy);transition:width 1s ease}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:999}
`;

// ─── ICONS ────────────────────────────────────────────────────────────────
const I = ({ n, s = 16, c = "currentColor" }) => {
  const d = {
    dash: <><rect x="3" y="3" w="7" h="7" rx="1"/><rect x="14" y="3" w="7" h="7" rx="1"/><rect x="3" y="14" w="7" h="7" rx="1"/><rect x="14" y="14" w="7" h="7" rx="1"/></>,
    stat: <><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    wallet: <><rect x="2" y="5" w="20" h="14" rx="2"/><path d="M16 14a2 2 0 0 0 0-4H2"/></>,
    admin: <><path d="M12 3L4 9v12h16V9z"/><path d="M9 21V12h6v9"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    copy: <><rect x="9" y="9" w="13" h="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    dl: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    trend: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    ai: <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
    act: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    qr: <><rect x="3" y="3" w="7" h="7"/><rect x="14" y="3" w="7" h="7"/><rect x="3" y="14" w="7" h="7"/><rect x="14" y="14" w="3" h="3"/><rect x="18" y="14" w="3" h="3"/><rect x="14" y="18" w="3" h="3"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {d[n] || null}
    </svg>
  );
};

// ─── MOCK DATA ─────────────────────────────────────────────────────────────
const REFS = [
  { id:1,name:"crypto_king",clicks:24580,conv:342,rev:8920.50,coin:"USDT",src:"Telegram",chg:+12.4 },
  { id:2,name:"defi_master",clicks:19230,conv:289,rev:7340.20,coin:"BTC",src:"TikTok",chg:+8.7 },
  { id:3,name:"moon_trader",clicks:15840,conv:198,rev:5870.90,coin:"ETH",src:"Facebook",chg:-3.2 },
  { id:4,name:"whale_alert",clicks:12490,conv:165,rev:4230.00,coin:"USDT",src:"Twitter",chg:+22.1 },
  { id:5,name:"btc_hodler",clicks:9870,conv:124,rev:3180.60,coin:"BTC",src:"Telegram",chg:+5.8 },
];
const TXNS = [
  { id:"TXN-001",type:"commission",amt:+245.80,coin:"USDT",time:"2026-04-05 14:32",status:"success",desc:"Commission from defi_master" },
  { id:"TXN-002",type:"withdraw",amt:-1000.00,coin:"USDT",time:"2026-04-05 12:15",status:"success",desc:"Withdrawal to Binance" },
  { id:"TXN-003",type:"commission",amt:+0.00284,coin:"BTC",time:"2026-04-05 10:08",status:"success",desc:"Commission from crypto_king" },
  { id:"TXN-004",type:"withdraw",amt:-500.00,coin:"USDT",time:"2026-04-04 23:44",status:"pending",desc:"Withdrawal to Bybit" },
  { id:"TXN-005",type:"commission",amt:+182.40,coin:"USDT",time:"2026-04-04 18:22",status:"success",desc:"Commission from moon_trader" },
  { id:"TXN-006",type:"withdraw",amt:-2000.00,coin:"USDT",time:"2026-04-03 09:30",status:"rejected",desc:"Withdrawal rejected - limit exceeded" },
];
const LINKS_DATA = [
  { id:"LNK001",code:"CRY-X9P2",url:"https://exchange.io/ref/CRY-X9P2",camp:"Q2 Push",clicks:5840,conv:78,created:"2026-03-01" },
  { id:"LNK002",code:"CRY-M7K4",url:"https://exchange.io/ref/CRY-M7K4",camp:"Telegram Blast",clicks:3210,conv:45,created:"2026-03-15" },
  { id:"LNK003",code:"CRY-T3R8",url:"https://exchange.io/ref/CRY-T3R8",camp:"TikTok Wave",clicks:7920,conv:112,created:"2026-04-01" },
];
const CAMPAIGNS = [
  { id:"CPG001",name:"Q2 Mega Push",src:"Telegram",clicks:45820,conv:612,rev:18420,roi:340,status:"active" },
  { id:"CPG002",name:"TikTok Wave",src:"TikTok",clicks:32190,conv:388,rev:11240,roi:220,status:"active" },
  { id:"CPG003",name:"FB Retarget",src:"Facebook",clicks:18740,conv:194,rev:6180,roi:180,status:"paused" },
  { id:"CPG004",name:"Twitter Alpha",src:"Twitter",clicks:9850,conv:98,rev:3200,roi:120,status:"active" },
];
const USERS_A = [
  { id:"USR001",uname:"crypto_king",email:"king@mail.com",bal:8920.50,earned:24000,withdrawn:15080,status:"active",role:"user" },
  { id:"USR002",uname:"defi_master",email:"def@mail.com",bal:7340.20,earned:19000,withdrawn:11660,status:"active",role:"moderator" },
  { id:"USR003",uname:"moon_trader",email:"moon@mail.com",bal:5870.90,earned:12000,withdrawn:6129,status:"suspended",role:"user" },
  { id:"USR004",uname:"whale_alert",email:"whale@mail.com",bal:4230.00,earned:9500,withdrawn:5270,status:"active",role:"user" },
];
const WITHDRAWS = [
  { id:"WR001",user:"crypto_king",amt:2000,coin:"USDT",addr:"0x9f2...4ab",time:"2026-04-05 14:00",status:"pending" },
  { id:"WR002",user:"defi_master",amt:1500,coin:"USDT",addr:"TRXk...9mP",time:"2026-04-05 12:30",status:"pending" },
  { id:"WR003",user:"btc_hodler",amt:0.05,coin:"BTC",addr:"bc1q...7rx",time:"2026-04-04 22:00",status:"pending" },
  { id:"WR004",user:"moon_trader",amt:800,coin:"USDT",addr:"0x3a1...8bc",time:"2026-04-04 18:00",status:"success" },
];
const LOGS = [
  { id:1,admin:"superadmin",action:"setBalance",target:"crypto_king",detail:"Set balance: 8920.50 USDT",time:"2026-04-05 13:00",sev:"high" },
  { id:2,admin:"superadmin",action:"approveWithdraw",target:"moon_trader",detail:"Approved WR004 – 800 USDT",time:"2026-04-04 18:05",sev:"medium" },
  { id:3,admin:"mod_01",action:"adjustStats",target:"defi_master",detail:"Clicks adjusted: 19230 → 19500",time:"2026-04-04 15:22",sev:"medium" },
  { id:4,admin:"superadmin",action:"suspendUser",target:"moon_trader",detail:"Account suspended – fraud pattern",time:"2026-04-03 11:00",sev:"critical" },
  { id:5,admin:"mod_01",action:"rejectWithdraw",target:"moon_trader",detail:"Rejected WR – daily limit exceeded",time:"2026-04-03 09:30",sev:"low" },
];
const HMAP = Array.from({length:7},(_,d)=>Array.from({length:24},(_,h)=>({d,h,v:Math.floor(Math.random()*100)}))).flat();

// ─── MINI BAR CHART ────────────────────────────────────────────────────────
const BarChart = ({ data, h=70, color="#00dcff" }) => {
  const mx = Math.max(...data);
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:3,height:h}}>
      {data.map((v,i)=>(
        <div key={i} style={{flex:1,height:`${(v/mx)*100}%`,minHeight:2,
          background:`linear-gradient(180deg,${color},${color}22)`,
          borderRadius:"3px 3px 0 0",opacity:0.5+(v/mx)*0.5,cursor:"default",
          transition:"opacity .2s"}} />
      ))}
    </div>
  );
};

// ─── SPARKLINE ─────────────────────────────────────────────────────────────
const Spark = ({ data, w=60, h=24, color="#00dcff" }) => {
  const mx=Math.max(...data), mn=Math.min(...data);
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${(1-(v-mn)/(mx-mn||1))*h}`).join(" ");
  return <svg width={w} height={h} style={{overflow:"visible"}}>
    <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" style={{filter:`drop-shadow(0 0 3px ${color})`}}/>
  </svg>;
};

// ─── STAT CARD ─────────────────────────────────────────────────────────────
const StatCard = ({ title, value, sub, icon, color="var(--cy)", trend, loading }) => (
  <div className="glass anim" style={{padding:"22px 24px",position:"relative",overflow:"hidden",cursor:"default",transition:"transform .2s,box-shadow .2s"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 32px ${color}22`}}
    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
    <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,background:`radial-gradient(circle,${color}15,transparent 70%)`,borderRadius:"50%",pointerEvents:"none"}}/>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
      <div style={{background:`${color}18`,border:`1px solid ${color}30`,borderRadius:10,padding:8,display:"flex"}}>
        <I n={icon} s={17} c={color}/>
      </div>
      {trend!==undefined&&<span className="badge" style={{background:trend>=0?"rgba(0,255,136,.12)":"rgba(255,69,96,.12)",color:trend>=0?"var(--gr)":"var(--rd)",border:`1px solid ${trend>=0?"rgba(0,255,136,.3)":"rgba(255,69,96,.3)"}`}}>
        {trend>=0?"▲":"▼"}{Math.abs(trend)}%
      </span>}
    </div>
    {loading?<><div className="skeleton" style={{height:26,width:"60%",marginBottom:8}}/><div className="skeleton" style={{height:13,width:"80%"}}/></>
    :<>
      <div style={{fontFamily:"var(--fd)",fontSize:21,fontWeight:800,color,letterSpacing:1,marginBottom:4,textShadow:`0 0 20px ${color}55`}}>{value}</div>
      <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)"}}>{title}</div>
      {sub&&<div style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)",marginTop:5}}>{sub}</div>}
    </>}
  </div>
);

// ─── HEATMAP ───────────────────────────────────────────────────────────────
const Heatmap = () => {
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const hrs=Array.from({length:24},(_,i)=>i);
  const mx=Math.max(...HMAP.map(x=>x.v));
  return (
    <div style={{overflowX:"auto"}}>
      <div style={{display:"flex",gap:3,marginBottom:6,paddingLeft:34}}>
        {hrs.map(h=><div key={h} style={{width:18,minWidth:18,textAlign:"center",fontFamily:"var(--fm)",fontSize:8,color:"var(--t3)"}}>{h%4===0?h:""}</div>)}
      </div>
      {days.map((day,d)=>(
        <div key={d} style={{display:"flex",gap:3,marginBottom:3,alignItems:"center"}}>
          <div style={{width:30,fontFamily:"var(--fm)",fontSize:9,color:"var(--t3)",textAlign:"right",paddingRight:4}}>{day}</div>
          {hrs.map(h=>{
            const cell=HMAP.find(x=>x.d===d&&x.h===h);
            const intensity=cell?cell.v/mx:0;
            return <div key={h} title={`${day} ${h}:00 — ${cell?.v||0} clicks`} style={{
              width:18,minWidth:18,height:18,borderRadius:3,cursor:"default",transition:"transform .1s",
              background:`rgba(0,220,255,${0.05+intensity*.7})`,
              boxShadow:intensity>.7?`0 0 5px rgba(0,220,255,${intensity*.5})`:"none"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.35)"}
              onMouseLeave={e=>e.currentTarget.style.transform=""}/>;
          })}
        </div>
      ))}
      <div style={{display:"flex",alignItems:"center",gap:5,marginTop:10,paddingLeft:34}}>
        <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--t3)"}}>Low</span>
        {[0,.2,.4,.6,.8,1].map((v,i)=><div key={i} style={{width:14,height:14,borderRadius:3,background:`rgba(0,220,255,${0.05+v*.7})`}}/>)}
        <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--t3)"}}>High</span>
      </div>
    </div>
  );
};

// ─── FUNNEL ────────────────────────────────────────────────────────────────
const Funnel = () => {
  const steps=[
    {label:"Clicks",value:284750,pct:100,color:"#00dcff"},
    {label:"Registered",value:12430,pct:4.37,color:"#a855f7"},
    {label:"Deposited",value:5840,pct:2.05,color:"#00ff88"},
    {label:"Profit",value:3842,pct:1.35,color:"#ffd700"},
  ];
  return <div>
    {steps.map((s,i)=>(
      <div key={i} style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontFamily:"var(--fd)",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:s.color}}>{s.label}</span>
          <span style={{fontFamily:"var(--fm)",fontSize:12,color:"var(--t1)",fontWeight:600}}>{s.value.toLocaleString()}</span>
        </div>
        <div className="pbar"><div className="pfill" style={{width:`${s.pct}%`,background:s.color,boxShadow:`0 0 8px ${s.color}`}}/></div>
        <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)",marginTop:3}}>{s.pct}% conversion</div>
        {i<steps.length-1&&<div style={{textAlign:"center",color:"var(--t3)",marginTop:4}}>↓</div>}
      </div>
    ))}
  </div>;
};

// ─── PAGES ─────────────────────────────────────────────────────────────────

const Dashboard = ({ loading }) => {
  const [rv, setRv] = useState(47823.56);
  const [chart, setChart] = useState(Array.from({length:30},()=>Math.floor(40+Math.random()*60)));
  useEffect(()=>{
    const t=setInterval(()=>{
      setRv(v=>+(v+(Math.random()-.35)*12).toFixed(2));
      setChart(p=>[...p.slice(1),Math.floor(40+Math.random()*60)]);
    },2600);
    return ()=>clearInterval(t);
  },[]);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:22}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:19,fontWeight:900,letterSpacing:2}}>
            <span className="grad-cy">COMMAND</span> <span style={{color:"var(--t2)"}}>CENTER</span>
          </h1>
          <div style={{display:"flex",alignItems:"center",gap:7,marginTop:4}}>
            <span className="live"/><span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)"}}>Live feed · Synced just now</span>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {["24h","7d","30d","ALL"].map(t=>(
            <button key={t} className="btn-g" style={{padding:"6px 14px"}}>{t}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14}}>
        <StatCard loading={loading} title="Total Earning" value={`$${rv.toLocaleString("en",{minimumFractionDigits:2})}`} sub="≈ 1.284 BTC / 18.34 ETH" icon="zap" color="var(--cy)" trend={12.4}/>
        <StatCard loading={loading} title="Current Balance" value="$12,450.80" sub="Available for withdrawal" icon="wallet" color="var(--vi)" trend={-3.2}/>
        <StatCard loading={loading} title="Total Withdrawn" value="$35,372.76" sub="35 successful payouts" icon="dl" color="var(--gr)" trend={8.1}/>
        <StatCard loading={loading} title="Total Clicks" value="284,750" sub="6 traffic sources" icon="act" color="var(--gd)" trend={22.8}/>
        <StatCard loading={loading} title="Conv. Rate" value="1.35%" sub="Click → Deposit" icon="trend" color="#ff6b6b" trend={0.3}/>
        <StatCard loading={loading} title="Active Refs" value="1,248" sub="84 new this week" icon="users" color="#00d4aa" trend={15.9}/>
      </div>

      {/* Chart + Breakdown */}
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}}>
        <div className="glass" style={{padding:"22px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div>
              <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:3}}>Revenue Chart — Realtime</div>
              <div style={{fontFamily:"var(--fd)",fontSize:18,fontWeight:700,color:"var(--cy)",textShadow:"0 0 20px rgba(0,220,255,.4)"}}>
                ${rv.toLocaleString("en",{minimumFractionDigits:2})}
              </div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <span className="badge b-cy">USDT</span>
              <span className="badge b-vi">BTC</span>
              <span className="badge" style={{background:"rgba(98,126,234,.15)",color:"#627eea",border:"1px solid rgba(98,126,234,.3)"}}>ETH</span>
            </div>
          </div>
          <BarChart data={chart} h={110}/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
            {["Apr 1","","Apr 8","","Apr 15","","Apr 22","","Apr 29"].map((d,i)=>(
              <span key={i} style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--t3)"}}>{d}</span>
            ))}
          </div>
        </div>

        <div className="glass" style={{padding:"22px 24px"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:18}}>Coin Breakdown</div>
          {[{coin:"USDT",val:23450,pct:49,color:"#00dcff"},{coin:"BTC",val:15280,pct:32,color:"#f7931a"},{coin:"ETH",val:9093,pct:19,color:"#627eea"}].map((c,i)=>(
            <div key={i} style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span className="badge" style={{background:`${c.color}18`,color:c.color,border:`1px solid ${c.color}40`}}>{c.coin}</span>
                <span style={{fontFamily:"var(--fm)",fontSize:12,color:"var(--t1)",fontWeight:600}}>${c.val.toLocaleString()}</span>
              </div>
              <div className="pbar"><div className="pfill" style={{width:`${c.pct}%`,background:c.color,boxShadow:`0 0 7px ${c.color}`}}/></div>
            </div>
          ))}
          {/* Donut */}
          <div style={{display:"flex",justifyContent:"center",marginTop:14}}>
            <svg width={90} height={90} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(0,220,255,.07)" strokeWidth="14"/>
              <circle cx="50" cy="50" r="36" fill="none" stroke="#00dcff" strokeWidth="14" strokeDasharray="113 226" strokeDashoffset="0" style={{filter:"drop-shadow(0 0 4px #00dcff)"}}/>
              <circle cx="50" cy="50" r="36" fill="none" stroke="#f7931a" strokeWidth="14" strokeDasharray="72 226" strokeDashoffset="-113" style={{filter:"drop-shadow(0 0 3px #f7931a)"}}/>
              <circle cx="50" cy="50" r="36" fill="none" stroke="#627eea" strokeWidth="14" strokeDasharray="43 226" strokeDashoffset="-185" style={{filter:"drop-shadow(0 0 3px #627eea)"}}/>
              <text x="50" y="55" textAnchor="middle" fill="var(--t1)" style={{fontFamily:"var(--fd)",fontSize:9,fontWeight:700}}>TOTAL</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Refs + Funnel */}
      <div style={{display:"grid",gridTemplateColumns:"1.7fr 1fr",gap:18}}>
        <div className="glass" style={{padding:"22px 24px"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:16}}>Top Referrers</div>
          <table className="tbl">
            <thead><tr><th>#</th><th>Username</th><th>Source</th><th>Clicks</th><th>Revenue</th><th>Δ</th></tr></thead>
            <tbody>
              {REFS.map((r,i)=>(
                <tr key={r.id}>
                  <td style={{color:i<3?"var(--gd)":"var(--t3)"}}>{i+1}</td>
                  <td style={{color:"var(--t1)",fontWeight:600}}>{r.name}</td>
                  <td><span className="badge b-vi" style={{fontSize:9}}>{r.src}</span></td>
                  <td>{r.clicks.toLocaleString()}</td>
                  <td style={{color:"var(--cy)"}}>${r.rev.toLocaleString()}</td>
                  <td style={{color:r.chg>=0?"var(--gr)":"var(--rd)"}}>{r.chg>=0?"▲":"▼"}{Math.abs(r.chg)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="glass" style={{padding:"22px 24px"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:16}}>Conversion Funnel</div>
          <Funnel/>
        </div>
      </div>

      {/* AI */}
      <div className="glass" style={{padding:"22px 24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:7,background:"rgba(168,85,247,.1)",border:"1px solid rgba(168,85,247,.25)",borderRadius:8,padding:"4px 12px"}}>
            <I n="ai" s={13} c="var(--vi)"/><span style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,color:"var(--vi)",textTransform:"uppercase"}}>AI Engine v2.6</span>
          </div>
          <span className="live"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
          {[
            {icon:"trend",color:"var(--cy)",title:"Revenue Forecast",val:"+18.4% next 7 days",detail:"Based on current Telegram campaign click velocity"},
            {icon:"alert",color:"var(--rd)",title:"Anomaly Detected",val:"Multi-account pattern",detail:"3 IPs with identical registration fingerprints — review sub-refs"},
            {icon:"zap",color:"var(--vi)",title:"Optimization Tip",val:"TikTok 18:00–21:00",detail:"Heatmap shows 3× higher conversion in evening slots"},
            {icon:"shield",color:"var(--gd)",title:"Fraud Risk: Low",val:"Score: 12 / 100",detail:"No significant spam click patterns in last 24 hours"},
          ].map((ins,i)=>(
            <div key={i} className="glass-sm" style={{padding:"14px 16px",borderLeft:`2px solid ${ins.color}`,animation:`fadeUp .4s ease ${i*.1}s both`}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}>
                <I n={ins.icon} s={13} c={ins.color}/>
                <span style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:ins.color}}>{ins.title}</span>
              </div>
              <div style={{fontFamily:"var(--fm)",fontSize:12,color:"var(--t1)",fontWeight:600,marginBottom:4}}>{ins.val}</div>
              <div style={{fontSize:11,color:"var(--t3)",lineHeight:1.5}}>{ins.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Statistics = () => {
  const [filt, setFilt] = useState("all");
  return (
    <div style={{display:"flex",flexDirection:"column",gap:22}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:19,fontWeight:900,letterSpacing:2}}><span className="grad-vi">ANALYTICS</span></h1>
          <div style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)",marginTop:4}}>Advanced affiliate statistics & campaign performance</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-g"><span style={{display:"flex",alignItems:"center",gap:5}}><I n="dl" s={12}/>CSV</span></button>
          <button className="btn-g"><span style={{display:"flex",alignItems:"center",gap:5}}><I n="filter" s={12}/>Filter</span></button>
        </div>
      </div>

      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        {["all","USDT","BTC","ETH","Facebook","TikTok","Telegram","Twitter"].map(f=>(
          <button key={f} onClick={()=>setFilt(f)} className={filt===f?"btn-p":"btn-g"} style={{padding:"7px 14px",fontSize:9}}>{f.toUpperCase()}</button>
        ))}
      </div>

      {/* Campaigns */}
      <div className="glass" style={{padding:"22px 24px"}}>
        <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:16}}>Campaign Performance</div>
        <table className="tbl">
          <thead><tr><th>Campaign</th><th>Source</th><th>Clicks</th><th>Conversions</th><th>Revenue</th><th>ROI</th><th>Trend</th><th>Status</th></tr></thead>
          <tbody>
            {CAMPAIGNS.map(c=>(
              <tr key={c.id}>
                <td style={{color:"var(--t1)",fontWeight:600}}>{c.name}</td>
                <td><span className="badge b-vi" style={{fontSize:9}}>{c.src}</span></td>
                <td>{c.clicks.toLocaleString()}</td>
                <td>{c.conv}</td>
                <td style={{color:"var(--cy)",fontWeight:600}}>${c.rev.toLocaleString()}</td>
                <td style={{color:"var(--gr)",fontWeight:600}}>{c.roi}%</td>
                <td><Spark data={Array.from({length:8},()=>40+Math.random()*60)} w={50} h={22}/></td>
                <td><span className={`badge ${c.status==="active"?"b-gr":"b-rd"}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Heatmap */}
      <div className="glass" style={{padding:"22px 24px"}}>
        <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:16}}>Click Heatmap · Hours × Days of Week</div>
        <Heatmap/>
      </div>

      {/* Ref Details */}
      <div className="glass" style={{padding:"22px 24px"}}>
        <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:16}}>Referrer Detail Breakdown</div>
        <table className="tbl">
          <thead><tr><th>User</th><th>Clicks</th><th>Registrations</th><th>Deposits</th><th>Revenue</th><th>Commission</th><th>Source</th></tr></thead>
          <tbody>
            {REFS.map(r=>(
              <tr key={r.id}>
                <td><div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,var(--cy),var(--vi))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#000",flexShrink:0}}>{r.name[0].toUpperCase()}</div>
                  <span style={{color:"var(--t1)"}}>{r.name}</span>
                </div></td>
                <td>{r.clicks.toLocaleString()}</td>
                <td>{Math.floor(r.clicks*.043)}</td>
                <td>{Math.floor(r.clicks*.021)}</td>
                <td style={{color:"var(--cy)"}}>${r.rev.toLocaleString()}</td>
                <td style={{color:"var(--gr)"}}>${(r.rev*.15).toFixed(2)}</td>
                <td><span className="badge b-vi" style={{fontSize:9}}>{r.src}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Links = () => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(null);
  const cp = (id) => { setCopied(id); setTimeout(()=>setCopied(null),2000); };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:22}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:19,fontWeight:900,letterSpacing:2}}><span className="grad-cy">AFFILIATE</span> <span style={{color:"var(--t2)"}}>LINKS</span></h1>
          <div style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)",marginTop:4}}>Create and manage tracking links with real-time analytics</div>
        </div>
        <button className="btn-p" onClick={()=>setShowModal(true)} style={{display:"flex",alignItems:"center",gap:7}}>
          <I n="plus" s={13}/>CREATE LINK
        </button>
      </div>

      {showModal&&(
        <div className="modal-bg">
          <div className="glass" style={{padding:32,width:420,animation:"fadeUp .3s ease"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:13,fontWeight:700,letterSpacing:2,color:"var(--cy)",marginBottom:24}}>CREATE TRACKING LINK</div>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {[["Campaign Name","e.g. Q2 Telegram Push"],["Target URL","https://exchange.io/register"]].map(([lb,ph])=>(
                <div key={lb}><div style={{fontFamily:"var(--fd)",fontSize:9,letterSpacing:1.5,color:"var(--t3)",marginBottom:6}}>{lb.toUpperCase()}</div><input className="inp" placeholder={ph}/></div>
              ))}
              <div><div style={{fontFamily:"var(--fd)",fontSize:9,letterSpacing:1.5,color:"var(--t3)",marginBottom:6}}>TRAFFIC SOURCE</div>
                <select className="inp">{["Telegram","TikTok","Facebook","Twitter","Discord","YouTube"].map(s=><option key={s}>{s}</option>)}</select>
              </div>
              <div style={{display:"flex",gap:10,marginTop:6}}>
                <button className="btn-p" style={{flex:1,padding:11}}>GENERATE</button>
                <button className="btn-g" style={{flex:1}} onClick={()=>setShowModal(false)}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {LINKS_DATA.map((lk,i)=>(
          <div key={lk.id} className="glass" style={{padding:"20px 24px",animation:`fadeUp .4s ease ${i*.1}s both`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{background:"rgba(0,220,255,.1)",border:"1px solid rgba(0,220,255,.2)",borderRadius:10,padding:"7px 12px",fontFamily:"var(--fd)",fontSize:12,fontWeight:700,color:"var(--cy)"}}>{lk.code}</div>
                <div>
                  <div style={{fontFamily:"var(--fb)",fontSize:13,color:"var(--t1)",fontWeight:600}}>{lk.camp}</div>
                  <div style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)",marginTop:2}}>Created {lk.created}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:7}}>
                <span className="badge b-gr">{lk.conv} conv.</span>
                <span className="badge b-cy">{lk.clicks.toLocaleString()} clicks</span>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="glass-sm" style={{flex:1,padding:"9px 14px",fontFamily:"var(--fm)",fontSize:12,color:"var(--t2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lk.url}</div>
              <button className="btn-g" onClick={()=>cp(lk.id)} style={{display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
                {copied===lk.id?<><I n="check" s={12} c="var(--gr)"/>COPIED</>:<><I n="copy" s={12}/>COPY</>}
              </button>
              <button className="btn-g" style={{display:"flex",alignItems:"center",gap:5}}><I n="qr" s={12}/>QR</button>
            </div>
            <div style={{marginTop:12}}><BarChart data={Array.from({length:14},()=>Math.floor(20+Math.random()*80))} h={38}/></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Wallet = () => {
  const [showWD, setShowWD] = useState(false);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:22}}>
      <h1 style={{fontFamily:"var(--fd)",fontSize:19,fontWeight:900,letterSpacing:2}}><span className="grad-gd">WALLET & EARNINGS</span></h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:14}}>
        {[{coin:"USDT",bal:"23,450.00",total:"35,280.00",wd:"11,830.00",color:"#26a17b",sym:"$"},{coin:"BTC",bal:"0.4820",total:"1.2845",wd:"0.8025",color:"#f7931a",sym:"₿"},{coin:"ETH",bal:"6.342",total:"18.342",wd:"12.000",color:"#627eea",sym:"Ξ"}].map((c,i)=>(
          <div key={i} className="glass" style={{padding:"22px 24px",borderTop:`2px solid ${c.color}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
              <div style={{fontFamily:"var(--fd)",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:c.color}}>{c.coin}</div>
              <span style={{fontSize:22}}>{c.sym}</span>
            </div>
            <div style={{fontFamily:"var(--fd)",fontSize:22,fontWeight:800,color:"var(--t1)",marginBottom:4}}>{c.bal}</div>
            <div style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)",marginBottom:12}}>Available Balance</div>
            <div style={{display:"flex",gap:14,marginBottom:16}}>
              <div><div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)"}}>Total Earned</div><div style={{fontFamily:"var(--fm)",fontSize:13,color:"var(--gr)",fontWeight:600}}>{c.total}</div></div>
              <div><div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)"}}>Withdrawn</div><div style={{fontFamily:"var(--fm)",fontSize:13,color:"var(--t2)",fontWeight:600}}>{c.wd}</div></div>
            </div>
            <button className="btn-p" style={{width:"100%",padding:10}} onClick={()=>setShowWD(true)}>WITHDRAW</button>
          </div>
        ))}
      </div>

      {showWD&&(
        <div className="modal-bg">
          <div className="glass" style={{padding:32,width:420,animation:"fadeUp .3s ease"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:13,fontWeight:700,letterSpacing:2,color:"var(--cy)",marginBottom:24}}>WITHDRAW FUNDS</div>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {[["Coin","select"],["Network","select"],["Wallet Address","text"],["Amount","number"]].map(([lb,tp])=>(
                <div key={lb}><div style={{fontFamily:"var(--fd)",fontSize:9,letterSpacing:1.5,color:"var(--t3)",marginBottom:6}}>{lb.toUpperCase()}</div>
                  {tp==="select"?<select className="inp">{lb==="Coin"?["USDT","BTC","ETH"].map(x=><option key={x}>{x}</option>):["TRC20","ERC20","BEP20"].map(x=><option key={x}>{x}</option>)}</select>
                  :<input className="inp" type={tp} placeholder={lb==="Wallet Address"?"Enter wallet address...":"Min: 50 USDT"}/>}
                </div>
              ))}
              <div className="glass-sm" style={{padding:"10px 14px"}}>
                <div style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)"}}>Network fee: <span style={{color:"var(--gd)"}}>1 USDT</span> · Processing: 1–24h · 2FA required</div>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button className="btn-p" style={{flex:1,padding:11}}>CONFIRM</button>
                <button className="btn-g" style={{flex:1}} onClick={()=>setShowWD(false)}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="glass" style={{padding:"22px 24px"}}>
        <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:16}}>Transaction History</div>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Type</th><th>Amount</th><th>Coin</th><th>Time</th><th>Status</th><th>Description</th></tr></thead>
          <tbody>
            {TXNS.map(tx=>(
              <tr key={tx.id}>
                <td style={{fontSize:11}}>{tx.id}</td>
                <td><span className={`badge ${tx.type==="commission"?"b-gr":"b-vi"}`}>{tx.type}</span></td>
                <td style={{color:tx.amt>0?"var(--gr)":"var(--rd)",fontWeight:600}}>{tx.amt>0?"+":""}{tx.amt}</td>
                <td><span className="badge b-cy" style={{fontSize:9}}>{tx.coin}</span></td>
                <td style={{fontSize:11}}>{tx.time}</td>
                <td><span className={`badge ${tx.status==="success"?"b-gr":tx.status==="pending"?"b-gd":"b-rd"}`}>{tx.status}</span></td>
                <td style={{fontSize:11,color:"var(--t3)"}}>{tx.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Admin = () => {
  const [sec, setSec] = useState("users");
  const [editU, setEditU] = useState(null);
  const [editV, setEditV] = useState("");
  const [users, setUsers] = useState(USERS_A);
  const [wds, setWds] = useState(WITHDRAWS);

  const applyBal = (uid, newBal) => { setUsers(p=>p.map(u=>u.id===uid?{...u,bal:parseFloat(newBal)||u.bal}:u)); setEditU(null); };
  const actWd = (id, st) => setWds(p=>p.map(w=>w.id===id?{...w,status:st}:w));

  return (
    <div style={{display:"flex",flexDirection:"column",gap:22}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:19,fontWeight:900,letterSpacing:2}}><span className="grad-vi">ADMIN</span> <span style={{color:"var(--t2)"}}>PANEL</span></h1>
          <div style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)",marginTop:4}}>Superadmin · Full system access</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span className="badge b-rd">ADMIN MODE</span>
          <span className="live"/>
        </div>
      </div>

      <div className="tab-bar">
        {[["users","users","User Management"],["wds","wallet","Withdrawals"],["logs","list","Audit Logs"]].map(([k,ic,lb])=>(
          <button key={k} className={`tab-i ${sec===k?"on":""}`} onClick={()=>setSec(k)}>
            <span style={{display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}><I n={ic} s={11}/>{lb}</span>
          </button>
        ))}
      </div>

      {/* USERS */}
      {sec==="users"&&(
        <div className="glass" style={{padding:"22px 24px"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:16}}>User Accounts · Balance & Stats Control</div>
          <table className="tbl">
            <thead><tr><th>User</th><th>Role</th><th>Balance</th><th>Earned</th><th>Withdrawn</th><th>Status</th><th>Edit</th></tr></thead>
            <tbody>
              {users.map(u=>(
                <tr key={u.id}>
                  <td><div><div style={{color:"var(--t1)",fontWeight:600}}>{u.uname}</div><div style={{fontSize:10,color:"var(--t3)"}}>{u.email}</div></div></td>
                  <td><span className={`badge ${u.role==="admin"?"b-rd":u.role==="moderator"?"b-vi":"b-cy"}`}>{u.role}</span></td>
                  <td style={{color:"var(--cy)",fontWeight:600}}>${u.bal.toLocaleString()}</td>
                  <td style={{color:"var(--gr)"}}>${u.earned.toLocaleString()}</td>
                  <td style={{color:"var(--t2)"}}>${u.withdrawn.toLocaleString()}</td>
                  <td><span className={`badge ${u.status==="active"?"b-gr":"b-rd"}`}>{u.status}</span></td>
                  <td><button className="btn-g" onClick={()=>{setEditU(u);setEditV("")}} style={{padding:"5px 10px",fontSize:9,display:"flex",alignItems:"center",gap:4}}><I n="edit" s={11}/>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editU&&(
        <div className="modal-bg">
          <div className="glass" style={{padding:30,width:460,animation:"fadeUp .3s ease",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:13,fontWeight:700,letterSpacing:2,color:"var(--vi)",marginBottom:4}}>EDIT USER</div>
            <div style={{fontFamily:"var(--fm)",fontSize:12,color:"var(--t2)",marginBottom:22}}>{editU.uname} · {editU.id}</div>

            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {/* Balance */}
              <div className="glass-sm" style={{padding:16}}>
                <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:1.5,color:"var(--cy)",marginBottom:12}}>BALANCE CONTROLS</div>
                <div style={{marginBottom:10}}>
                  <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:1.5,color:"var(--t3)",marginBottom:6}}>AMOUNT (USDT)</div>
                  <input className="inp" type="number" placeholder={`Current: $${editU.bal}`} value={editV} onChange={e=>setEditV(e.target.value)}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <button className="btn-p" style={{padding:9,fontSize:9}} onClick={()=>applyBal(editU.id,editV)}>SET BALANCE</button>
                  <button className="btn-ok" style={{padding:9}} onClick={()=>applyBal(editU.id,editU.bal+parseFloat(editV||0))}>ADD AMOUNT</button>
                  <button className="btn-err" style={{padding:9}} onClick={()=>applyBal(editU.id,Math.max(0,editU.bal-parseFloat(editV||0)))}>SUBTRACT</button>
                  <button className="btn-g" style={{padding:9}}>SET WITHDRAWN</button>
                </div>
              </div>

              {/* Stats adjustment */}
              <div className="glass-sm" style={{padding:16}}>
                <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:1.5,color:"var(--vi)",marginBottom:12}}>STATS ADJUSTMENT (ADMIN CORRECTION)</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <input className="inp" placeholder="Override Clicks" type="number"/>
                  <input className="inp" placeholder="Override Revenue" type="number"/>
                  <input className="inp" placeholder="Override Conversions" type="number"/>
                  <input className="inp" placeholder="Override Conv. Rate %" type="number"/>
                </div>
                <button className="btn-g" style={{width:"100%",marginTop:10}}>APPLY CORRECTIONS</button>
              </div>

              {/* Role + Status */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div><div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:1.5,color:"var(--t3)",marginBottom:6}}>ROLE</div>
                  <select className="inp"><option>user</option><option>moderator</option><option>admin</option></select></div>
                <div><div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:1.5,color:"var(--t3)",marginBottom:6}}>STATUS</div>
                  <select className="inp"><option>active</option><option>suspended</option><option>banned</option></select></div>
              </div>

              <div style={{display:"flex",gap:10}}>
                <button className="btn-p" style={{flex:1,padding:11}}>SAVE CHANGES</button>
                <button className="btn-g" style={{flex:1}} onClick={()=>setEditU(null)}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WITHDRAWALS */}
      {sec==="wds"&&(
        <div className="glass" style={{padding:"22px 24px"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:16}}>Withdrawal Requests</div>
          <table className="tbl">
            <thead><tr><th>ID</th><th>User</th><th>Amount</th><th>Address</th><th>Time</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {wds.map(w=>(
                <tr key={w.id}>
                  <td style={{fontSize:11}}>{w.id}</td>
                  <td style={{color:"var(--t1)",fontWeight:600}}>{w.user}</td>
                  <td style={{color:"var(--cy)",fontWeight:600}}>{w.amt} <span className="badge b-cy" style={{fontSize:9}}>{w.coin}</span></td>
                  <td style={{fontSize:11,maxWidth:100,overflow:"hidden",textOverflow:"ellipsis"}}>{w.addr}</td>
                  <td style={{fontSize:11}}>{w.time}</td>
                  <td><span className={`badge ${w.status==="success"?"b-gr":w.status==="pending"?"b-gd":"b-rd"}`}>{w.status}</span></td>
                  <td>{w.status==="pending"&&<div style={{display:"flex",gap:6}}>
                    <button className="btn-ok" style={{padding:"5px 10px"}} onClick={()=>actWd(w.id,"success")}><I n="check" s={12}/></button>
                    <button className="btn-err" style={{padding:"5px 10px"}} onClick={()=>actWd(w.id,"rejected")}><I n="x" s={12}/></button>
                  </div>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AUDIT LOGS */}
      {sec==="logs"&&(
        <div className="glass" style={{padding:"22px 24px"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:16}}>System Audit Log — Immutable Record</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {LOGS.map(log=>(
              <div key={log.id} className="glass-sm" style={{padding:"14px 18px",borderLeft:`2px solid ${log.sev==="critical"?"var(--rd)":log.sev==="high"?"var(--gd)":log.sev==="medium"?"var(--vi)":"var(--t3)"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <span className="badge b-vi" style={{fontSize:9}}>{log.admin}</span>
                    <span className={`badge ${log.sev==="critical"?"b-rd":log.sev==="high"?"b-gd":"b-vi"}`}>{log.sev}</span>
                    <span style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:1.5,color:"var(--cy)",textTransform:"uppercase"}}>{log.action}</span>
                  </div>
                  <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)"}}>{log.time}</span>
                </div>
                <div style={{fontFamily:"var(--fm)",fontSize:12,color:"var(--t2)"}}>
                  Target: <span style={{color:"var(--t1)"}}>{log.target}</span> — {log.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── NAV CONFIG ────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard", icon:"dash", label:"Dashboard" },
  { id:"statistics", icon:"stat", label:"Statistics" },
  { id:"links", icon:"link", label:"Aff. Links" },
  { id:"wallet", icon:"wallet", label:"Wallet" },
  { id:"admin", icon:"admin", label:"Admin" },
];

// ─── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState(false);

  useEffect(()=>{ const t=setTimeout(()=>setLoading(false),1600); return ()=>clearTimeout(t); },[]);
  useEffect(()=>{ setLoading(true); const t=setTimeout(()=>setLoading(false),500); return ()=>clearTimeout(t); },[page]);

  const pages = { dashboard:<Dashboard loading={loading}/>, statistics:<Statistics/>, links:<Links/>, wallet:<Wallet/>, admin:<Admin/> };

  return (
    <>
      <style>{FONTS}{GS}</style>
      <div className="bg-grid" style={{minHeight:"100vh",position:"relative"}}>
        {/* Ambient */}
        <div style={{position:"fixed",top:-80,left:-80,width:480,height:480,background:"radial-gradient(circle,rgba(0,220,255,.04),transparent 60%)",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"fixed",bottom:-80,right:-80,width:560,height:560,background:"radial-gradient(circle,rgba(168,85,247,.04),transparent 60%)",pointerEvents:"none",zIndex:0}}/>

        <div style={{display:"flex",minHeight:"100vh",position:"relative",zIndex:1}}>
          {/* SIDEBAR */}
          <div style={{width:210,minWidth:210,background:"rgba(5,11,18,.94)",borderRight:"1px solid rgba(0,220,255,.07)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",padding:"0 10px",position:"sticky",top:0,height:"100vh",overflow:"hidden"}}>
            {/* Logo */}
            <div style={{padding:"22px 8px 18px",borderBottom:"1px solid rgba(0,220,255,.06)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,background:"linear-gradient(135deg,#00dcff,#a855f7)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 20px rgba(0,220,255,.4)",flexShrink:0}}>
                  <span style={{fontFamily:"var(--fd)",fontSize:13,fontWeight:900,color:"#000"}}>CA</span>
                </div>
                <div>
                  <div style={{fontFamily:"var(--fd)",fontSize:11,fontWeight:800,letterSpacing:2,color:"var(--t1)"}}>CRYPTOAFF</div>
                  <div style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--t3)",letterSpacing:1}}>v2.6 PRO</div>
                </div>
              </div>
            </div>

            <nav style={{flex:1,paddingTop:14,display:"flex",flexDirection:"column",gap:3}}>
              {NAV.map(item=>(
                <button key={item.id} className={`nav-i ${page===item.id?"on":""}`} onClick={()=>setPage(item.id)}>
                  <I n={item.icon} s={15} c={page===item.id?"var(--cy)":"var(--t3)"}/>
                  {item.label}
                  {item.id==="admin"&&<span className="badge b-rd" style={{marginLeft:"auto",fontSize:8,padding:"2px 6px"}}>2</span>}
                </button>
              ))}

              <div style={{margin:"14px 0 6px",borderTop:"1px solid rgba(0,220,255,.05)",paddingTop:14}}>
                <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",padding:"0 14px",marginBottom:8}}>System</div>
                {[{id:"settings",icon:"shield",lb:"Security"},{id:"api",icon:"zap",lb:"API Keys"}].map(x=>(
                  <button key={x.id} className="nav-i" onClick={()=>{}}><I n={x.icon} s={14} c="var(--t3)"/>{x.lb}</button>
                ))}
              </div>
            </nav>

            {/* User */}
            <div style={{padding:"14px 8px",borderTop:"1px solid rgba(0,220,255,.06)"}}>
              <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                <div style={{width:30,height:30,background:"linear-gradient(135deg,var(--cy),var(--vi))",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#000",flexShrink:0}}>A</div>
                <div>
                  <div style={{fontFamily:"var(--fd)",fontSize:9,letterSpacing:1,color:"var(--t1)"}}>superadmin</div>
                  <div style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--t3)"}}>admin@crypto.io</div>
                </div>
              </div>
              <button className="nav-i" style={{justifyContent:"center"}}><I n="logout" s={13}/>Logout</button>
            </div>
          </div>

          {/* MAIN */}
          <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
            {/* Topbar */}
            <div style={{position:"sticky",top:0,zIndex:50,background:"rgba(2,4,8,.87)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,220,255,.07)",padding:"13px 26px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"var(--t3)"}}>CryptoAff</span>
                <span style={{color:"var(--t3)"}}>›</span>
                <span style={{fontFamily:"var(--fd)",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"var(--cy)"}}>{NAV.find(n=>n.id===page)?.label}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {/* Price ticker */}
                <div className="glass-sm" style={{padding:"5px 14px",display:"flex",gap:14}}>
                  {[{s:"BTC",v:"$83,420",c:"+2.1%"},{s:"ETH",v:"$3,842",c:"+0.8%"},{s:"USDT",v:"$1.000",c:"0.0%"}].map(t=>(
                    <div key={t.s} style={{display:"flex",gap:5,alignItems:"center"}}>
                      <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--t3)"}}>{t.s}</span>
                      <span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--t1)",fontWeight:600}}>{t.v}</span>
                      <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--gr)"}}>{t.c}</span>
                    </div>
                  ))}
                </div>

                {/* Notif */}
                <div style={{position:"relative"}}>
                  <button className="btn-g" style={{padding:"6px 10px",position:"relative"}} onClick={()=>setNotif(!notif)}>
                    <I n="bell" s={14}/>
                    <span style={{position:"absolute",top:2,right:2,width:7,height:7,background:"var(--rd)",borderRadius:"50%",border:"1px solid var(--bg0)"}}/>
                  </button>
                  {notif&&(
                    <div className="glass" style={{position:"absolute",top:40,right:0,width:290,padding:16,zIndex:200}}>
                      <div style={{fontFamily:"var(--fd)",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--cy)",marginBottom:10}}>Notifications</div>
                      {[{msg:"Withdrawal request from crypto_king",t:"2m ago",c:"var(--rd)"},{msg:"Commission earned: +$245.80 USDT",t:"14m ago",c:"var(--gr)"},{msg:"AI: Anomaly in sub-ref traffic",t:"1h ago",c:"var(--gd)"}].map((n,i)=>(
                        <div key={i} className="glass-sm" style={{padding:"10px 12px",marginBottom:7,borderLeft:`2px solid ${n.c}`}}>
                          <div style={{fontSize:12,color:"var(--t2)",marginBottom:3}}>{n.msg}</div>
                          <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)"}}>{n.t}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <span className="badge b-gr" style={{display:"flex",alignItems:"center",gap:4}}>
                  <I n="shield" s={10} c="var(--gr)"/>2FA ON
                </span>
              </div>
            </div>

            {/* Content */}
            <main style={{flex:1,padding:"26px 26px",overflowY:"auto"}}>
              {loading
                ? <div style={{display:"flex",flexDirection:"column",gap:18}}>{[1,2,3].map(i=><div key={i} className="skeleton" style={{height:80+i*25}}/>)}</div>
                : pages[page] || pages.dashboard
              }
            </main>

            {/* Footer */}
            <div style={{padding:"10px 26px",borderTop:"1px solid rgba(0,220,255,.05)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
              <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)"}}>CryptoAff v2.6 · WebSocket: <span style={{color:"var(--gr)"}}>CONNECTED</span> · Latency: 12ms</span>
              <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)"}}>REST + WebSocket · SHA-256 · JWT + 2FA · Rate-limited</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
