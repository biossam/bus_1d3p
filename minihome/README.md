# 미니홈피 모듈 (일일삼제에서 쓰는 원본)

학습 앱에 붙이는 반려동물 미니홈피 보상 모듈입니다. 실제로 돌아가는 모습은 `../app.html`(일일삼제)에서 볼 수 있어요.

## 파일
| 파일 | 하는 일 |
|---|---|
| room.js / room.css | 미니홈피 틀, 방 여러 개, 상점(가구·벽지·바닥·간식·놀잇감), 포즈, 가구 위 자리, 혼자 숨바꼭질, 식구 고르기, 셀카 |
| jibsa.js / jibsa.css | 집사(학생) 캐릭터 꾸미기와 미니룸·셀카·친구랑 놀기 등장 |
| party.js / party.css | 친구랑 놀기(QR 초대, 실시간, 다 같이 숨바꼭질) 화면 |
| ../party/server.js | 친구랑 놀기 서버(Node, 외부 패키지 0개, SSE, 메모리만 사용) — Render 무료 플랜(`../render.yaml`) |
| room_patch.py | 앱 index.html에 위 파일을 끼워 넣는 패치(렌더 분기, 상단 메뉴, 보상 연결, 도감 버튼, 홈 카드) |

붙이는 순서: room.css+party.css+jibsa.css 를 `</style>` 앞에, room.js+jibsa.js+party.js 를 마지막 `</script>` 앞에.

## 앱이 갖고 있어야 하는 것 (모듈이 부르는 이름)
- 상태: `S`(전체 상태, localStorage 저장), `save()`, `S.dex`(얻은 동물 번호 → 날짜), `today()`(날짜 번호)
- 화면: `VIEW`, `render()`, `go(view)`, `toast(msg)`, `ask(icon,title,body,buttons,cancel)`, `closeModal()`, `esc(s)`
- 동물: `BREEDS[i]` = `{n:이름, t:설명, b:몸 색, …}`, `bFace(b, closed)` → 얼굴 SVG(viewBox 0 -2 40 36), 선택 `catImg(b)`, `catCredit(b)`, `catBig(b)`
- 보상 연결: 세트 완료 시 `rmEarn(1)`, 오늘의 15분 `rmEarn(2)`, 7일 연속 `rmEarn(5)`

## 강아지 등 다른 동물로 바꿀 때
`BREEDS`와 `bFace`만 바꾸면 방·상점·셀카·친구랑 놀기가 그대로 돌아갑니다. 몸 모양은 `rmCat`(앉기)과 `rmPose`(sleep·lie·stretch·wave)에 있으니 귀·꼬리 모양만 고치면 돼요. 화면 문구의 "고양이"는 `rmJ()` 조사 함수와 함께 바꿉니다.
