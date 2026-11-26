
// ===== SHELTER: 유기묘 보호소 · 임시보호 5일 · 입양 =====
const SH_CATS=[
 {i:150,n:'구름이',b:'#9A9488',d:'#4E4A44',e:'g',p:'t',ear:'n',f:'',t:'비 오는 날 아파트 앞 상자 안에서 발견됐어요. 천둥소리를 무서워해요.'},
 {i:151,n:'치즈',b:'#F0A85A',d:'#B8692A',e:'y',p:'t',ear:'n',f:'',t:'시장 골목에서 혼자 울고 있던 아기 고양이예요. 밥 먹을 때 꾹꾹이를 해요.'},
 {i:152,n:'까미',b:'#2E2D38',d:'#1E1D26',e:'y',p:'s',ear:'n',f:'',t:'검은 고양이는 무섭다는 편견 때문에 보호소에서 오래 기다렸어요.'},
 {i:153,n:'삼순이',b:'#F5EFE6',d:'#E08A3C',e:'g',p:'k',ear:'n',f:'',t:'다리를 다쳐 구조됐어요. 지금은 다 나아서 잘 뛰어다녀요.'},
 {i:154,n:'젖소',b:'#FFFFFF',d:'#2E2D38',e:'y',p:'w',ear:'n',f:'',t:'이사 가는 집에 혼자 남겨졌어요. 사람 무릎을 제일 좋아해요.'},
 {i:155,n:'콩떡',b:'#2E2D38',d:'#2E2D38',e:'g',p:'m',ear:'n',f:'',t:'공원 벤치 밑에서 발견된 턱시도예요. 겁이 많지만 장난감을 보면 신나요.'}];
const SH_DAYS=5;
const SH_TIPS=['고양이는 15년 넘게 살기도 해요. 입양은 그 긴 시간을 함께하겠다는 약속이에요.','고양이도 동물등록을 할 수 있어요. 잃어버렸을 때 집을 찾는 데 도움이 돼요.','중성화 수술은 돌봐 줄 사람 없는 아기 고양이가 늘어나는 것을 막아 줘요.','길에서 아기 고양이를 보면 바로 데려오지 말고, 엄마 고양이가 오는지 멀리서 지켜봐요.','"사지 말고 입양하세요" — 보호소에는 가족을 기다리는 동물이 많아요.','입양한 뒤에도 매일 조금씩 놀아 주면 고양이가 더 행복해져요.'];
const SH_PLEDGE=['매일 밥과 물을 챙겨 줄게요','아프면 병원에 데려갈게요','이사 가도 끝까지 함께할게요','매일 놀아 주고 이야기해 줄게요','화가 나도 때리거나 버리지 않을게요'];
let SH_ADOPT=false;
function shS(){const R=rmS();R.shelter=R.shelter||{cur:null,adopted:{}};R.shelter.adopted=R.shelter.adopted||{};return R.shelter}
function shBase(i){return SH_CATS.find(c=>c.i===i)}
function shBreed(i){const b=shBase(i);if(!b)return undefined;const A=(S.room&&S.room.shelter&&S.room.shelter.adopted||{})[i];return A&&A.n?Object.assign({},b,{n:A.n}):b}
function shIds(){const H=shS();const o=Object.keys(H.adopted).map(Number);if(H.cur&&!o.includes(H.cur.i))o.push(H.cur.i);return o}
function shDaysN(c){return Object.keys(c.days||{}).length}
function shTrust(c){return Math.min(100,shDaysN(c)*16+(c.hearts||0)*2)}
function shReady(c){return shDaysN(c)>=SH_DAYS&&shTrust(c)>=100}
function shLastStudy(){let t=today();for(let k=0;k<30;k++){const d=S.days&&S.days[dayStr(t-k)];if(d&&d.probs>0)return k}return 99}
// 고양이별 마음 단계: 0 숨기, 1 멀리서, 2 보통
function shStage(i){const H=shS();if(H.cur&&H.cur.i===i){const t=shTrust(H.cur);return t<30?0:t<60?1:2}if(H.adopted[i])return shLastStudy()>=3?1:2;return 2}
function shStageTxt(t){return t<30?'아직 무서워서 가구 뒤에 숨어 있어요':t<60?'멀리서 집사를 지켜보고 있어요':t<100?'조금씩 다가와요. 쓰다듬어도 괜찮대요':'마음을 활짝 열었어요! 이제 가족이 될 수 있어요'}
// 미니룸에서 낯선 고양이 움직임: true를 돌려주면 평소 돌아다니기를 하지 않아요
function shCtl(el){const i=+el.dataset.rmc;if(i<150)return false;const st=shStage(i);if(st>=2)return false;
  const sc=document.getElementById('rmscene');if(!sc)return true;const R=rmS();
  if(st===0){const it=R.items.find(x=>{const I=RM_ITEMS[x.k];return I&&I.p!=='wall'&&['sofa','box','plant','shelf','tower','bed','desk','basket','washer','bathtub','lamp'].includes(x.k)});
    if(it){const I=RM_ITEMS[it.k];const ar=sc.clientWidth/sc.clientHeight||4/3;el.style.left=(it.x+I.w*.25)+'%';el.style.top=(it.y-I.w*ar*.12)+'%';el.style.zIndex=Math.round(it.y)-1}
    else{el.style.left='4%';el.style.top='99%';el.style.zIndex=2}
    rmSetPose(el,'sit');el.classList.add('shshy');return true}
  if(!el._shc||Math.random()<.15){const L=Math.random()<.5;el._shc=1;el.classList.toggle('rmflip',!L);el.style.left=(L?5+Math.random()*5:88+Math.random()*6)+'%';el.style.top=(66+Math.random()*5)+'%';el.style.zIndex=67;rmSetPose(el,Math.random()<.5?'sit':'lie')}
  el.classList.add('shshy');return true}
