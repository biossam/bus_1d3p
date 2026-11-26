# yang2수학의 보상·채점 규칙(별 하루 30개, 연속 정답, 틀린 문제 고치기, 스스로 채점 증거)을 일일삼제에 옮겨요
import re,sys
D='/tmp/claude-0/-home-claude/34ef412f-df2a-563c-9d41-d9ff4ccc7768/scratchpad/'
F=sys.argv[1];s=open(F).read()
miss=[]
def apply(diff):
    global s
    hunks=re.split(r'\n@@ [^\n]*@@[^\n]*\n',diff)[1:]
    for h in hunks:
        L=h.split('\n');prev=None;i=0
        while i<len(L):
            l=L[i]
            if l.startswith('-'):
                o=[l[1:]];j=i+1
                while j<len(L) and L[j].startswith('-'):o.append(L[j][1:]);j+=1
                news=[]
                while j<len(L) and L[j].startswith('+'):news.append(L[j][1:]);j+=1
                ok=True
                for k,ol in enumerate(o):
                    if s.count(ol)!=1:ok=False;break
                if ok:
                    s=s.replace(o[0],'\n'.join(news) if news else '',1)
                    for ol in o[1:]:s=s.replace(ol+'\n','',1) if (ol+'\n') in s else s.replace(ol,'',1)
                    prev=news[-1] if news else prev
                else:miss.append(('-','\n'.join(o)[:200]))
                i=j;continue
            if l.startswith('+'):
                news=[];j=i
                while j<len(L) and L[j].startswith('+'):news.append(L[j][1:]);j+=1
                if prev is not None and s.count(prev)==1:s=s.replace(prev,prev+'\n'+'\n'.join(news),1)
                else:miss.append(('+',(prev or '')[:120]))
                prev=news[-1];i=j;continue
            if l.startswith(' '):prev=l[1:]
            i+=1
for c in ['080d3c3','141ab87','aa3bc3e','7290687','673ccf8']:
    apply(open(D+'site/y2/'+c+'.core.diff').read())
for a,b in [("  return `<p class=\"step\">새 개념 <span class=\"tag s\">NEW</span></p><h2 class=\"h2\">${esc(c.t)}</h2>","  return `<p class=\"step\">${st.fix?'개념 다시 보기':'새 개념 <span class=\"tag s\">NEW</span>'}</p><h2 class=\"h2\">${esc(c.t)}</h2>"),
  ("<h2 class=\"h2 center\">${RUN.mode==='session'?'오늘의 15분 끝!':'완료!'}</h2>","<h2 class=\"h2 center\">${RUN.mode==='session'?'오늘의 15분 끝!':RUN.mode==='fix'?'다시 도전 끝!':'완료!'}</h2>"),
  ("<small>고양이 ${n}마리가 살고 있어요 · ⭐ ${R.coins||0}</small>","<small>고양이 ${n}마리가 살고 있어요 · ⭐ ${R.coins||0} (오늘 ${starToday().n}/${STAR_DAY})</small>")]:
    if s.count(a)==1:s=s.replace(a,b)
    else:miss.append(('fix',a[:80]))
for a,b in [("<p>🐾 친구 ${w.an}마리가 홈 화면 어딘가에 숨었어요!</p>","<p>🐱 고양이 ${w.an}마리가 홈 화면 어딘가에 숨었어요!</p>"),("이번에는 친구가 숨지 않았어요. <b>틀린 문제를 고치면</b> 친구가 나타나요!","이번에는 고양이가 숨지 않았어요. <b>틀린 문제를 고치면</b> 고양이가 나타나요!"),("절반 이상 맞히면 친구가 숨어요","절반 이상 맞히면 고양이가 숨어요")]:
    if s.count(a)==1:s=s.replace(a,b)
    else:miss.append(('cat',a[:60]))
a='RUN.reward={stars,bonus,an,good,n:na,self,fast,pend,wrong,capped:fixOk>bonus};'
if s.count(a)==1:s=s.replace(a,a+'try{shCare(good,fixOk,RUN.mode)}catch(e){}')
else:miss.append(('sh',a))
a="const fast=p.t!=='self'&&Date.now()-((st.shown&&st.shown[st.j])||0)<3000;"
if s.count(a)==1:s=s.replace(a,"const fast=false;")
else:miss.append(('nofast',a))
miss=[m for m in miss if not (m[0]=='-' and ('새 개념 <span' in m[1] or 'class="done"' in m[1] or 'mhcard' in m[1]))]
css=''.join(open(D+'site/y2/'+c+'.css').read() for c in ['080d3c3','141ab87','7290687'])
i=s.rindex('</style>');s=s[:i]+css+s[i:]
if 'const STAR_DAY=' not in s:
    i=s.index('function setDone(');s=s[:i]+'const STAR_DAY=30;\n'+s[i:]
open(F,'w').write(s)
for m in miss:print('MISS',m)
print('y2reward ok' if not miss else 'y2reward with misses')
