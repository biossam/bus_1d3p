import sys,re
D='/tmp/claude-0/-home-claude/34ef412f-df2a-563c-9d41-d9ff4ccc7768/scratchpad/'
f=sys.argv[1];s=open(f).read()
if 'ROOM_PATCH' in s: print('already');sys.exit()
def R(a,b):
    global s
    assert s.count(a)==1,a[:70]; s=s.replace(a,b)
R("  else if(VIEW==='settings')m.innerHTML=settingsHTML();","  else if(VIEW==='settings')m.innerHTML=settingsHTML();\n  else if(VIEW==='room')m.innerHTML=roomHTML();")
R("if(VIEW!=='run')m.insertAdjacentHTML('afterbegin',topbarHTML()+'<nav class=\"topnav\" aria-label=\"메뉴\">'+navHTML()+'</nav>')",
  "if(VIEW!=='run')m.insertAdjacentHTML('afterbegin',topbarHTML()+'<nav class=\"topnav\" aria-label=\"메뉴\">'+navHTML()+'</nav>');if(VIEW==='room'&&typeof rmWander==='function'){rmWander();rmDragInit()}")
R("function setDone(n=1){catSync();","function setDone(n=1){catSync();try{rmEarn(n)}catch(e){}")
R("const br=left[Math.floor(Math.random()*left.length)];S.dex[br.i]=today();save();","const br=left[Math.floor(Math.random()*left.length)];S.dex[br.i]=today();try{rmEarn(5)}catch(e){}save();")
R("7일 연속 공부하면 한 마리를 선물로 받아요! 하루 쉴 때마다 도감의 고양이 중 한 마리가 집을 나가요.',[],'닫기',dexHTML())",
  "7일 연속 공부하면 한 마리를 선물로 받아요! 하루 쉴 때마다 도감의 고양이 중 한 마리가 집을 나가요.',[{t:'🏠 미니홈피에서 고양이들 보기',cls:'go',fn:()=>{RM_TAB='room';RM_EDIT=false;go('room')}}],'닫기',dexHTML())")
# home card after hero section
i=s.index('function homeHTML'); j=s.index('</section>',i)+len('</section>')
s=s[:j]+"\n  ${(()=>{const R=rmS();const n=rmLive().length;return `<button class=\"mhcard\" data-act=\"room\"><span class=\"mhci\">🏠</span><span><b>${esc(R.name||'나')}의 미니홈피</b><small>고양이 ${n}마리가 살고 있어요 · ⭐ ${R.coins||0}</small></span><span class=\"mhgo\">›</span></button>`})()}"+s[j:]
css=open(D+'site/room.css').read()+open(D+'site/party.css').read()+open(D+'site/jibsa.css').read()+open(D+'site/shelter.css').read()
s=s.replace('</style>',css+'</style>',1)
js=open(D+'site/room.js').read()+open(D+'site/shelter.js').read()+open(D+'site/jibsa.js').read()+open(D+'site/qr.js').read()+open(D+'site/party.js').read()
js=js.replace('BREEDS[','BRX[')
i=s.rindex('</script>');s=s[:i]+js+s[i:]
_a="const isB=c=>typeof c==='object';"
assert s.count(_a)==1,'isB'
s=s.replace(_a,_a+"\nconst BRX=new Proxy(BREEDS,{get(t,k){if(typeof k==='string'&&/^\\d+$/.test(k)&&+k>=150)return shBreed(+k);return Reflect.get(t,k)}});",1)
open(f,'w').write(s);print('room ok')