function shPlaceAll(){document.querySelectorAll('#rmscene .rmc').forEach(el=>{if(+el.dataset.rmc>=150){el.style.transition='none';shCtl(el);setTimeout(()=>el.style.transition='',60)}})}
// 공부하면 돌봄: 그날 공부한 날 +1, 맞힌 문제 💗1, 고친 문제 💗2
function shCare(good,fixOk,mode){const H=shS();const c=H.cur;if(!c||!good)return;const ds=dayStr(today());c.days=c.days||{};const nd=!c.days[ds];c.days[ds]=1;
  const h=mode==='fix'?fixOk*2:good;c.hearts=(c.hearts||0)+h;save();const b=shBreed(c.i);
  setTimeout(()=>toast(`💗 ${rmJ(b.n,'이','가')} 마음 +${h}${nd?` · 돌봄 ${shDaysN(c)}일째`:''}${shReady(c)?' · 이제 입양할 수 있어요!':''}`),900)}
function shFace(b,w){return `<svg viewBox="0 -2 40 36" width="${w}" height="${Math.round(w*.9)}">${bFace(b)}</svg>`}
function shTabHTML(){const H=shS();const R=rmS();const c=H.cur;const cb=c&&shBreed(c.i);
  if(SH_ADOPT&&c&&shReady(c))return `<div class="shcard sharp"><div class="shhead">${shFace(cb,70)}<div><b>${esc(cb.n)} 입양 서약서</b><small>${esc(R.name||'나')} 집사가 약속해요</small></div></div>
    <div class="shpl">${SH_PLEDGE.map((t,n)=>`<label><input type="checkbox" data-shpl="${n}"> <span>${t}</span></label>`).join('')}</div>
    <div class="camrow"><b>이름</b><input class="ptnick" data-shname maxlength="8" value="${esc(cb.n)}" placeholder="새 이름 (그대로 둬도 돼요)"></div>
    <div class="cambtns"><button class="cambig" data-shdo>🏡 약속하고 가족이 되기</button><button class="cambtn" data-shback>조금 더 생각할래요</button></div></div>`;
  let cur='';
  if(c){const t=shTrust(c),n=shDaysN(c);cur=`<div class="shcard"><div class="shhead">${shFace(cb,70)}<div><b>임시보호 중 · ${esc(cb.n)}</b><small>${esc(cb.t)}</small></div></div>
    <div class="shbar"><i style="width:${t}%"></i><span>마음 ${t}%</span></div>
    <div class="shdays">${Array.from({length:SH_DAYS},(_,k)=>`<i class="${k<n?'on':''}">${k<n?'🐾':k+1}</i>`).join('')}<span>돌봄 ${Math.min(n,SH_DAYS)}/${SH_DAYS}일 · 💗 ${c.hearts||0}</span></div>
    <p class="shstage">${shStageTxt(t)}</p>
    <p class="shtip">💡 ${SH_TIPS[Math.min(n,SH_TIPS.length-1)]}</p>
    <p class="rmhint">공부한 날마다 돌봄 1일, 맞힌 문제마다 💗1, 틀린 문제를 고치면 💗2를 받아요. ${SH_DAYS}일 동안 돌보고 마음이 100%가 되면 입양할 수 있어요.</p>
    ${shReady(c)?'<button class="cambig" data-shadopt>🏡 입양하기</button>':''}<button class="cambtn" data-rmtab="room" style="margin-top:8px">🏠 미니룸에서 보기</button></div>`}
  const list=SH_CATS.map(b0=>{const A=H.adopted[b0.i];const b=shBreed(b0.i);const now=c&&c.i===b0.i;
    return `<div class="shit ${A?'done':''} ${now?'now':''}">${shFace(b,54)}<b>${esc(b.n)}</b><small>${A?`🏡 ${esc(R.name||'나')}네 가족 · ${A.d}`:esc(b0.t)}</small>${A?'':now?'<em>임시보호 중</em>':c?'<em class="off">다음 차례</em>':`<button class="rmbtn" data-shfoster="${b0.i}">임시보호 하기</button>`}</div>`}).join('');
  const nA=Object.keys(H.adopted).length;
  return `${cur}<h3 class="shh">🐾 보호소의 고양이들 <small>${nA===SH_CATS.length?'모두 가족을 찾았어요! 고마워요 💗':'한 번에 한 마리씩 임시보호할 수 있어요'}</small></h3><div class="shlist">${list}</div>
   <p class="rmhint" style="margin-top:10px">보호소 고양이는 별(⭐)로 살 수 없어요. 매일 공부하며 돌봐야 마음을 열어요.</p>`}
