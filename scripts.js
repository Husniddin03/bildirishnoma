let qsnLines = [];
let ansLines = [];
const seenQuestions = new Set();  // Track already notified questions
let dataLoaded = false;           // Track if files loaded

// Normalize function: lowercase, remove punctuation, collapse spaces, remove repeated letters
function normalize(text) {
  return text.toLowerCase()
      .replace(/[^\w\s]/g, '')    // remove punctuation
      .replace(/\s+/g, ' ')       // collapse multiple spaces
      .replace(/(\w)\1+/g, '$1')  // reduce repeated letters
      .trim();
}

// Process the hardcoded question-answer data
function parseMatn() {
  const inputText = `Shovqinlar qayerlarda ko’p uchraydi?
====
Shaharlarda.

++++
Texnika xavfsizligi nima?
====
Ishchilarning xavfli ishlab chiqarish omillari ta‘siridan asrab qolishga qaratilgan chora tadbirlardir.

++++
Mehnat qonunchiligi asoslari nimani boshqaradi?
====
Huquqiy me‘yorlar majmuasi bo’lib, ishchi va xizmatchilarning mehnat munosabatlarini boshqaradi.

++++
O’zbekiston Respublikasi energetika va elektrlashtirish Davlat aktsionerlik jamiyatining vazifasi nimalardan iborat?
====
Bu tashkilot korxonalardagi energiya tizimlarining texnik ekspluatatsiyasini va xavfsizlik qoidalariga rioya qilishni nazorat qiladilar.

++++
Barcha korxona, tashkilotlarda mehnat muxofazasi qonunlari bajarilishining oliy nazorati qaysi vazirlikka yoki tashkilotga yuklatilgan?
====
O’zbekiston Respublikasi Mehnat va aholini ijtimoiy muhofaza qilish vazirligiga.

++++
Shovqin nima va shovqin kuchi nima bilan o’lchanadi?
====
Bu tovushdir va ditsebil bilan.

++++
Bir pog’onali nazorat qanday amalga oshiriladi?
====
Har kuni usta jamoatchi nozir bilan tsexdagi ish joylarini aylanib chiqishadi, kamchiliklarni tuzatishadi.

++++
Changning zararli ta‘siri qanaqa kasb kasalliklariga olib kelishi mumkin?
====
Pnevmakonioz (o’pka) va konyuktivit (ko’z) kasalligiga.

++++
Elektr tokini inson organizmiga ta‘siri necha gruppaga bo’linadi va qanday ta‘sir qiladi?
====
3 gruppaga, biologik, elektrolitik, termik

++++
Ishlab chiqarishdagi zararli omil nima?
====
Ishchilarga ish vaqtida ta‘sir etib, kasallanishga yoki ish qobiliyatini pasayishiga olib keladigan omil.

++++
Shikastlanishga berilgan tug’ri ta‘rifni aniqlang.
====
Ishlab chiqarishdagi zararli yoki xavfli omil natijasida inson a‘zolari yoki teri qoplami fiziologik bir butunligining buzilishi.

++++
Har bir binoda evakuatsiya (havfsiz joyga ko’chirish) eshigi va yo’llari kamida nechta bo’lishi kerak?
====
2 ta.

++++
Shaxsiy himoyalanish vositalariga nimalar kiradi?
====
Ish kiyimi, poyafzal, gazniqob, shlem, qo’lqop, ko’zoynak va boshqalar.

++++
Kasb kasalligi qanday kasallik?
====
Kishi organizmiga ish sharoitlarining zararli tasiri natijasida kelib chiqqan kasallik.

++++
Jaroxatlarni nechta turi bo’ladi?
====
2 tur 1.ishlab chiqarish jaroxatlari. 2.maishiy jaroxatlar.

++++
18 yoshga to’lmagan xodimlarga kamida necha kalendar kundan iborat yillik ta‘til beriladi?
====
30 kalendar kun

++++
Mexnat muxofazasi muxandisi zimmasiga qo’yidagilardan qaysi vazifalar kiradi?
====
Yo’riqnomalar tayyorlash, ishchilar ishini nazorat qilish, boshlang’ich yo’l yo’riqlar berish, buyruq farmoyishlar loyixalarini tayyorlash.

++++
Ish joylaridagi mikroiqlim omillarini qaysilar tashkil etadi?
====
4 xil. 1. harorat. 2.nisbiy namlik. 3.atmosfera bosimi. 4.hvoning tezligi.

++++
O’n sakkiz yoshga to’lmagan shaxslarni ishga qabul qilish mexnat kodeksining nechanchi moddasida ko’rsatilgan talabga rioya etilgan holda bajariladi?
====
239 modda

++++
Mexnat muxofazasi bu – . . .
====
Ish jarayonida insonning mexnat kobiliyatini va xavfsizligini ta‘minlashga yo’naltirilgan qonunlar majmuasi,tashkiliy,texnik,gigienik va profilaktika tadbirlari hamda vositalaridir.

++++
O’zbekiston Respublikasi Mehnat kodeksining vazifasi nimadan iborat?
====
Ishchi va xodimlarni mexnatga doir huquqlarini va mehnatga doir munosabatlarni himoya qilishni tartibga soladi.

++++
Ish joyida o’tkaziladigan yo’riqnomadan maqsad nima?
====
Xar bir ishchini tugri va xavfsiz ish usullariga urgatish.

++++
Mexnat kodeksi nechanchi yil qabul qilingan va nechta moddadan iborat?
====
1995 yil 21 dekabr, №161-1, 294 moddadan

++++
Ishlab chiqarishdagi baxtsiz hodisa nima?
====
Ish vaqtida yuz beradigan favqulotda xodisa.

++++
Filtrlarning ishga yaroqsiz bo’lib qolganligining belgisi nimadan iborat?
====
Nafas olishning qiyinlashishi.

++++
«Mexnatni muhofaza qilish» to’grisidagi qonun qachon qabul qilingan va nechta moddadan iborat?
====
1993yil 6 may, 29 moddadan

++++
Klinik o’lim necha minut davom etadi?
====
4-6 minut.

++++
Tok urishi necha darajaga bo’lib o’rganiladi?
====
4 darajaga bo’lib o’rganiladi.

++++
Mexnat muxofazasining vazifasi nimadan iborat?
====
Zararli va xavfli ishlab chiqarish omillarining ishlovchilarga tasirini eng kam darajaga keltirishga imkon beradigan chora tadbirlarni ko’rishdan iborat.

++++
Ishlab chiqarish sanitariyasi bu -
====
Ishlab chiqarishdagi zararli omillar ta‘sirini oldini oladigan chora tadbirlar va texnika vositalari majmuasi

++++
Zararli omillarga nimalar kiradi?
====
Neft mahsulotlari, mineral ug’itlar, chang, shovqin, titrash, iqlim sharoiti va boshqalar.

++++
Tsex havosining harorati yuqori bo’lganda qon tomirlar kengayib teriga qon meyordan ko’p kela boshlaydi va atrof muhitga issiqlik uzatish birmuncha ko’payadi kishi terlaydi, buning natijasida organizm uchun zarur bo’lgan tuzlar ham ter bilan chiqib ketadi. Shuning uchun issiq tsexlarda …………... ?
====
Sal shurlangan gaz suvlar beriladi.

++++
Qaysi qatordagi o’t o’chirgichlar karbonat kislotali o’t o’chirgichlar sirasiga kiradi?
====
UO’O’-2; UO’O’-2A; UO’O’-5; UO’O’-8; UO’O’-2MM.

++++
Fukarolarga haftasiga necha soatdan ishlashlariga ruxsat etiladi?
====
41 soatdan.

++++
Yongin xavfsizligi bu -
====
Korxonada yong’in paydo bo’lishini oldini olish, insonning moddiy boyliklarini muxofaza qilish.

++++
Shaxsiy himoyalanish vositalari nimaga xizmat qiladi?
====
Bir xodimni muxofaza qilishga xizmat qiladi.

++++
O’zbekiston Respublikasi Konstitutsiyasining qaysi bob va moddalarida mehnatni muxofaza qilish masalalari bayon etilgan.
====
IX va X boblarining bir qancha moddalarida

++++
Chang zarrachalarining o’lchamlariga binoan, barcha sanoat turlarining changlari nechta va qanday tasnif guruxlariga bo’linadi?
====
5ta I.-juda yirik chang;II.-yirik chang;III.-urta yiriklikdagi chang;IV.-mayda chang;V-juda mayda chang.

++++
Insonlarni oftob urganda qanday chora – tadbirlar qo’llash kerak?
====
Suv, muzdek ichimliklar ichirish, boshiga sovuq suvda namlangan doka qo’yish kerak.

++++
Elektr toki ta‘sirida kuyish necha xil va qanaqa bo’ladi?
====
3 xil 1.engil kuyish.2.urtacha og’irlikdagi kuyish.3.og’ir kuyish.

++++
KHKO’O’ –10 o’t o’chirgichlarida elektr uskunalaridan chiqqan alangani o’chirish mumkinmi?
====
mumkin emas

++++
Changlar qanaqa changlardan kelib chiqqan?
====
organik, meneral, aralashma changlardan.

++++
Elektr xavfsizligi qanday tizim?
====
Kishilarni elektr toki, elektr yoyi, elektromagnit maydonining xavfli xamda zararli ta‘siridan muxofaza qilishni ta‘minlaydigan tashkiliy va texnik chora tadbirlar tizimi.

++++
Ishlab chiqarish jaroxatlari necha turli bo’ladi?
====
5 turli.1.mexanik.2.kimyoviy.3.issiqlik.4.elektrik.5.aralash jaroxatlar.

++++
Kasbiy kasallik qanday sharoitlarda hosil bo’ladi?
====
Ishlovchi uchun ish sharoitlarining zararli ta‘siri natijasida hosil bo’ladi.

++++
Jarohat bu-
====
Tana a‘zolarini va to’qimalarni kutilmagan holatda tashqi ta‘sir ostida shikastlanishidir.

++++
Davriy yo’riqnoma kim bilan yoki necha kishi bilan o’tkazilishi mumkin?
====
Yakka tartibda va gurux bilan.

++++
Mehnat muhofazasi talablari va qoidalarining buzilishlarini bartaraf etish haqida bo’linmalar, xizmatlar rahbarlariga ko’rsatmalar berish, xavf paydo bo’lganda ishni tuxtatish, talabga javob bermaydigan uskuna, jixozlar, moslamalarni foydalanishdan chiqarish. Ishlab chiqarish bo’limining raxbari bilan birgalikda xavfsizlik talablari va qoidalarini buzganlarni vaqtincha ishdan chetlatish kabi xuquqlar kimga berilgan?
====
Mehnat muxofazasi muxandisiga.

++++
O’zbekiston Respublikasi Mehnat kodeksining qaysi moddasida 18 yoshga to’lmagan shaxslarni og’ir, zararli, xavfli mexnat sharoitlarida ishlatish mumkin emasligi haqida bayon etilgan?
====
241 modda

++++
Jarohatlarni tadqiq qilish turlari necha xil va qanaqa?
====
4 xil 1.statistik turi.2.monografik turi.3.topografik turi. 4.iqtisodiy turi.

++++
Xodimlarni xavfsiz ish usullariga o’qitish va ularni tashkil qilish bo’yicha umumiy raxbarlik va javobgarlik kimlarga yuklanadi?
====
Korxona raxbarlariga va boshqaruv tashkilotlariga

++++
Ishlovchilar uchun zararli ish sharoitining ta‘siri natijasida............... hosil bo’ladi.
====
Kasbiy kasalliklar

++++
Badanning ayrim joylarining kuyishi, qon tomirlari, asab va boshqa tuqimalarining qizishiga ............................... deyiladi.
====
Issiqlik ta‘siri

++++
Filtrlovchi resperatorlar vazifasiga ko’ra necha xilga bo’linadi?
====
3xilga. 1.changlardan ximoyalovchi. 2.gazlardan ximoyalovchi. 3.universal.

++++
Kirish yo’riqnomasi gurux bilan o’tkazilganda eshituvchilar soni nechta kishidan oshmasligi kerak?
====
10 kishidan

++++
Qonning va boshqa organik suyuqliklarning qurishiga hamda ularning fizik-ximik tarkibining buzilishiga ....................... deyiladi.
====
Elektrolitik ta‘sir

++++
Respiratorlarning vazifasi nimadan iborat?
====
Nafas olish mumkin bo’lgan xavoni zararli aralashmalardan tozalaydi.

++++
Kirish yuriqnomasini kim o’tkazadi?
====
Bosh muxandis

++++
18 yoshga to’lmagan o’smirlarni ish vaqtidan tashqari va dam olish kunlari ishlarga jalb qilish mumkin emas. Bu qaysi modda?
====
245 modda.

++++
Organizmning tirik to’qimalarining yallig’lanishi va asabiylashishiga ...................... deyiladi.
====
Biologik ta‘sir

++++
O’zbekiston Respublikasi Mehnat kodeksiga nechanchi yildan boshlab amal qilina boshlandi.
====
1996 yil 1 aprel.

++++
Elektr toki shikastlanishi turlari yozilgan to’g’ri qatorni toping?
====
1.Elektr tokidan kuyish. 2. Elektr izlari. 3. Terining metallanishi. 4. Mexanik shikastlanishlar.

++++
Organizm orqali elektr o’tganida tirik to’qimalarning asabiylashishi natijasida mushaklarning ixtiyorsiz ravishda tortishib qolishiga …....................... deyiladi.
====
Elektr toki urishi

++++
Mashina va dastgoxlarda himoyalovchi yerga ulashdan maqsad nima?
====
Ishchi bexosdan tegib ketganda qobiqqa o’tgan tok urishidan saqlanishdir.

++++
Xodimga xayfsan berish, ishdan chetlashtirish, o’rtacha oylik ish haqining 20% idan ortiq bo’lmagan miqdorda jarima solish va mexnat shartnomasini bekor qilish bu...........
====
Ma‘muriy javobgarlik

++++
SHaxsiy ximoya vositalari vazifalariga ko’ra necha turga bo’linadi?
====
11 ta

++++
«Mehnatni muhofaza qilish to’g’risidagi» qonunni buzgan shaxslarni nazorat tashkilotlari tomonidan belgilangan miqdorda jarima to’lashga yoki keltirilgan moddiy zararni qoplashga majbur qilish bu...........
====
Moddiy javobgarlik.

++++
Elektr o’tkazmaydigan buyumlar nimadan tayyorlanadi?(masalan: qo’lqop, kalish)
====
elektr o’tkazmaydigan maxsus rezinalardan

++++
O’t o’chirish vositalari asosan necha guruhga bo’linadi?
====
3guruxga.1.yonishni tugatish usuli buyicha. 2.elektr toki o’tkazuvchanligi buyicha. 3.zaxarliligi bo’yicha.

++++
Ishlab chiqarish xonalari va yordamchi xonalarda xarorat necha oS atrofida saqlanishi kerak?
====
18-22 oS

++++
«Mexnatni muxofaza qilish to’g’risidagi» qonunni buzish baxtsizlik yoki o’limga sabab bo’lsa,aybdor shaxslarn belgilangan tartibda ........... javobgarlikka tortiladi
====
Jinoiy javobgarlik.

++++
Atom yadrolarining ion nurlanishlari chiqarishi natijasida boshqa bir atom yadrolarini hosil qilish bu ........... dir
====
Radioaktivlik

++++
Xavfsiz joylarga kuchirish (evakuatsiya) yullarining eni, eshiklarining eni va bo’yi necha metr bo’lishi kerak?
====
Yo’lni eni 1,4 metr, eshik eni 0,8-2,4 metrgacha, bo’yi 2 metrdan kam bo’lmasligi

++++
Nafas olishdagi havo orqali ta‘sir qiluvchi xavfli va zararli ishlab chiqarish omillaridan kishi nafas olish a‘zolarini himoya qiluvchi moslamalar necha xil va qanaqa bo’ladi?
====
4 xil 1 gazniqoblar. 2 resperatorlar.3.xavo shlemlari.4.xavo niqoblari.

++++
O’zbekiston Respublikasi Sog’liqni saqlash vazirligining sanitariya – epidemiologiya nazoratining vazifasi nimadan iborat ?
====
Havo, suv va tuproqni ifloslanishdan ogohlantirish tashkilot yoki binoning sanitariya xolatlariga javob berish yoki javob bermasligini tekshiradi.

++++
Yong’indan muxofaza qilish bosh boshqarmasining vazifasi nimadan iborat ?
====
Yong’inga qarshi tadbirlarni, o’t o’chirish vositalarining holatini va yong’in haqida xabar berish vositalarining ishini nazorat qiladi.

++++
Mehnat muxofazasi qoida va me‘yorlarining buzilishi uchun qanaqa javobgarlik turlari bor ?
====
1. Moddiy javobgarlik. 2. Ma‘muriy javobgarlik. 3. Jinoiy javobgarlik.

++++
Yo’riqnomalar necha xil bo’ladi ?
====
2 xil: 1. Kirish yo’riqnomasi. 2. Ish joyida o’tkaziladigan yo’riqnomasi.

++++
Ish joyida o’tkaziladigan yo’riqnoma necha xil bo’ladi ?
====
3 xil: 1. Dastlabki yo’riqnoma. 2. Davriy yo’riqnoma. 3. Navbatdan tashqari yo’riqnoma.

++++
Mexnat gigienasi deb nimaga aytiladi ?
====
Ish jarayonlarining va atrof muxitning inson organizmiga ta‘sirini o’rganadigan fanga aytiladi.

++++
Yonish bo’lishi uchun asosan qanaqa omillar bo’lishi kerak ?
====
Yonuvchi modda, yondiruvchi muhit, yondirish jarayoni.

++++
Yonuvchi modda bilan havodagi kislorodning o’zaro ta‘siri natijasida juda tez kechuvchi va ko’p miqdorda issiqlik ajralib chiquvchi kimyoviy reaktsiyaga …………….. deyiladi.
====
Yonish deyiladi.

++++
Shovqin deb nimaga aytiladi ?
====
Turli balandlik va chastotadagi tovushlarning tartibsiz ravishda qo’shilib eshitilishiga aytiladi.

++++
Shovqinlar kelib chiqishiga kura necha xil buladi ?
====
3 xil: 1. Sanoat shovqinlari. 2. Transport shovqinlari. 3. Maishiy shovqinlar.

++++
Normal shovqin kuchiga nimalar ovozi misol bo’ladi ?
====
Daraxtlarning shivirlashi, soatning yurishi va normal musiqa ovozi.

++++
Qaysi javob yokimsiz shovqin kuchiga misol bo’ladi ?
====
Yengil sanoat korxonalari, ko’cha transporti shovkini, chang surgich va kir yuvish mashinalari ovozi.

++++
Inson sog’lig’iga zararli va salbiy ta‘sir etuvchi shovqin kuchi tug’ri yozilgan qatorni toping ?
====
Baland musiqa ovozi, tuqimachilik va paxtachilik sanoatidagi stanoklar, avtomobillar, mototsikllar, tramvay va temir yo’l transporti.

++++
Qaysi qatordagi javob juda xavfli shovqin kuchiga misol bo’ladi ?
====
Portlash, reaktiv samolyot ovozi va xavo trevogasi.

++++
O’quv xonalaridagi normal havo namligi necha foiz bo’lishi kerak ?
====
40-60 %

++++
O’quv xonalari va laboratoriya xonalarida ruxsat etilgan normal temperatura necha oS bo’lishi kerak ?
====
16-20 oS

++++
Changlar kelib chiqishiga qarab necha turga bo’linadi ?
====
Tabiiy va su‘niy.

++++
Tabiiy changlar sirasiga qanaqa changlar kiradi ?
====
Tabiatda inson ta‘sirisiz hosil bo’ladigan changlar.

++++
Su‘niy changlar sirasiga qanaqa changlar kiradi ?
====
Sanoat korxonalari va qurilishlarda insonning bevosita ta‘siri natijasida hosil bo’ladigan changlar.

++++
Chang deb nimaga aytiladi ?
====
Kattiq moddaning havoda muallak holatda bo’la oladigan eng mayda zarrachalariga chang deyiladi.

++++
Radioaktiv moddalarning qo’lga ta‘siri nimalarda seziladi ?
====
Qo’l qurushoq bo’lib qoladi, yoriladi va tirnoqlar tushib ketadi.

++++
Radioaktiv nurlanishlar deb nimaga aytiladi ?
====
Ionlovchi nurlanishlarga aytiladi

++++
Harorat, nisbiy namlik, xavoning tezligi, atmosfera bosimi kabi mikroiqlim sharoitlarini bir-biri bilan bog’lab me‘yoriy ko’rsatgichga yetkazishga …………… deyiladi.
====
«Komfort» sharoit deyiladi.

++++
Havo harorati qanaqa nazorat asbobi bilan o’lchanadi.
====
Assmanning aspiratsion psixrometri va Avgust psixrometri bilan.

++++
Biologik o’lim nima ?
====
Bu qaytarib bo’lmaydigan hodisa bo’lib, bunda organizm xujayralari va tuqimalarida biologik jarayon tuxtaydi.

++++
Elektr yoyidan chiqadigan kuchli ultrabinafsha nurlar oqimining ko’zga ta‘siri natijasida ko’z tashqi pardasining yallig’lanishiga …………….. deyiladi.
====
Elektrooftalmiya deyiladi.

++++
Ishlab chiqarish jarayonidagi ishchining charchamasdan, mexnat kobiliyatini pasaymagan va sog’ligini yo’qotmagan holda eng yuqori ish unumdorligiga erishishda funktsional imkoniyatlarini o’rganuvchi fanga ……………… deyiladi.
====
Ergonomika deyiladi.

++++
Inson shikastlanganda kon oqishi necha xil bo’ladi.
====
2 xil Tashki va ichqi.

++++
Og’irligi bo’yicha kuyishlar necha darajaga bo’linadi.
====
4 darajaga bo’linadi.

++++
Sovuk urishi necha darajaga bulinadi.
====
4 darajaga bo’linadi.

++++
Fuqaro muhofozasi nimani o’rgatadi?
====
Inson faoliyati davomida ularning xavfsizligini taminlashni o’rgatadi

++++
Xavflar kelib chiqish sabablariga ko’ra necha xil bo’ladi?
====
Tabiiy, texnogen, ekologik

++++
Xavf nima?
====
Inson sog’ligiga bevosita yoki bilvosita  va boshqa yo’llar bilan zarar yetkazadigan  ko’ngilsiz hodisalar

++++
«Fuqaro muhofozasi» fani qaysi fanlar bilan uzviy bog’liq?
====
Ergonomika, texnik estetika, mehnat fiziologiyasi, mehnatni ilmiy asosda  tashkil etish  va  mehnat gigiyenasi

++++
Tavakkalni aniqlash qanday yo’llar bilan olib boriladi?
====
Statistik, andozalash,  ekspert,  jamoatchilik yo’llari bilan

++++
Xavfsizlikni taminlash yo’llari qaysilar?
====
Boshqaruv, yo’naltirish (aniqlash), texnik, tashkiliy yo’llar.

++++
Xavfsizlikni taminlashni yo’naltirish yo’llari qaysilar ?
====
Operatorni faolligi, iqtidorligi, operatorni almashtirish, xavflarni tasniflash,  tartiblash ,  xavflarni kamaytirish.

++++
Xavfsizlikni taminlashning texnik yo’llariga nimalar kiradi ?
====
Blakirovkalash, vakuumlash, to’siqlar orqali himoyalash, masofada himoyalash.

++++
Xavfsizlikni taminlashning tashkiliy yo’llariga nimalar kiradi ?
====
Barchasi to’g’ri.

++++
Xavfsizlikni taminlashni boshqarish yo’llari qaysilar ?
====
Barchasi to’g’ri.

++++
Hayotiy faoliyat xavfsizligi qaysi  masalalarni hal qiladi?
====
Hammasi to’g’ri.

++++
Hayot faoliyati xavfsizligini ta’minlash qaysi masalarga bog’liq?
====
Hammasi to’g’ri.

++++
Kremniy oksidi changidan qanday kasallik paydo bo’ladi?
====
Silikoz

++++
Tuproq changidan qanday kasallik paydo bo’ladi?
====
Silikoz

++++
Ko’mir oksidi changidan qanday kasallik paydo bo’ladi?
====
Antrokoz

++++
Alyuminiy oksidi changidan qanday kasallik paydo bo’ladi?
====
Alyuminoz

++++
Silikatlar ta’siridagi changdagi qanday kasallik paydo bo’ladi?
====
Silikatoz

++++
Hayotiy faoliyat xavfsizligini boshqarish vositalariga qaysilar kiradi?
====
Barchasi to’g’ri.

++++
Favqulodda vaziyat nima?
====
Bu ma’lum xududda halokat, falokat, tabiiy va ekologik ofat, epidemiya,  epizootiya,  epitotiyalar natijasida sodir bo’lgan vaziyat.

++++
Hayotiy faoliyat xavfsizligi fanining nazariyalari nimalar?
====
Hammasi to’g’ri

++++
Favqulodda vaziyatlardan himoyalash tadbirlari nimalar?
====
Barcha javoblar to’g’ri.

++++
Kelib chiqish sabablariga qarab favkulodda vaziyatlar necha xil bo’lishi mumkin?
====
Barcha javobdar  to’g’ri.

++++
Favqulodda vaziyatlar xavfini tarqalish tezligi bo’yicha necha xil bo’ladi?
====
To’rtta..

++++
Tarqalish xududiga qarab favqulodda vaziyatlar necha xil buladi?
====
Mahalliy,  regional,  milliy,  lokal, global.

++++
Favqulodda vaziyatlar paydo bo’lishi sabablari nimalar?
====
Barcha javoblar to’g’ri.

++++
Favqulodda vaziyatlar necha bosqichga  ega?
====
To’rt bosqichga.

++++
O’zbekiston Respublikasi xududida qaysi favqulodda vaziyatlar yuz berishi mumkin?
====
Keltirilgan barcha javoblar to’g’ri

++++
Zilzilalarning oqibatlarini kamaytirish chora-tadbirlariga nimalar kiradi?
====
Zilzilaning  geofizik, geologik xossalaini tahlil qilish, oldindan qayerda va qachon zilzila bo’lish ehtimoli borligini aniqlash, ogohlantirish.

++++
Gidrotexnik inshootlarning buzilishiga nimalar sabab bo’lishi mumkin?
====
Hammasi to’g’ri..

++++
Yong’in natijasida portlashlarning kelib chiqishiga  nimalar  sabab bo’ladi?
====
Moddalarning yonuvchanligi, yuqori harorat, alanga.

++++
Qurilish ashyolari o’tga chidamligigi bo’yicha nega turga bo’linadi?
====
Yonmaydigan, og’ir yonadigan, yonuvchan, tutab yonadigan.

++++
Portlash nima?
====
Chegaralangan xududda , katta miqdordagi quvvatning ajralib chiqishidir.

++++
Portlatuvchi omillarga nimalar kiradi?
====
Barchasi to’g’ri.

++++
O’zbekiston Respublikasida mehnat muhofazasini nazorat qiluvchi tashkilotlarga qaysilar kiradi?
====
Barchasi to’g’ri

++++
Mehnat qonunligini buzilishi uchun qanday  javobgarliklar mavjud?
====
Ma’muriy, jinoiy, moddiy

++++
Yo’riqnomalar necha xil bo’ladi?
====
Kirish, ish joyidagi, davriy va navbatdan tashqari yo’riqnomalar.

++++
Ishchilar bilimi qachon tekshiriladi?
====
A va B javoblar to’g’ri.

++++
Inson faoliyati necha turga bo’linadi?
====
Aqliy  va jismoniy faoliyat

++++
Mehnatni to’g’ri tashkil qilish yo’nalishlari necha xil bo’ladi?
====
Gigiyenik, fiziologik, psixologik, estetik

++++
Insonning eshitish organi necha gersdagi tovushlarni eshitishi mumkun?
====
16-20000 gs gacha

++++
Shovqin, titrashga  qarshi kurash usullarini ko’rsating?
====
B va V javoblar to’g’ri.

++++
Ishlab chiqarishdagi  yoritish sistemalari necha xil bo’ladi?
====
Tabiiy, sun’iy va aralash.

++++
Vzifasiga qarab suniy yoritish necha xil bo’ladi?
====
Avariya va maxsus yoritish.

++++
Sanoat changi necha xil bo’ladi?
====
Tabiiy va suniy.

++++
Zaharli moddalarni odam tanasiga ko’rsatadigan tasiriga karab necha xil bo’ladi?
====
Barcha javoblar to’g’ri

++++
Kasbiy zaharlanishga qarshi kurash qaysi yo’nalishlarda olib boriladi?
====
Barcha javoblar to’g’ri.

++++
Ishlab chiqarish muhitida meteriologik sharoitlar nimalarga bog’liq?
====
Havo tezligi, havo harorati, nisbiy namlik va  havo bosimiga.

++++
Sanoat korxonalarida xonalar necha xil bo’ladi?
====
Oddiy, issiq

++++
yil fasllari necha xil bo’lishi mumkin?
====
Issiq

++++
Ish kategoriyasi necha xil bo’lishi mumkin?
====
Yengil, o’rtacha va og’ir.

++++
Shovqinga qarshi kurash usullari nimalardan iborat?
====
Barcha javoblar to’g’ri.

++++
Shovqinga qarshi qaysi himoya vositalari mavjud?
====
Shlem va naushnik va boshqalar.

++++
Shovqinlar kelib chiqish sababiga ko’ra qaysi turlarga ajratiladi ?
====
Elektr magnit, mexanik, aerodinamik gidrodinamik shovqinlar.

++++
O’zgaruvchi elektromagnit maydonlar inson organizmiga qanday ta’sir kiladi?
====
Barcha javoblar to’g’ri.

++++
Erganomika fani nimani o’rgatadi?
====
Erganomika insonning mehnat faoliyati jarayonida qulay, xavfsiz sharoitlarini yaratish mehnat unumdorligini oshirishga bog’liq bo’lgan imkoniyatlarini o’rgatadi.

++++
Isonning psixologik faoliyati necha guruxga bo’linadi?
====
Psixologik jarayonlar, xossalar, holatlar.

++++
Ishlab chiqarish changi necha xil bo’ladi?.
====
Turli kattalikda organik va noorganik changlar.

++++
Havo muhitidagi zaharli moddalarga yo’l qo’yilgan miqdori nimalarga asoslanadi?
====
Fizik, kimyoviy va boshqa ma’lumotlarga.

++++
Davlat standartiga asosan  zaharli  moddalarning organizmga ta’sir ko’rsatishiga karab  qanday  sinflarga bo’linadi?
====
Yuqori, kam va o’rtacha xavfli.

++++
Chang tutqichlar va filtrlarning yong’in xavfsizligi qo’yiladigan talablar ko’rsating?
====
Texnik va konstruktiv jihozlar va moslamalar bilan ta’minlash.

++++
Avariya shamollatish vositalari qachon o’rnatiladi?
====
Doimo inson bo’ladigan, halokat yuz berganda yoki texnalogik jarayon buzilganda to’satdan  ko’p miqdorda zararli yoki zaharli  gaz va bug’lar paydo bo’lishi mumkin bo’lgan ishlab  chiqarish xonalariga o’rnatiladi.

++++
Qaysi xollarda shamollatish qurilmalaridan yong’in chiqish mumkin?
====
Uchqun chiqishi, havodagi kimyoviy reaksiya va  nosozlik natijalari.

++++
Nima maqsadda blakirovka qilinadi?
====
Barcha javoblar to’g’ri.

++++
Rangli signallar necha xil bo’ladi?
====
Qizil (taqiqlash), sariq (ogohlantirish), yashil (xavfsizlik), ko’k (ko’rsatma).

++++
Xavfli zona deb nimaga aytiladi?
====
Inson hayotiga yoki sog’ligiga doimiy yoki vaqti-vaqti bilan xavf to’g’diruvchi joyga.

++++
Xavfsizlik masofalari nima uchun kerak?
====
Mehnat xavfsizlikni ta’minlash, tegishli asboblarni joylashtirish.

++++
Jarohatlovchi omillar nimalar?
====
Barcha javoblar to’g’ri.

++++
Ish joylarining balandligi yer sathidan necha metr masofada bo’ladi.
====
1,0 m.

++++
Yuk ko’tarish mexanizmlarida ishlovchi  ishchilar necha yoshda bo’lishi lozim?
====
16-18 yoshda

++++
Gaz balonlar qaysi hollarda falokatga olib keladi?
====
Tayyorlash, tashish va saqlash vaqtida xavfsizlik qoidalarining buzilishi.

++++
Tok urishning eng og’ir  darajasini ko’rsating.
====
Muskullar keskin qisqarishi natijasida odam xushini yo’qotadi, nafas olish faoliyati ishlab turadi, hushini yo’qotib, nafas olish tizimi yoki yurak urishi to’xtab qoladi. Klinik o’lim holati yuz beradi bunda insonda hyech qanday hayot alomatlari ko’rinmaydi

++++
Elektr tokidan jarohatlanishning oldini olishga qaysi chora-tadbirlar kiradi?
====
Barcha  javoblar to’g’ri.

++++
Sanoat korxonalari odamlar uchun tok urishi xavflilik darajasi bo’yicha necha sinfga  bo’linadi?
====
besh sinfga; xavfsiz,  xavfli,  o’ta xavfli,  yuqori xavfli,  yengil xavfli.

++++
O’tni o’chirish uchun qaysi usullar ishlatiladi?
====
Barcha javoblar tug’ri.

++++
Moddalar o’zidan-o’zi yonishga moyilligi bo’yicha necha sinfga bo’linadi?
====
To’rt sinfga tabiiy o’simliklar, torf va ko’mir, yog’ va moy, kimyoviy moddalar.

++++
Havoni changdan tozalashda necha usul qo’llaniladi?
====
Quruq va ho’l tozalash usullari

++++
Korxona bosh loyihasi  nima?
====
Korxona bosh loyihasi mavjud bo’lgan va ko’riladigan barcha bino, inshootlar, asosiy yo’l va yo’laklar, ko’kalamzorlashtiriladigan maydon yuzini malum masshtabda ifodalangan chizmalari.

++++
Korxona bosh loyihasida qaysi omillar yoritiladi?
====
Ishchi kuchi, elektr, xom-ashyo bilan taminlash, temir yo’l, transport aloqasi, havo oqimi tezligi, shovqindan himoya qilish.

++++
Korxona maydonidagi binolar oraligidagi yullarning eni necha metr bulishi kerak
====
5 metr.

++++
Ishlab  chiqarish binolari orasidagi masofa yong’in xavfsizligi bo’yicha necha metr bo’lishi mumkin?
====
9-12 metr.

++++
Sanitariya – maishiy xizmat ko’rsatish binolar tarkibiga qaysilar kiradi?
====
Uy va ish kiyimlarini saqlash, zararsizlantirish, tuzatish, yuvish, yuvinish va boshqalar.

++++
Korxonaning maishiy binolari qanday joylashtiriladi?
====
Alohida

++++
Karroziyadan qaysi xavflar paydo bo’lishi mumkin?
====
Asbob-uskuna,  kommunikasiyalarning buzilishi, sinishi,  avariya, portlash va yong’in sodir bo’lishi.

++++
Kasaba uyushma qo’mitasi texnik inspektorining  vazifasi  nimalardan iborat?
====
Mehnatni muhofaza qilish qoidalari, baxtsiz hodisalarga uchraganlar hisobga  olish, og’ir yoki o’lim bilan tugagan hodisalarni tahlil qilish,  mehnatni muhofaza qilish qoida va me’yorlarni buzganlarni javobgarlikka tortish uchun tegishli organga ma’lumot berish.

++++
Baxtsiz hodisalarni oldini olish qaysi raxbar xodim zimmasida bo’ladi?
====
Ma’muriyat rahbariga

++++
Toliqishni qanday oldini olish mumkin?
====
Ko’p mehnat talab qiladigan ishlarni mexanizasiyalashtirish, yarim avtomat va  avtomatlashgan texnologiya jarayonlariga o’tish, yangi texnologiyalarni joriy  etish,

++++
Ishlab chiqarish  jarayoniga mashq qilish  qanday ta’sir qiladi?
====
Barcha javoblar to’g’ri.

++++
Mehnat maromi nima?
====
Bir maromda mehnat – smena, hafta, oy, yil maboynida bir tekisda bajariladigan  mehnatdir.

++++
Sanoat korxonalarida qaysi gazlar ishlatiladi?
====
Siqilgan, suyuqtirilgan, eritilgan.

++++
Balonlarni portlashiga nimalar sabab bo’lishi mumkin?
====
Noto’g’ri foydalanish, texnika xavfsizligi va ekspluatasiya talablariga rioya qilmaslik.

++++
Xavfli yuklarga nimalar kiradi?
====
Portlovchi moddalar, suyultirilgan, siqilgan, eritilgan gazlar, radiaktiv moddalar va yengil alangalanuvchi suyuqliklar.

++++
Issiq suv, bug’ va gaz quvurlarining  avariyaga uchrashishiga  nima sabab bo’ladi?
====
Qurilish-montaj ishlarida loyihada ko’rsatilgan me’yorlardan chetga chiqish, quvurlardan foydalanishda texnologiya rejimlarini buzish, vaqtida sifatli ta’mirlash ishlarini olib bormaslik, gidravlik zarbalar, tekshirish asbob-uskunalari o’z vaqtida sifatli texnika ko’rigidan o’tkazmaslik.

++++
Ma’muriy javobgarlik necha turga bo’linadi?
====
To’rt turga: mablag’ va pul undirish, ogohlantirish, qamoq  jazosi berish,  past lavozimga o’tkazish.

++++
Rejadan tashqari instruktaj qaysi vaqtda o’tkaziladi?
====
Texnologik sharoit o’zgarsa, baxtsiz hodisa va boshqa hollarda.

++++
Xavfsiz mehnat qilish sharoitini yaratish qaysi tizimni vazifasi?
====
Mehnat muhofazasini boshqarish tizimi va korxona rahbari.

++++
Mehnat xavfsizligi standartlar sistemasiga  (MXSS) nimalar kiradi?
====
Tashkiliy-uslubiy standartlar, xavfsizlik talablari uskunalari standartlari, ishchilarning himoya vositalariga bo’lgan talablar standartlari

++++
Birinchi o’t o’chirish moslamalarini ko’rsating?
====
Yong’in krani, gidrant va щitlar.

++++
Avariya-qutqaruv ishlari qachon amalga oshiriladi?
====
Tabiiy va texnogen turdagi favqulodda vaziyatlarda.

++++
Xavfsizlikni taminlashning texnik yo’llariga nimalar kiradi ?
====
Blakirovkalash, vakuumlash, to’siqlar orqali himoyalash, masofada himoyalash.

++++
Xavfsizlikni taminlashning tashkiliy yo’llariga nimalar kiradi ?
====
Barchasi to’g’ri.

++++
Xavfsizlikni taminlashni boshqarish yo’llari qaysilar ?
====
Barchasi to’g’ri.

++++
Hayotiy faoliyat xavfsizligi qaysi  masalalarni hal qiladi?
====
Hammasi to’g’ri.

++++
Hayotiy faoliyat xavfsizligini boshqarish vositalariga qaysilar kiradi?
====
Barchasi to’g’ri.

++++
Favqulodda vaziyat nima?
====
Bu ma’lum xududda halokat, falokat, tabiiy va ekologik ofat, epidemiya,  epizootiya,  epitotiyalar natijasida sodir bo’lgan vaziyat.

++++
Kelib chiqish sabablariga qarab favkulodda vaziyatlar necha xil bo’lishi mumkin?
====
Barcha javobdar  to’g’ri.

++++
Favqulodda vaziyatlar xavfini tarqalish tezligi bo’yicha necha xil bo’ladi?
====
To’rtta..

++++
Tarqalish xududiga qarab favqulodda vaziyatlar necha xil buladi?
====
Mahalliy,  regional,  milliy,  lokal, global.

++++
Ishlab chiqarishdagi  yoritish sistemalari necha xil bo’ladi?
====
Tabiiy, sun’iy va aralash.

++++
Vazifasiga qarab suniy yoritish necha xil bo’ladi?
====
Avariya va maxsus yoritish.

++++
Sanoat chang necha xil bo’ladi?
====
Tabiiy va suniy.

++++
Zaharli moddalarni odam tanasiga ko’rsatadigan tasiriga karab necha xil bo’ladi?
====
Barcha javoblar to’g’ri

++++
Kasbiy zaharlanishga qarshi kurash qaysi yo’nalishlarda olib boriladi?
====
Barcha javoblar to’g’ri.

++++
Yo’riqnomalar necha xil bo’ladi?
====
Kirish, ish joyidagi, davriy va navbatdan tashqari yo’riqnomalar.

++++
Ishchilar bilimi qachon tekshiriladi?
====
A va B javoblar to’g’ri.

++++
Inson faoliyati necha turga bo’linadi?
====
Aqliy  va jismoniy faoliyat

++++
Mehnatni to’g’ri tashkil qilish yo’nalishlari necha xil bo’ladi?
====
Gigiyenik, fiziologik, psixologik, estetik

++++
Sanoat korxonalari odamlar uchun tok urishi xavflilik darajasi bo’yicha necha sinfga  bo’linadi?
====
besh sinfga; xavfsiz,  xavfli,  o’ta xavfli,  yuqori xavfli,  yengil xavfli.

++++
O’tni o’chirish uchun qaysi usullar ishlatiladi?
====
Barcha javoblar tug’ri.

++++
Moddalar o’zidan-o’zi yonishga moyilligi bo’yicha necha sinfga bo’linadi?
====
To’rt sinfga tabiiy o’simliklar, torf va ko’mir, yog’ va moy, kimyoviy moddalar.

++++
Havoni changdan tozalashda necha usul qo’llaniladi?
====
Quruq va ho’l tozalash usullari

++++
Hayot faoliyati xavfsizligi»  fani nimani o’rgatadi?
====
Inson faoliyati davomida ularning xavfsizligini taminlashni o’rgatadi.

++++
Xavflar kelib chiqish sabablariga ko’ra necha xil bo’ladi?
====
Tabiiy, texnogen, ekologik

++++
Xavf nima?
====
Inson sog’ligiga bevosita yoki bilvosita  va boshqa yo’llar bilan zarar  yetkazadigan  ko’ngilsiz hodisalar

++++
«Hayot faoliyati havfsizligi» fani qaysi fanlar bilan
====
uzviy bog’liq?
Ergonomika, texnik estetika, mehnat fiziologiyasi, mehnatni ilmiy asosda tashkil etish  va  mehnat gigiyenasi

++++
Ergonomika nima?
====
Qulay ish o’rnini tashkil etish;

++++
Tavakkalni aniqlash qanday yo’llar bilan olib boriladi?
====
Statistik, andozalash,  ekspert,  jamoatchilik yo’llari bilan

++++
Xavfsizlikni taminlash yo’llari qaysilar?
====
Boshqaruv, yo’naltirish (aniqlash), texnik, tashkiliy yo’llar.

++++
Xavfsizlikni taminlashni yo’naltirish yo’llari qaysilar ?
====
Operatorni faolligi, iqtidorligi, operatorni almashtirish, xavflarni tasniflash,  tartiblash ,  xavflarni kamaytirish

++++
Xavfsizlikni taminlashning texnik yo’llariga nimalar kiradi ?
====
Blakirovkalash, vakuumlash, to’siqlar orqali himoyalash, masofada himoyalash.

++++
Xavfsizlikni taminlashning tashkiliy yo’llariga nimalar kiradi ?
====
Barchasi to’g’ri.

++++
Xavfsizlikni taminlashni boshqarish yo’llari qaysilar ?
====
Barchasi to’g’ri.

++++
Hayot faoliyati xavfsizligi qaysi  masalalarni hal qiladi?
====
Hammasi to’g’ri.

++++
Xavflar necha bosqichda o’rganiladi?
====
3 bosqichda;

++++
Mu’tadil xayotiy faoliyat sharoiti ko’rsatkichlarini aniqlang?
====
18-20 gradus harorat, 30-60 foiz namlik va 760 mm.simobustuniga teng bo’lgan bosim;

++++
Zaxarli moddalarning odam tanasi va to’qimalariga ta’sirniga ko’ra necha guruhga ajratish mumkin?
====
9 guruxga;

++++
Chang zarrachalari kattaligi bo’yicha necha turga bo’linadi?
====
4 turga;

++++
Katta changlarning o’lchamini ko’rsating?
====
10 mk. dan katta;

++++
Mikroskopik changlarning o’lchamini ko’rsating?
====
0,25- 1 mk.;

++++
Ultromikroskopik changlarning o’lchamini ko’rsating?
====
0,25 mk dan kichik.

++++
Organizm uchun eng xavfli changlarning o’lchamini ko’rsating?
====
4-5  mk.;

++++
Asabga ta’sir ko’rsatuvchi zaharli moddalarni ko’rsating?
====
Benzin, kerasin, spirt, amiak,  nikatin va boshqalar;

++++
Organizmni  kuydiruvchi zaharli moddalarni ko’rsating?
====
Barcha turdagi kislatalar va ishqorlar;

++++
Mexnat fiziologiyasi nimani o’rganadi?
====
Inson ish faoliyatida tanada yuz beradigan o’zgarishlarni;

++++
“Komfort uchburchagi” nima?
====
Me’yoriy harorat, bosim va  namlik;

++++
Inson uchun eng zaharli changlar guruxini ko’rsating?
====
Barcha kimyoviy changlar;

++++
Moddalarning ruxsat etilgan konsentrasiyasiga ko’ra  eng xavfli  (0, 01 mg. / metr kub) moddani ko’rsating
====
Simob bug’i;

++++
Zaharli moddalar xavflilik darajasiga ko’ra necha guruhga bo’linadi?
====
4 guruhga;

++++
“Fotokolorometriya” usulida nima aniqlanadi?
====
Zararli moddalarning havodagi miqdori;

++++
“Gazoxromatografiya” va “Spektroskopiya” usullarida  qandaykattaliklar aniqlanadi?
====
Zararli moddalarning havodagi miqdori;

++++
“Xayot faoliyati xavfsizligi” fanining tizimli- strukturaviymodeli qaysi bilimlarni o’z ichiga oladi?
====
Umumiy, tibbiy –biologik, tabiiy sharoitlar bilan bog’liq  bilimlar va texnik-texnologik;

++++
Kasaba uyushma qo’mitasi texnik inspektorining  vazifasi  nimalardan iborat?
====
Mehnatni muhofaza qilish qoidalari, baxtsiz hodisalarga uchraganlar hisobga  olish, og’ir yoki o’lim bilan tugagan hodisalarni tahlil qilish,  mehnatni muhofaza qilish qoida va me’yorlarni buzganlarni javobgarlikka tortish uchun tegishli organga ma’lumot berish.

++++
Baxtsiz hodisalarni oldini olish qaysi raxbar xodim zimmasida bo’ladi?
====
Ma’muriyat rahbariga

++++
Toliqishni qanday oldini olish mumkin?
====
Ko’p mehnat talab qiladigan ishlarni mexanizasiyalashtirish, yarim avtomat va  avtomatlashgan texnologiya jarayonlariga o’tish, yangi texnologiyalarni joriy  etish,

++++
Ishlab chiqarish  jarayoniga mashq qilish  qanday ta’sir qiladi?
====
Barcha javoblar to’g’ri.

++++
Mehnat maromi nima?
====
Bir maromda mehnat – smena, hafta, oy, yil maboynida bir tekisda bajariladigan  mehnatdir.

++++
Sanoat korxonalarida qaysi gazlar ishlatiladi?
====
Siqilgan, suyuqtirilgan, eritilgan.

++++
Balonlarni portlashiga nimalar sabab bo’lishi mumkin?
====
Noto’g’ri foydalanish, texnika xavfsizligi va ekspluatasiya talablariga rioya qilmaslik.

++++
Xavfli yuklarga nimalar kiradi?
====
Portlovchi moddalar, suyultirilgan, siqilgan, eritilgan gazlar, radiaktiv moddalar va yengil alangalanuvchi suyuqliklar.

++++
Issiq suv, bug’ va gaz quvurlarining  avariyaga uchrashishiga  nima sabab bo’ladi?
====
Qurilish-montaj ishlarida loyihada ko’rsatilgan me’yorlardan chetga chiqish, quvurlardan foydalanishda texnologiya rejimlarini buzish, vaqtida sifatli ta’mirlash ishlarini olib bormaslik, gidravlik zarbalar, tekshirish asbob-uskunalari o’z vaqtida sifatli texnika ko’rigidan o’tkazmaslik.

++++
Ma’muriy javobgarlik necha turga bo’linadi?
====
To’rt turga: mablag’ va pul undirish, ogohlantirish, qamoq  jazosi berish,  past lavozimga o’tkazish.

++++
Rejadan tashqari instruktaj qaysi vaqtda o’tkaziladi?
====
Texnologik sharoit o’zgarsa, baxtsiz hodisa va boshqa hollarda.

++++
Xavfsiz mehnat qilish sharoitini yaratish qaysi tizimni vazifasi?
====
Mehnat muhofazasini boshqarish tizimi va korxona rahbari.

++++
Mehnat xavfsizligi standartlar sistemasiga  (MXSS) nimalar kiradi?
====
Tashkiliy-uslubiy standartlar, xavfsizlik talablari uskunalari standartlari, ishchilarning himoya vositalariga bo’lgan talablar standartlari

++++
Birinchi o’t o’chirish moslamalarini ko’rsating?
====
Yong’in krani, gidrant va щitlar.

++++
Avariya-qutqaruv ishlari qachon amalga oshiriladi?
====
Tabiiy va texnogen turdagi favqulodda vaziyatlarda.

++++
Xavfsizlikni taminlashning texnik yo’llariga nimalar kiradi ?
====
Blakirovkalash, vakuumlash, to’siqlar orqali himoyalash, masofada himoyalash.

++++
Xavfsizlikni taminlashning tashkiliy yo’llariga nimalar kiradi ?
====
Barchasi to’g’ri.

++++
Xavfsizlikni taminlashni boshqarish yo’llari qaysilar ?
====
Barchasi to’g’ri.

++++
Hayotiy faoliyat xavfsizligi qaysi  masalalarni hal qiladi?
====
Hammasi to’g’ri.

++++
Hayot faoliyati xavfsizligini ta’minlash qaysi masalarga bog’liq?
====
Hammasi to’g’ri.

++++
Kremniy oksidi changidan qanday kasallik paydo bo’ladi?
====
Silikoz

++++
Tuproq changidan qanday kasallik paydo bo’ladi?
====
Silikoz

++++
Ko’mir oksidi changidan qanday kasallik paydo bo’ladi?
====
Antrokoz

++++
Alyuminiy oksidi changidan qanday kasallik paydo bo’ladi?
====
Alyuminoz

++++
Silikatlar ta’siridagi changdagi qanday kasallik paydo bo’ladi?
====
Silikatoz

++++
Hayotiy faoliyat xavfsizligini boshqarish vositalariga qaysilar kiradi?
====
Barchasi to’g’ri.

++++
Favqulodda vaziyat nima?
====
Bu ma’lum xududda halokat, falokat, tabiiy va ekologik ofat, epidemiya,  epizootiya,  epitotiyalar natijasida sodir bo’lgan vaziyat.

++++
Hayotiy faoliyat xavfsizligi fanining nazariyalari nimalar?
====
Hammasi to’g’ri

++++
Favqulodda vaziyatlardan himoyalash tadbirlari nimalar?
====
Barcha javoblar to’g’ri.

++++
Kelib chiqish sabablariga qarab favkulodda vaziyatlar necha xil bo’lishi mumkin?
====
Barcha javobdar  to’g’ri.

++++
Favqulodda vaziyatlar xavfini tarqalish tezligi bo’yicha necha xil bo’ladi?
====
To’rtta..

++++
Tarqalish xududiga qarab favqulodda vaziyatlar necha xil buladi?
====
Mahalliy,  regional,  milliy,  lokal, global.

++++
Favqulodda vaziyatlar paydo bo’lishi sabablari nimalar?
====
Barcha javoblar to’g’ri.

++++
Favqulodda vaziyatlar necha bosqichga  ega?
====
To’rt bosqichga.

++++
O’zbekiston Respublikasi xududida qaysi favqulodda vaziyatlar yuz berishi mumkin?
====
Keltirilgan barcha javoblar to’g’ri

++++
Zilzilalarning oqibatlarini kamaytirish chora-tadbirlariga nimalar kiradi?
====
Zilzilaning  geofizik, geologik xossalaini tahlil qilish, oldindan qayerda va qachon zilzila bo’lish ehtimoli borligini aniqlash, ogohlantirish.

++++
Gidrotexnik inshootlarning buzilishiga nimalar sabab bo’lishi mumkin?
====
Hammasi to’g’ri..

++++
Yong’in natijasida portlashlarning kelib chiqishiga  nimalar  sabab bo’ladi?
====
Moddalarning yonuvchanligi, yuqori harorat, alanga.

++++
Qurilish ashyolari o’tga chidamligigi bo’yicha nega turga bo’linadi?
====
Yonmaydigan, og’ir yonadigan, yonuvchan, tutab yonadigan.

++++
Portlash nima?
====
Chegaralangan xududda , katta miqdordagi quvvatning ajralib chiqishidir.

++++
Portlatuvchi omillarga nimalar kiradi?
====
Barchasi to’g’ri.

++++
O’zbekiston Respublikasida mehnat muhofazasini nazorat qiluvchi tashkilotlarga qaysilar kiradi?
====
Barchasi to’g’ri

++++
Mehnat qonunligini buzilishi uchun qanday  javobgarliklar mavjud?
====
Ma’muriy, jinoiy, moddiy

++++
Yo’riqnomalar necha xil bo’ladi?
====
Kirish, ish joyidagi, davriy va navbatdan tashqari yo’riqnomalar.

++++
Ishchilar bilimi qachon tekshiriladi?
====
A va B javoblar to’g’ri.

++++
Inson faoliyati necha turga bo’linadi?
====
Aqliy  va jismoniy faoliyat

++++
Mehnatni to’g’ri tashkil qilish yo’nalishlari necha xil bo’ladi?
====
Gigiyenik, fiziologik, psixologik, estetik

++++
Insonning eshitish organi necha gersdagi tovushlarni eshitishi mumkun?
====
16-20000 gs gacha

++++
Shovqin, titrashga  qarshi kurash usullarini ko’rsating?
====
B va V javoblar to’g’ri.

++++
Ishlab chiqarishdagi  yoritish sistemalari necha xil bo’ladi?
====
Tabiiy, sun’iy va aralash.`;

  const blocks = inputText
    .split("++++")
    .map((b) => b.trim())
    .filter((b) => b);

  blocks.forEach((block) => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l);

    const savolIndex = lines.findIndex((l) => l === "====");
    if (savolIndex !== -1 && lines[savolIndex + 1]) {
      const savol = lines.slice(0, savolIndex).join(" ");
      const javob = lines[savolIndex + 1];
      qsnLines.push(normalize(savol));
      ansLines.push(javob);
    }
  });
  
  dataLoaded = true;
}

