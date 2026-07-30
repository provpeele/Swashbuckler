
const tripDate = new Date('2027-04-15T08:00:00-05:00');

function updateCountdown(){
  const now = new Date();
  let diff = tripDate - now;
  const el = document.getElementById('countdown');
  if(diff <= 0){ el.innerHTML = '<div><strong>Game on</strong><span>Swashbuckler</span></div>'; return; }
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const mins = Math.floor(diff / 60000);
  el.innerHTML = `
    <div><strong>${days}</strong><span>Days</span></div>
    <div><strong>${hours}</strong><span>Hours</span></div>
    <div><strong>${mins}</strong><span>Minutes</span></div>`;
}
updateCountdown();
setInterval(updateCountdown, 60000);

function navigate(target){
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === target));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.target === target));
  window.scrollTo({top:0, behavior:'smooth'});
}
document.querySelectorAll('[data-target]').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.target)));

document.querySelectorAll('.reveal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.course-card');
    card.classList.toggle('open');
    btn.textContent = card.classList.contains('open') ? 'Hide trip notes' : 'View trip notes';
  });
});

const roster = [
  {name:'Jay Eally', nick:'Scratch Daddy', hcp:'+0.7', team:1},
  {name:'Brian Peele', nick:'Easy Street', hcp:'11.8', team:1},
  {name:'Adam King', nick:'Chili Dipper', hcp:'3.0', team:2},
  {name:'Julian Hudnell', nick:'Pay Day', hcp:'10.8', team:2},
  {name:'Josh Girouard', nick:'Hot, Cold, Hosel', hcp:'4.4', team:3},
  {name:'Trey Dobson', nick:'Banana Fade', hcp:'7.5', team:3},
  {name:'Micheal Downing', nick:'Boom & Bust', hcp:'4.9', team:4},
  {name:'Johnson Little', nick:'Chirp and Burn', hcp:'5.0', team:4}
];
document.getElementById('rosterGrid').innerHTML = roster.map(p => `
  <article class="player-card">
    <div class="avatar">${p.name.split(' ').map(x=>x[0]).join('')}</div>
    <h3>${p.name}</h3>
    <em>“${p.nick}”</em>
    <div class="player-meta"><span>HCP ${p.hcp}</span><span>Team ${p.team}</span></div>
  </article>`).join('');

const checklistItems = [
  'Pay $600 deposit',
  'Book flight',
  'Submit current handicap',
  'Confirm roommate preference',
  'Pack cash for side bets'
];
const checklistState = JSON.parse(localStorage.getItem('swashChecklist') || '{}');
function renderChecklist(){
  document.getElementById('checklist').innerHTML = checklistItems.map((item, i) => `
    <label class="check-row ${checklistState[i] ? 'done' : ''}">
      <input type="checkbox" data-check="${i}" ${checklistState[i] ? 'checked' : ''}>
      <span>${item}</span>
    </label>`).join('');
  document.querySelectorAll('[data-check]').forEach(cb => cb.addEventListener('change', () => {
    checklistState[cb.dataset.check] = cb.checked;
    localStorage.setItem('swashChecklist', JSON.stringify(checklistState));
    renderChecklist();
  }));
}
renderChecklist();

const depositPaid = document.getElementById('depositPaid');
depositPaid.checked = localStorage.getItem('swashDeposit') === 'true';
depositPaid.addEventListener('change', () => localStorage.setItem('swashDeposit', depositPaid.checked));

document.querySelectorAll('[data-save]').forEach(cb => {
  const key = `swash_${cb.dataset.save}`;
  cb.checked = localStorage.getItem(key) === 'true';
  cb.addEventListener('change', () => localStorage.setItem(key, cb.checked));
});

let scores = JSON.parse(localStorage.getItem('swashScores') || '{"1":0,"2":0,"3":0,"4":0}');
function renderLeaderboard(){
  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  document.getElementById('leaderboard').innerHTML = sorted.map(([team,score], idx) => `
    <div class="leader-row">
      <div><strong>${idx+1}. Team ${team}</strong><div style="color:#7a847e;font-size:.8rem">${roster.filter(p=>String(p.team)===team).map(p=>p.name.split(' ')[0]).join(' / ')}</div></div>
      <div class="score-control">
        <button data-team="${team}" data-delta="-0.5">−</button>
        <strong>${Number(score).toFixed(1)}</strong>
        <button data-team="${team}" data-delta="0.5">+</button>
      </div>
    </div>`).join('');
  document.querySelectorAll('[data-delta]').forEach(btn => btn.addEventListener('click', () => {
    const team = btn.dataset.team;
    scores[team] = Math.max(0, Number(scores[team]) + Number(btn.dataset.delta));
    localStorage.setItem('swashScores', JSON.stringify(scores));
    renderLeaderboard();
  }));
}
renderLeaderboard();
document.getElementById('resetScores').addEventListener('click', () => {
  scores = {"1":0,"2":0,"3":0,"4":0};
  localStorage.setItem('swashScores', JSON.stringify(scores));
  renderLeaderboard();
});