document.addEventListener('click',e=>{const t=e.target.closest('[data-shfoster],[data-shadopt],[data-shdo],[data-shback]');if(!t)return;e.preventDefault();e.stopPropagation();const H=shS();
  if(t.dataset.shfoster){if(H.cur)return;const i=+t.dataset.shfoster;H.cur={i,start:today(),days:{},hearts:0};save();const b=shBreed(i);
    ask(shFace(b,90),`${esc(b.n)}의 임시보호를 시작해요`,`${esc(b.t)}<br><br>처음에는 무서워서 숨어 있을 거예요. ${SH_DAYS}일 동안 매일 공부하면 조금씩 마음을 열어요.`,[{t:'🏠 미니룸에 데려가기',cls:'go',fn:()=>{RM_TAB='room';rmRender()}}],'닫기');rmRender();return}
  if(t.dataset.shadopt!=null){SH_ADOPT=true;return rmRender()}
  if(t.dataset.shback!=null){SH_ADOPT=false;return rmRender()}
  if(t.dataset.shdo!=null){const cbx=[...document.querySelectorAll('[data-shpl]')];if(cbx.some(x=>!x.checked)){toast('약속을 모두 읽고 체크해 주세요');return}
    const c=H.cur;if(!c||!shReady(c))return;const nm=((document.querySelector('[data-shname]')||{}).value||'').replace(/[<>&"'`]/g,'').trim().slice(0,8)||shBase(c.i).n;
    H.adopted[c.i]={n:nm,d:new Date().toLocaleDateString('ko-KR'),pl:SH_PLEDGE.length};H.cur=null;SH_ADOPT=false;save();
    ask(shFace(shBreed(c.i),96),`${esc(nm)}, 우리 가족이 됐어요! 🏡`,'이제 미니홈피의 식구예요. 며칠 공부를 쉬면 조금 서먹해지지만, 다시 공부하면 금방 다가와요.',[{t:'🏠 미니룸에서 보기',cls:'go',fn:()=>{RM_TAB='room';rmRender()}}],'닫기');rmRender();return}},true);
window.addEventListener('click',e=>{const el=e.target.closest('#rmscene .rmc.shshy');if(!el||RM_SEEK||RM_EDIT)return;const st=shStage(+el.dataset.rmc);if(st>=2)return;e.preventDefault();e.stopImmediatePropagation();
  const b=BRX[+el.dataset.rmc];const H=shS();const adopted=!!H.adopted[+el.dataset.rmc];
  const h=document.createElement('i');h.className='jsbub shbub';h.textContent=adopted?'요즘 조금 서먹해… 같이 공부하자':st===0?'…(무서워서 숨었어요)':'…(멀리서 지켜봐요)';el.appendChild(h);setTimeout(()=>h.remove(),2200);
  toast(adopted?`${rmJ(b.n,'이','가')} 조금 서먹해해요. 오늘 공부하면 다시 다가와요`:`${rmJ(b.n,'은','는')} 아직 낯설어해요. 공부하면 마음이 열려요`)},true);