// Initialize by parsing the data when the script loads
parseMatn();

function sendNotification(title, message) {
  const options = {
    body: message,
    icon: 'kun.jpg'  // or full URL
  };
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, options);
      }
    });
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkQuestions() {
  if (!dataLoaded) {
    console.warn('Data not loaded yet, please wait.');
    return;
  }

  const inputText = document.getElementById('textInput').value;
  const delayInput = document.getElementById('delayInput').value.trim();
  const userDelay = parseInt(delayInput, 10);
  const delayTime = (Number.isInteger(userDelay) && userDelay > 0) ? userDelay : 5000;

  const pattern = /\d+\..*?(?=\d+\.\s*|$)/gs;
  const matches = inputText.match(pattern);
  if (!matches) return;

  for (const fragmentRaw of matches) {
    const fragment = normalize(fragmentRaw.trim());

    for (let i = 0; i < qsnLines.length; i++) {
      const q = qsnLines[i];
      if (q.length < 5 || !fragment.includes(q)) continue;

      const numMatch = fragmentRaw.match(/^(\d+)\./);
      const num = numMatch ? numMatch[1] : (i + 1).toString();

      if (seenQuestions.has(num)) break;

      const ans = ansLines[i] || 'no answer :(';
      sendNotification(`Kun.uz - O'zbekiston va dunyo yangiliklari`, `${num} - ${ans}`);
      seenQuestions.add(num);

      await delay(delayTime); // <-- Use dynamic delay
      break;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const oneIdLink = document.getElementById('oneIdLink');
    if (oneIdLink) {
        oneIdLink.addEventListener('dblclick', () => {
            window.location.href = 'scroll.html';
        });
    }
});